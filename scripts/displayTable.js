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

const displayTable = (tariff, location, broaband) => {
  if (tariff == "24h") {
    if (location == "urban") {
      createTable(dayArray);
      summaryBox(tariff, dayArray, location, broaband);
    } else if (location == "rural") {
      createTable(dayRuralArray);
      summaryBox(tariff, dayRuralArray, location, broaband);
    } else {
      alert("invalid location");
    }
  }
  if (tariff == "nightsaver") {
    if (location == "urban") {
      createTable(nightArray);
      summaryBox(tariff, nightArray, location, broaband);
    } else if (location == "rural") {
      createTable(nigthRuralArray);
      summaryBox(tariff, nigthRuralArray, location, broaband);
    } else {
      alert("invalid location");
    }
  }
  if (tariff == "tou") {
    if (location == "urban") {
      createTable(peakArray);
      summaryBox(tariff, peakArray, location, broaband);
    } else if (location == "rural") {
      createTable(peakRuralArray);
      summaryBox(tariff, peakRuralArray, location, broaband);
    } else {
      alert("invalid location");
    }
  }
};

export { displayTable };
