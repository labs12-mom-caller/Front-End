import moment from 'moment-timezone';

export default function randomTime(timeArr) {
  const steps = [0, 15, 30, 45];

  const random = timeArr[Math.floor(Math.random() * timeArr.length)];

  const randomStep = steps[Math.floor(Math.random() * steps.length)];

  const newTime = moment(random)
    .add(randomStep, 'm')
    .format();

  return newTime;
}
