module.exports = function simplifyTranscript(deepgram, user1, user2) {
  const user1werds = deepgram.results.channels[0].alternatives[0].words.map(
    word => {
      return { ...word, user: user1 };
    },
  );
  const user2werds = deepgram.results.channels[1].alternatives[0].words.map(
    word => {
      return { ...word, user: user2 };
    },
  );

  const combined = [...user1werds, ...user2werds].sort((a, b) => {
    return a.end - b.end;
  });

  let sentence = combined[0].word;
  const simplified = [];

  for (let i = 1; i < combined.length; i += 1) {
    if (combined[i].user === combined[i - 1].user) {
      sentence += ` ${combined[i].word}`;
    } else {
      simplified.push({
        user: combined[i - 1].user,
        script: sentence,
      });
      sentence = combined[i].word;
    }
  }

  return !simplified.length
    ? [{ user: 'System', script: 'This call could not be transcribed.' }]
    : simplified;
};
