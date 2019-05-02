module.exports = function callEmail(user1, user2, audio, transcript) {
  return {
    to: user1,
    from: 'labsrecaller@gmail.com',
    subject: `Your Call With ${user2}`,
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
};
