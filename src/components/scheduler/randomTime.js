import moment from 'moment-timezone';

export default function randomTime(timeObj) {
  const timeArr = Object.entries(timeObj).reduce((array, [key, val]) => {
    if (val.length) {
      array.push(...val);
    }
    return array;
  }, []);
  const steps = [0, 15, 30, 45];

  const random = timeArr[Math.floor(Math.random() * timeArr.length)];

  const randomStep = steps[Math.floor(Math.random() * steps.length)];

  const newTime = moment(random)
    .add(randomStep, 'm')
    .format();

  return newTime;
}
