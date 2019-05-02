const moment = require('moment-timezone');

module.exports = function randomTime(timeArr) {
  const steps = [0, 15, 30, 45];

  const random = timeArr[Math.floor(Math.random() * timeArr.length)];

  const randomStep = steps[Math.floor(Math.random() * steps.length)];

  const newTime = moment(random)
    .add(randomStep, 'm')
    .toDate();

  return newTime;
};
