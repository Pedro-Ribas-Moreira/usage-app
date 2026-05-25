import { createLists, peakArray } from './createLists.js';
import { getChartInfo } from '../ui/mainChart.js';
import { Day } from './date.js';

let dailyArray;
let datesMap = new Map();

const main = (dataArray) => {
  const data = dataArray;
  const dates = [];

  // TODO: Error handler - confirm if the date already exists

  for (let i = 1; i < data.length - 1; i++) {
    let time = data[i][0].split(' ')[1];
    const date = data[i][0].split(' ')[0];

    if (time.length < 5) {
      time = '0' + time;
    }
    data[i][0] = `${date} ${time}`;

    if (data[i][0].split(' ')[0] !== data[i - 1][0].split(' ')[0]) {
      const d = data[i][0].split(' ')[0];
      dates.push(new Day(d));
    }
  }

  for (let i = 0; i < dates.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (dates[i].day === data[j][0].split(' ')[0]) {
        const time = data[j][0].split(' ')[1];
        const unit = isNaN(Number(data[j][1])) ? 0 : Number(data[j][1]);
        dates[i].addUnit(time, unit);
        datesMap.set(dates[i].day, dates[i]);
      }
    }
  }

  createLists(dates);

  const rows = peakArray.slice(1);
  const days = rows.map((row) => row[0]);
  const nightData = rows.map((row) => row[1]);
  const dayData = rows.map((row) => row[3]);
  const peakData = rows.map((row) => row[5]);
  getChartInfo(nightData, dayData, peakData, days);

  dailyArray = dates;
  return dates;
};

export { main, dailyArray, datesMap };
