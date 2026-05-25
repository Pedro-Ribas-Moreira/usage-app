import { dailyArray, datesMap } from './main.js';
import { dayArray, dayRuralArray, nightArray, nightRuralArray, peakArray, peakRuralArray } from './createLists.js';
import { createTable } from '../ui/createTable.js';
import { summaryBox } from '../ui/summaryBox.js';
import { getDowChartInfo } from '../ui/dowChart.js';

const arrayMap = {
  '24h-urban': dayArray,
  '24h-rural': dayRuralArray,
  'nightsaver-urban': nightArray,
  'nightsaver-rural': nightRuralArray,
  'tou-urban': peakArray,
  'tou-rural': peakRuralArray,
};

const displayTable = (tariff, location, broadband, eab) => {
  const activeArray = arrayMap[`${tariff}-${location}`];
  if (!activeArray) {
    alert('Invalid tariff or location selection.');
    return;
  }
  createTable(activeArray, dailyArray, datesMap, tariff);
  summaryBox(tariff, activeArray, location, broadband, eab);
  getDowChartInfo(activeArray);
};

export { displayTable };
