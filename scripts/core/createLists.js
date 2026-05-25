import { euro } from '../utils/format.js';

const nsUrbanHeader = ['Date', 'Night Units', 'Night Total', 'Day Units', 'Day Total', 'Total Units', 'Total', 'Total + Sc'];
const nsRuralHeader = ['Date', 'Night Units', 'Night Total', 'Day Units', 'Day Total', 'Total Units', 'Total', 'Total + Sc'];
const dayHeader = ['Date', 'Units', 'Total', 'Total + Sc'];
const dayRuralHeader = ['Date', 'Units', 'Total', 'Total + Sc'];
const touHeader = ['Date', 'Night Units', 'Night Total', 'Day Units', 'Day Total', 'Peak Units', 'Peak Total', 'Total Units', 'Total', 'Total + Sc'];
const touRuralHeader = ['Date', 'Night Units', 'Night Total', 'Day Units', 'Day Total', 'Peak Units', 'Peak Total', 'Total Units', 'Total', 'Total + Sc'];

let nightArray = [nsUrbanHeader];
let nightRuralArray = [nsRuralHeader];
let dayArray = [dayHeader];
let dayRuralArray = [dayRuralHeader];
let peakArray = [touHeader];
let peakRuralArray = [touRuralHeader];

function createLists(tArray) {
  const dates = tArray;

  for (let i = 0; i < dates.length; i++) {
    const day = dates[i].day;
    const totalUnits = dates[i].getTotals(dates[i].units).totalUnits.toFixed(2);
    const totalPaid = dates[i].getTotals(dates[i].units).totalPaid;

    dayArray.push([
      day,
      totalUnits,
      euro.format(totalPaid),
      euro.format(totalPaid + dates[i].tariff.urbanDaySC),
    ]);

    dayRuralArray.push([
      day,
      totalUnits,
      euro.format(totalPaid),
      euro.format(totalPaid + dates[i].tariff.ruralDaySC),
    ]);

    const nightUnits = dates[i].getTotals(dates[i].nightUnits).totalUnits.toFixed(2);
    const nightUnitsPaid = dates[i].getTotals(dates[i].nightUnits).totalPaid;
    const dayUnits = dates[i].getTotals(dates[i].dayUnits).totalUnits.toFixed(2);
    const dayUnitsPaid = dates[i].getTotals(dates[i].dayUnits).totalPaid;

    nightArray.push([
      day,
      nightUnits,
      euro.format(nightUnitsPaid),
      dayUnits,
      euro.format(dayUnitsPaid),
      totalUnits,
      euro.format(dayUnitsPaid + nightUnitsPaid),
      euro.format(dayUnitsPaid + nightUnitsPaid + dates[i].tariff.urbanNightsaverSC),
    ]);

    nightRuralArray.push([
      day,
      nightUnits,
      euro.format(nightUnitsPaid),
      dayUnits,
      euro.format(dayUnitsPaid),
      totalUnits,
      euro.format(dayUnitsPaid + nightUnitsPaid),
      euro.format(dayUnitsPaid + nightUnitsPaid + dates[i].tariff.ruralNightsaverSC),
    ]);

    const touNight = dates[i].getTotals(dates[i].touNightUnits).totalUnits.toFixed(2);
    const touNightPaid = dates[i].getTotals(dates[i].touNightUnits).totalPaid;
    const touDay = dates[i].getTotals(dates[i].touDayUnits).totalUnits.toFixed(2);
    const touDayPaid = dates[i].getTotals(dates[i].touDayUnits).totalPaid;
    const touPeak = dates[i].getTotals(dates[i].touPeakUnits).totalUnits.toFixed(2);
    const touPeakPaid = dates[i].getTotals(dates[i].touPeakUnits).totalPaid;
    const touTotalPaid = touNightPaid + touDayPaid + touPeakPaid;

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
}

export { createLists, dayArray, dayRuralArray, nightArray, nightRuralArray, peakArray, peakRuralArray };
