const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');
const moment = require('moment-timezone');

sgMail.setApiKey(functions.config().sendgrid.key);

exports.handler = async function contactEmail(snapshot, context, firestore) {
  const data = snapshot.data();

  const user1get = await data.user1.get();
  const user1 = user1get.data();

  const user2get = await data.user2.get();
  const user2 = user2get.data();

  const day = moment(data.next_call, 'X').format('dddd');
  const date = moment(data.next_call, 'X').format('MMMM Do');
  const time = moment(data.next_call, 'X')
    .tz(data.timezone)
    .format('h:mm A z');

  const msg = {
    personalizations: [
      {
        to: user1.email,
        name: user1.displayName,
        dynamic_template_data: {
          user2: user2.displayName,
        },
      },
      {
        to: user2.email,
        name: user2.displayName,
        dynamic_template_data: {
          user2: user1.displayName,
        },
      },
    ],
    from: { email: 'labsrecaller@gmail.com', name: 'ReCaller' },
    dynamic_template_data: {
      day,
      date,
      time,
    },
    templateId: 'd-71394bc9f9514df59be8742a842313f8',
  };
  sgMail.send(msg);
};
