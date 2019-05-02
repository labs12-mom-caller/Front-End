const functions = require('firebase-functions');
const axios = require('axios');
const request = require('request');
const sgMail = require('@sendgrid/mail');

const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;
const client = require('twilio')(accountSid, authToken);

sgMail.setApiKey(functions.config().sendgrid.key);

const callEmail = require('./helpers/callEmail.js');

exports.handler = async (req, res, firestore, storage) => {
  const calls = firestore.collection('calls');
  const contacts = firestore.collection('contacts');
  const users = firestore.collection('users');

  try {
    const snapshot = await calls.where('fetched', '==', false).get();
    if (snapshot.empty) {
      console.log('No calls waiting');
      return;
    }
    snapshot.forEach(async doc => {
      const { twilio } = doc.data();
      const [recording] = await client.recordings.list({ sourceSid: twilio });
      const { sid, status } = recording;
      if (status === 'completed') {
        const { id } = doc;
        const file = await storage.file(`${id}`);
        await request(
          `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Recordings/${sid}.wav`,
        )
          .pipe(
            file.createWriteStream({
              metadata: { contentType: 'audio/wav' },
            }),
          )
          .on('error', err => console.log(err))
          .on('finish', async () => {
            const [url] = await file.getSignedUrl({
              action: 'read',
              expires: '01-01-3000',
            });
            const response = await axios({
              method: 'post',
              url: 'https://brain.deepgram.com/v2/listen',
              auth: {
                username: functions.config().deepgram.username,
                password: functions.config().deepgram.password,
              },
              headers: {
                'Content-Type': 'application/json',
              },
              params: {
                model: 'phonecall',
                multichannel: true,
                punctuate: true,
              },
              data: {
                url,
              },
            });
            await calls.doc(id).update({
              audio: url,
              fetched: true,
              call_duration: recording.duration,
              call_time: recording.dateCreated,
              deepgram: response.data,
            });
            await client.recordings(sid).remove();
            const userInfo = {
              user1email: '',
              user1name: '',
              user2email: '',
              user2name: '',
            };
            await contacts
              .doc(doc.data().contact_ref.id)
              .onSnapshot(async doc => {
                await users.doc(doc.data().user1.id).onSnapshot(user1 => {
                  userInfo.user1email = user1.email;
                  userInfo.user1name = user1.displayName;
                });
                await users.doc(doc.data().user2.id).onSnapshot(user2 => {
                  userInfo.user2email = user2.email;
                  userInfo.user2name = user2.displayName;
                });
              });
            const email1 = {
              to: userInfo.user1email,
              from: 'labsrecaller@gmail.com',
              templateId: 'd-59ed5092b3bf44118a5d7c1e0f617eef',
              substitutionWrappers: ['{{', '}}'],
              substitutions: {
                user2: userInfo.user2name,
                audio: url,
                transcript:
                  response.data.results.channels[0].alternatives[0].transcript,
              },
            };
            const email2 = {
              to: userInfo.user2email,
              from: 'labsrecaller@gmail.com',
              templateId: 'd-59ed5092b3bf44118a5d7c1e0f617eef',
              substitutionWrappers: ['{{', '}}'],
              substitutions: {
                user2: userInfo.user1name,
                audio: url,
                transcript:
                  response.data.results.channels[0].alternatives[0].transcript,
              },
            };

            await sgMail.send(email1);
            await sgMail.send(email2);
          });
      } else {
        console.log('Call has not finished recording');
      }
    });
  } catch (err) {
    console.log(err);
  }
};
