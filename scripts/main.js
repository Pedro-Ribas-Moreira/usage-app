import { createLists, peakArray } from "./createLists.js";
import { getChartInfo, getSecondChartInfo } from "./mainChart.js";
import { testArray } from "./testArray.js";
import { Day } from "./date.js";

//FOR TESTING ONLY
// const dataArray = testArray;
const main = (dataArray) => {
  //DATA
  let data = dataArray;
  var dates = [];

  // TODO: Error handler - confirm if the date already exists

  //GET TOTAL DAYS
  for (let i = 1; i < data.length - 1; i++) {
    // console.log(data[i][0].split(" ")[1].length);
    let time = data[i][0].split(" ")[1];
    let date = data[i][0].split(" ")[0];

    if (time.length < 5) {
      time = "0" + time;
    }
    data[i][0] = `${date} ${time}`;

    if (data[i][0].split(" ")[0] !== data[i - 1][0].split(" ")[0]) {
      let d = data[i][0].split(" ")[0];
      const newDate = new Day(d);
      //   newDate.findTariff(d);
      dates.push(newDate);
    }
  }

  //   GET TOTAL USAGE
  for (let i = 0; i < dates.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (dates[i].day === data[j][0].split(" ")[0]) {
        // dates[i].totalUsage += Number(data[j][1]);
        let time = data[j][0].split(" ")[1];
        let unit = Number(data[j][1]);
        dates[i].addUnit(time, unit);
      }
    }
  }

  // console.log(dates);

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

  getSecondChartInfo(e1, e2, e3, secondDays);
  return dates;
};

export { main };
