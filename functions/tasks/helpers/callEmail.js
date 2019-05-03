module.exports = function callEmail(user1, user2, audio, transcript, id) {
  return {
    to: user1,
    from: 'labsrecaller@gmail.com',
    subject: `Your ReCall With ${user2}`,
    text: `Thank you for using ReCaller! Your recent call with ${user2} is avalable at the link below.\n
    \n
    http://www.lambdarecaller.com/call/${id}
    `,
    html: `<strong>Thank you for using ReCaller! Your call with ${user2} is available for review below</strong>\n
    \n
    <audio controls>
      <source src=${audio} type='audio/wav' />

      Your email client does not support the audio element. You can access the recording <a href="http://www.lambdarecaller.com/call/${id}">here</a>
    </audio>
    <p></p>`,
  };
};
