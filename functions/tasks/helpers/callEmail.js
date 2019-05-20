module.exports = function callEmail(
  user1,
  user2,
  audio,
  transcript,
  id,
  contactId,
) {
  let html = ``;

  transcript.forEach(line => {
    html += `<h3>${line.user}</h3><p>${line.script}</p>`;
  });

  return {
    personalizations: [
      {
        to: [
          {
            email: user1.email,
            name: user1.displayName,
          },
        ],
      },
    ],
    from: { email: 'labsrecaller@gmail.com', name: 'ReCaller Team' },
    subject: `Your ReCall With ${user2}`,
    content: [
      {
        type: 'text/html',
        value: `<h1>Thank you for using ReCaller!</h1>
      <h2>Your call with ${user2} is available for review below.</h2>

      <p><a href="http://lambda-recaller.com/prev-calls/${
        user1.uid
      }/${id}">A record of this call can be accessed and shared here.</a></p>

      <p>You can update or review the schedule for this call from the <a href="http://lambda-recaller.com/contact/${contactId}">Contact Information Page</a></p>

      <audio controls><source src=${audio} type='audio/wav' /><p>The audio for this call can be reviewed from the <a href="http://lambda-recaller.com/prev-calls/${
          user1.uid
        }/${id}">Call Information Page</a></p></audio>
      <h2>Transcript of Call</h2>
      ${html}`,
      },
    ],
  };
};
