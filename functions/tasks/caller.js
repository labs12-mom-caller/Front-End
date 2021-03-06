const functions = require('firebase-functions');

const moment = require('moment-timezone');

const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;
const client = require('twilio')(accountSid, authToken);

const randomTime = require('./helpers/randomTime.js');

exports.handler = async (req, res, firestore) => {
  const contacts = firestore.collection('contacts');
  const calls = firestore.collection('calls');
  const min = moment()
    .subtract(3, 'm')
    .toDate();
  const max = moment()
    .add(3, 'm')
    .toDate();
  try {
    const snapshot = await contacts
      .where('next_call', '>', min)
      .where('next_call', '<', max)
      .where('canceled', '==', false)
      .get();
    if (snapshot.empty) {
      console.log('No contacts');
      return;
    }
    snapshot.forEach(async doc => {
      const user1 = await doc.data().user1.get();
      const user1phone = user1.data().phoneNumber;
      const user2 = await doc.data().user2.get();
      const user2phone = user2.data().phoneNumber;

      const twilioUrl =
        doc.data().call_type === 'free'
          ? `https://handler.twilio.com/twiml/EHef6fe8c09005a4e4fa44c3142c2b2592?BuddyPhone=${user2phone}`
          : `https://handler.twilio.com/twiml/EHbb3b954f5734086e1f577a192e39c99f?BuddyPhone=${user2phone}`;

      await client.calls
        .create({
          url: twilioUrl,
          to: user1phone,
          from: '+18727048254',
        })
        .then(call => {
          calls
            .add({
              call_time: moment().toDate(),
              contact_ref: contacts.doc(doc.id),
              twilio: call.sid,
              fetched: false,
            })
            .then(ref => {
              if (doc.data().call_type === 'paid') {
                if (doc.data().call_frequency === 'Bi-Weekly') {
                  const nextCall = moment
                    .tz(
                      `${doc.data().scheduled_day} ${
                        doc.data().scheduled_time
                      }`,
                      'dddd h:mm A',
                      doc.data().timezone,
                    )
                    .second(0)
                    .add(2, 'w')
                    .toDate();
                  contacts.doc(doc.id).update({
                    next_call: nextCall,
                    updated_at: moment().toDate(),
                  });
                  console.log('Call information updated!');
                } else {
                  const nextCall = moment
                    .tz(
                      `${doc.data().scheduled_day} ${
                        doc.data().scheduled_time
                      }`,
                      'dddd h:mm A',
                      doc.data().timezone,
                    )
                    .second(0)
                    .add(4, 'w')
                    .toDate();
                  contacts.doc(doc.id).update({
                    next_call: nextCall,
                    updated_at: moment().toDate(),
                  });
                  console.log('Call information updated!');
                }
              } else {
                if (doc.data().call_frequency === 'Bi-Weekly') {
                  const newTimes = doc.data().selected_times.map(time => {
                    return moment
                      .tz(time, doc.data().timezone)
                      .add(2, 'w')
                      .format();
                  });
                  const rando = randomTime(newTimes);
                  const nextCall = moment(rando).toDate();
                  contacts.doc(doc.id).update({
                    selected_times: newTimes,
                    next_call: nextCall,
                    updated_at: moment().toDate(),
                  });
                  console.log('Call information updated!');
                } else {
                  const newTimes = doc.data().selected_times.map(time => {
                    return moment
                      .tz(time, doc.data().timezone)
                      .add(4, 'w')
                      .format();
                  });
                  const rando = randomTime(newTimes);
                  const nextCall = moment(rando).toDate();
                  contacts.doc(doc.id).update({
                    selected_times: newTimes,
                    next_call: nextCall,
                    updated_at: moment().toDate(),
                  });
                  console.log('Call information updated!');
                }
                console.log('Call completed');
              }
              console.log(`Added call document with ID: ${ref.id}`);
            })
            .catch(err => {
              console.log('Error adding document: ', err);
            });
        });
    });
  } catch (err) {
    console.log('Error getting docs', err);
  }
};
