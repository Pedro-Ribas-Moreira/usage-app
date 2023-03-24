import { dailyArray, datesMap } from "./main.js";
import {
  dayArray,
  dayRuralArray,
  nightArray,
  nigthRuralArray,
  peakArray,
  peakRuralArray,
} from "./createLists.js";
import { createTable } from "./createTable.js";
import { summaryBox } from "./summaryBox.js";

const displayTable = (tariff, location, broaband, eab) => {
  if (tariff == "24h") {
    if (location == "urban") {
      createTable(dayArray, dailyArray, datesMap, tariff);
      summaryBox(tariff, dayArray, location, broaband, eab);
    } else if (location == "rural") {
      createTable(dayRuralArray, dailyArray, datesMap, tariff);
      summaryBox(tariff, dayRuralArray, location, broaband, eab);
    } else {
      alert("invalid location");
    }
  }
  if (tariff == "nightsaver") {
    if (location == "urban") {
      createTable(nightArray, dailyArray, datesMap, tariff);
      summaryBox(tariff, nightArray, location, broaband, eab);
    } else if (location == "rural") {
      createTable(nigthRuralArray, dailyArray, datesMap, tariff);
      summaryBox(tariff, nigthRuralArray, location, broaband, eab);
    } else {
      alert("invalid location");
    }
  }
  if (tariff == "tou") {
    if (location == "urban") {
      createTable(peakArray, dailyArray, datesMap, tariff);
      summaryBox(tariff, peakArray, location, broaband, eab);
    } else if (location == "rural") {
      createTable(peakRuralArray, dailyArray, datesMap, tariff);
      summaryBox(tariff, peakRuralArray, location, broaband, eab);
    } else {
      alert("invalid location");
    }
  }
};

export { displayTable };
