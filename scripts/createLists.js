import { main } from "./main.js";
// import { testArray } from "./testArray.js";

// console.log(main(testArray));
// let tArray = main(testArray);
// console.log(tArray[0].getTotals(tArray[0].dayUnits));

//set currency
let euro = Intl.NumberFormat("en-DE", {
  style: "currency",
  currency: "EUR",
});
const nsUrbanHeader = [
  "Date",
  "Night Units",
  "Night Total",
  "Day Units",
  "Day Total",
  "Total Units",
  "Total",
  "Total + Sc",
];

const nsRuralHeader = [
  "Date",
  "Night Units",
  "Night Total",
  "Day Units",
  "Day Total",
  "Total Units",
  "Total",
  "Total + Sc",
];

const dayHeader = ["Date", "Units", "Total", "Total + Sc"];

const dayRuralHeader = ["Date", "Units", "Total", "Total + Sc"];

const touHeader = [
  "Date",
  "Night Units",
  "Night Total",
  "Day Units",
  "Day Total",
  "Peak Units",
  "Peak Total",
  "Total Units",
  "Total",
  "Total + Sc",
];

const touRuralHeader = [
  "Date",
  "Night Units",
  "Night Total",
  "Day Units",
  "Day Total",
  "Peak Units",
  "Peak Total",
  "Total Units",
  "Total",
  "Total + Sc",
];
let nightArray = [nsUrbanHeader];
let nigthRuralArray = [nsRuralHeader];
let dayArray = [dayHeader];
let dayRuralArray = [dayRuralHeader];
let peakArray = [touHeader];
let peakRuralArray = [touRuralHeader];

//FOR TESTING ONLY
function createLists(tArray) {
  let dates = tArray;
  // function createTable(main) {
  // 24H List

  for (let i = 0; i < dates.length; i++) {
    let day = dates[i].day;
    let totalUnits = dates[i].getTotals(dates[i].units).totalUnits.toFixed(2);

    // 24h

    dayArray.push([
      day,
      totalUnits,
      euro.format(dates[i].getTotals(dates[i].units).totalPaid),
      euro.format(
        dates[i].getTotals(dates[i].units).totalPaid +
          dates[i].tariff.urbanDaySC
      ),
    ]);

    dayRuralArray.push([
      day,
      totalUnits,
      euro.format(dates[i].getTotals(dates[i].units).totalPaid),
      euro.format(
        dates[i].getTotals(dates[i].units).totalPaid +
          dates[i].tariff.ruralDaySC
      ),
    ]);

    // DAY/NIGHT

    let nightUnits = dates[i]
      .getTotals(dates[i].nightUnits)
      .totalUnits.toFixed(2);
    let nightUnitsPaid = dates[i].getTotals(dates[i].nightUnits).totalPaid;
    let dayUnits = dates[i].getTotals(dates[i].dayUnits).totalUnits.toFixed(2);
    let dayUnitsPaid = dates[i].getTotals(dates[i].dayUnits).totalPaid;

    nightArray.push([
      day,
      nightUnits,
      euro.format(nightUnitsPaid),
      dayUnits,
      euro.format(dayUnitsPaid),
      totalUnits,
      euro.format(dayUnitsPaid + nightUnitsPaid),
      euro.format(
        dayUnitsPaid + nightUnitsPaid + dates[i].tariff.urbanNightsaverSC
      ),
    ]);

    nigthRuralArray.push([
      day,
      nightUnits,
      euro.format(nightUnitsPaid),
      dayUnits,
      euro.format(dayUnitsPaid),
      totalUnits,
      euro.format(dayUnitsPaid + nightUnitsPaid),
      euro.format(
        dayUnitsPaid + nightUnitsPaid + dates[i].tariff.ruralNightsaverSC
      ),
    ]);

    // TIME OF USAGE

    let touNight = dates[i]
      .getTotals(dates[i].touNightUnits)
      .totalUnits.toFixed(2);
    let touNightPaid = dates[i].getTotals(dates[i].touNightUnits).totalPaid;
    let touDay = dates[i].getTotals(dates[i].touDayUnits).totalUnits.toFixed(2);
    let touDayPaid = dates[i].getTotals(dates[i].touDayUnits).totalPaid;
    let touPeak = dates[i]
      .getTotals(dates[i].touPeakUnits)
      .totalUnits.toFixed(2);
    let touPeakPaid = dates[i].getTotals(dates[i].touPeakUnits).totalPaid;
    let touTotalPaid = touNightPaid + touDayPaid + touPeakPaid;

    peakArray.push([
      day,
      touNight,
      euro.format(touNightPaid),
      touDay,
      euro.format(touDayPaid),
      touPeak,
      euro.format(touPeakPaid),
      totalUnits,
      euro.format(touTotalPaid),
      euro.format(touTotalPaid + dates[i].tariff.touUrbanSC),
    ]);

    peakRuralArray.push([
      day,
      touNight,
      euro.format(touNightPaid),
      touDay,
      euro.format(touDayPaid),
      touPeak,
      euro.format(touPeakPaid),
      totalUnits,
      euro.format(touTotalPaid),
      euro.format(touTotalPaid + dates[i].tariff.touRuralSC),
    ]);
  }

  return;
}

export {
  createLists,
  dayArray,
  dayRuralArray,
  nightArray,
  nigthRuralArray,
  peakArray,
  peakRuralArray,
};
