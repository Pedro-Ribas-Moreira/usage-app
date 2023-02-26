import { prices } from "./prices.js";
import { testArray } from "./testArray.js";
import { Day } from "./date.js";

//FOR TESTING ONLY
const dataArray = testArray;

function main(dataArray) {
  //DATA
  let data = dataArray;
  var dates = [];

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
    console.log(dates[i]);
  }

  //   // var arr_name:datatype[][]
  //   // DATE	NIGHT UNITS	NIGHT TOTAL	DAY UNITS	DAY TOTAL	TOTAL 	TOTAL + SC
  //   for (let i = 0; i < dates.length; i++) {
  //     let infoDate = dates[i].date;
  //     let dateUnits = dates[i].totalUsage;
  //     let dateTotal = dateUnits * alldayPrice;
  //     let dateTotalSC = dateTotal + urbanDaySC;
  //     let ruralAllDayTotalSC = dateTotal + ruralDaySC;

  //     // console.log(infoDate)
  //     dayArray.push([
  //       infoDate,
  //       Number(dateUnits.toFixed(2)),
  //       euro.format(dateTotal),
  //       euro.format(dateTotalSC),
  //     ]);
  //     dayRuralArray.push([
  //       infoDate,
  //       Number(dateUnits.toFixed(2)),
  //       euro.format(dateTotal),
  //       euro.format(ruralAllDayTotalSC),
  //     ]);

  //     let nightUnits = dates[i].nightUsage;
  //     let nightTotal = nightUnits * nighPrice;
  //     let dayUnits = dates[i].dayUsage;
  //     let dayTotal = dayUnits * dayPrice;
  //     let daynightTotal = nightTotal + dayTotal;
  //     let daynightTotalSC = daynightTotal + urbanNightsaverSC;
  //     let ruralDaynightTotalSC = daynightTotal + ruralNightsaverSC;

  //     nightArray.push([
  //       infoDate,
  //       Number(nightUnits.toFixed(2)),
  //       euro.format(nightTotal),
  //       Number(dayUnits.toFixed(2)),
  //       euro.format(dayTotal),
  //       euro.format(daynightTotal),
  //       euro.format(daynightTotalSC),
  //     ]);
  //     nigthRuralArray.push([
  //       infoDate,
  //       Number(nightUnits.toFixed(2)),
  //       euro.format(nightTotal),
  //       Number(dayUnits.toFixed(2)),
  //       euro.format(dayTotal),
  //       euro.format(daynightTotal),
  //       euro.format(ruralDaynightTotalSC),
  //     ]);

  //     let peakNightTotal = nightUnits * touNightPrice;
  //     let peakDayUnits = dayUnits - dates[i].peakUsage;
  //     let peakDayTotal = peakDayUnits * touDayPrice;

  //     let peakUnits = dates[i].peakUsage;
  //     let peakTotal = peakUnits * touPeakPrice;

  //     let peakDaynightTotal = peakNightTotal + peakDayTotal + peakTotal;
  //     let peakDaynightTotalSC = peakDaynightTotal + touUrbanSC;
  //     let peakRuralDaynightTotalSC = peakDaynightTotal + touRuralSC;

  //     peakArray.push([
  //       infoDate,
  //       nightUnits.toFixed(2),
  //       euro.format(peakNightTotal),
  //       peakDayUnits.toFixed(2),
  //       euro.format(peakDayTotal),
  //       peakUnits.toFixed(2),
  //       euro.format(peakTotal),
  //       euro.format(peakDaynightTotal),
  //       euro.format(peakDaynightTotalSC),
  //     ]);
  //     peakRuralArray.push([
  //       infoDate,
  //       nightUnits.toFixed(2),
  //       euro.format(peakNightTotal),
  //       peakDayUnits.toFixed(2),
  //       euro.format(peakDayTotal),
  //       peakUnits.toFixed(2),
  //       euro.format(peakTotal),
  //       euro.format(peakDaynightTotal),

  //       euro.format(peakRuralDaynightTotalSC),
  //     ]);
  //   }

  //   // CHART INFOS
  //   let d1 = [];
  //   let d2 = [];
  //   let d3 = [];
  //   let days = [];
  //   for (let i = 1; i < peakArray.length; i++) {
  //     days.push(peakArray[i][0]);
  //     d1.push(peakArray[i][1]);
  //     d2.push(peakArray[i][3]);
  //     d3.push(peakArray[i][5]);
  //   }

  //   getChartInfo(d1, d2, d3, days);
}

main(dataArray);
