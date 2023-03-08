import { main } from "./scripts/main.js";
import { displayTable } from "./scripts/displayTable.js";
import {
  dayArray,
  dayRuralArray,
  nightArray,
  nigthRuralArray,
  peakArray,
  peakRuralArray,
} from "./scripts/createLists.js";

import { myChart, getChartInfo } from "./scripts/mainChart.js";

const dropArea = document.getElementById("drop-area");
const loader = document.querySelector(".loader");
const resetBtn = document.querySelector(".reset-btn");
const filterContainer = document.querySelector(".filter-container");
const selectTariff = document.querySelector("#tariff");
const selectLocation = document.querySelector("#location");
const selectBroadband = document.querySelector("#broadband");
const selectEAB = document.querySelector("#EAB");
const listContainer = document.querySelector(".list-container");
const chartContainer = document.querySelector(".chart-container");
const chartIcon = document.querySelector("#chart-icon");
const displayContainer = document.querySelector(".data-display");
const listIcon = document.querySelector("#list-icon");
const summaryContainer = document.querySelector(".summary-container");

let dataIsLoaded = false;
let chartIsLoaded = false;

// listen for file drag and drop events
dropArea.addEventListener("dragenter", handleDragEnter, false);
dropArea.addEventListener("dragover", handleDragOver, false);
dropArea.addEventListener("dragleave", handleDragLeave, false);
dropArea.addEventListener("drop", handleFileSelect, false);

let data;

//drag and drop handlres
function handleDragEnter(e) {
  this.classList.add("drag-over");
}
function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
}

function handleDragLeave(e) {
  this.classList.remove("drag-over");
}

function handleFileSelect(e) {
  this.classList.remove("drag-over");
  dropArea.style.display = "none";
  displayContainer.classList.add("grid");
  displayContainer.classList.remove("flex");

  listContainer.classList.remove("hidden");
  chartContainer.classList.remove("hidden");
  summaryContainer.classList.remove("hidden");

  e.preventDefault();
  e.stopPropagation();

  // ensure only one file is accepted
  if (e.dataTransfer.files.length > 1) {
    alert("Please only drop one file at a time.");
    return;
  }

  // check if file is a csv
  let file = e.dataTransfer.files[0];
  if (file.type !== "text/csv") {
    alert("Please only drop CSV files.");
    return;
  }

  loader.classList.remove("hidden");

  // process the file
  let reader = new FileReader();
  reader.onload = function () {
    let csvData = reader.result;
    let lines = csvData.split("\n");
    let result = [];
    for (let i = 0; i < lines.length; i++) {
      let currentLine = lines[i].split(",");
      result.push(currentLine);
    }
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].length; j++) {
        result[i][j] = result[i][j].replace(/\r/g, "");
      }
    }
    console.log(result);
    loader.classList.add("hidden");
    let location = selectLocation.value;
    let tariff = selectTariff.value;
    let broaband = selectBroadband.value;
    let eab = selectEAB.value;

    main(result);
    displayTable(tariff, location, broaband, eab);

    listContainer.classList.remove("hidden");
    chartContainer.classList.remove("hidden");

    // listIcon.classList.add("active");
    dataIsLoaded = true;
    data = result;
  };
  reader.readAsText(file);
}

resetBtn.addEventListener("click", () => {
  dropArea.style.display = "flex";
  displayContainer.classList.add("flex");
  displayContainer.classList.remove("grid");

  document.querySelector("#csv-table").remove();
  myChart.destroy();

  data = undefined;

  dayArray.length = 1;
  dayRuralArray.length = 1;
  nightArray.length = 1;
  nigthRuralArray.length = 1;
  peakArray.length = 1;
  peakRuralArray.length = 1;

  console.log("After reset: ", {
    dayArray,
    dayRuralArray,
    nightArray,
    nigthRuralArray,
    peakArray,
    peakRuralArray,
  });
  listContainer.classList.add("hidden");
  chartContainer.classList.add("hidden");
  summaryContainer.classList.add("hidden");

  dataIsLoaded = false;
});

selectTariff.addEventListener("change", (e) => {
  if (dataIsLoaded) {
    displayTable(
      selectTariff.value,
      selectLocation.value,
      selectBroadband.value,
      selectEAB.value
    );
  }
});

selectLocation.addEventListener("change", (e) => {
  if (dataIsLoaded) {
    displayTable(
      selectTariff.value,
      selectLocation.value,
      selectBroadband.value,
      selectEAB.value
    );
  }
});

selectBroadband.addEventListener("change", (e) => {
  if (dataIsLoaded) {
    displayTable(
      selectTariff.value,
      selectLocation.value,
      selectBroadband.value,
      selectEAB.value
    );
  }
});

selectEAB.addEventListener("change", (e) => {
  if (dataIsLoaded) {
    displayTable(
      selectTariff.value,
      selectLocation.value,
      selectBroadband.value,
      selectEAB.value
    );
  }
});

function sortTable(col) {
  var rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("csv-table");
  switching = true;
  /* Make a loop that will continue until
    no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
        first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
          one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[col];
      y = rows[i + 1].getElementsByTagName("TD")[col];
      // Check if the two rows should switch place:

      var xValue = parseFloat(x.innerHTML.replace(/[^\d.-]/g, ""));
      var yValue = parseFloat(y.innerHTML.replace(/[^\d.-]/g, ""));
      if (isNaN(x.innerHTML) && isNaN(y.innerHTML)) {
        if (asc) {
          if (xValue > yValue) {
            shouldSwitch = true;
            break;
          }
        } else {
          if (xValue < yValue) {
            shouldSwitch = true;
            break;
          }
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  asc = !asc;
}

let asc = true;
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("header-cell")) {
    document.querySelectorAll(".header-cell").forEach((e) => {
      e.classList.remove("down");
      e.classList.remove("up");
    });
    if (asc) {
      e.target.classList.add("up");
      e.target.classList.remove("down");
    } else {
      e.target.classList.remove("up");
      e.target.classList.add("down");
    }
  }
});

// OPEN AND CLOSE DRAWER
const toggleDrawerButton = document.querySelector(".toggle-drawer");
const drawer = document.querySelector(".drawer");
const closeDrawerButton = document.getElementById("close-drawer");

toggleDrawerButton.addEventListener("click", () => {
  drawer.classList.toggle("hiddenDrawer");
});

closeDrawerButton.addEventListener("click", () => {
  drawer.classList.add("hiddenDrawer");
});
