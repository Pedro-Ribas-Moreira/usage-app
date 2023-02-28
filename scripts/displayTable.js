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

const displayTable = (tariff, location) => {
  if (tariff == "24h") {
    if (location == "urban") {
      createTable(dayArray);
      summaryBox(dayArray, location);
    } else if (location == "rural") {
      createTable(dayRuralArray);
      summaryBox(dayRuralArray, location);
    } else {
      alert("invalid location");
    }
  }
  if (tariff == "nightsaver") {
    if (location == "urban") {
      createTable(nightArray);
      summaryBox(nightArray, location);
    } else if (location == "rural") {
      createTable(nigthRuralArray);
      summaryBox(nigthRuralArray, location);
    } else {
      alert("invalid location");
    }
  }
  if (tariff == "tou") {
    if (location == "urban") {
      createTable(peakArray);
      summaryBox(peakArray, location);
    } else if (location == "rural") {
      createTable(peakRuralArray);
      summaryBox(peakRuralArray, location);
    } else {
      alert("invalid location");
    }
  }
};

export { displayTable };
