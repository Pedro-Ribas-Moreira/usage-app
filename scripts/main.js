import { createLists, peakArray } from './createLists.js';
import { getChartInfo } from './mainChart.js';
import { testArray } from './testArray.js';
import { Day } from './date.js';

//FOR TESTING ONLY
// const dataArray = testArray;
let dailyArray;
var datesMap = new Map();

const main = (dataArray) => {
  //DATA
  let data = dataArray;
  var dates = [];

  // TODO: Error handler - confirm if the date already exists

  //GET TOTAL DAYS
  for (let i = 1; i < data.length - 1; i++) {
    // console.log(data[i][0].split(" ")[1].length);
    let time = data[i][0].split(' ')[1];
    let date = data[i][0].split(' ')[0];

    if (time.length < 5) {
      time = '0' + time;
    }
    data[i][0] = `${date} ${time}`;

    if (data[i][0].split(' ')[0] !== data[i - 1][0].split(' ')[0]) {
      let d = data[i][0].split(' ')[0];
      const newDate = new Day(d);
      //   newDate.findTariff(d);
      dates.push(newDate);
      // datesMap.set(newDate.day, newDate);
    }
  }

  //   GET TOTAL USAGE
  for (let i = 0; i < dates.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (dates[i].day === data[j][0].split(' ')[0]) {
        // dates[i].totalUsage += Number(data[j][1]);
        let time = data[j][0].split(' ')[1];
        let unit = isNaN(Number(data[j][1])) ? 0 : Number(data[j][1]);
        dates[i].addUnit(time, unit);
        datesMap.set(dates[i].day, dates[i]);
      }
    }
    console.log('DATE: ' + dates[i].day);
    // console.log('Day: ');
    // console.log(dates[i].touDayUnits);
    // console.log('Peak: ');
    // console.log(dates[i].touPeakUnits);
    // console.log('Night: ');
    // console.log(dates[i].touNightUnits);
    console.log('Check below the prices applied for: ', dates[i].day);
    console.log(dates[i].tariff);
  }

  createLists(dates);
  let d1 = [];
  let d2 = [];
  let d3 = [];
  let days = [];
  for (let i = 1; i < peakArray.length; i++) {
    days.push(peakArray[i][0]);
    d1.push(peakArray[i][1]);
    d2.push(peakArray[i][3]);
    d3.push(peakArray[i][5]);
  }

  getChartInfo(d1, d2, d3, days);
  let last7days = peakArray.slice(-7);

  let e1 = [];
  let e2 = [];
  let e3 = [];
  let secondDays = [];
  for (let i = 1; i < last7days.length; i++) {
    secondDays.push(last7days[i][0]);
    e1.push(last7days[i][1]);
    e2.push(last7days[i][3]);
    e3.push(last7days[i][5]);
  }

  let f1 = 0;
  let f2 = 0;
  let f3 = 0;

  for (let i = 1; i < peakArray.length; i++) {
    f1 += Number(peakArray[i][1]);
    f2 += Number(peakArray[i][3]);
    f3 += Number(peakArray[i][5]);
  }
  // console.log({ f1, f2, f3 });
  dailyArray = dates;

  return dates;
};

// console.log(datesMap);
export { main, dailyArray, datesMap };
