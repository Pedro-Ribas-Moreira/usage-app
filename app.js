let dropArea = document.getElementById("drop-area");
let loader = document.querySelector(".loader");
let resetBtn = document.querySelector(".reset-btn");
let filterContainer = document.querySelector(".filter-container");
let selectTariff = document.querySelector("#tariff");
let selectLocation = document.querySelector("#location");
let listContainer = document.querySelector(".list-container");
let chartContainer = document.querySelector(".chart-container");

const nsHeader = [
  "DATE",
  "NIGHT-UNITS",
  "NIGHT-TOTAL",
  "DAY-UNITS",
  "DAY-TOTAL",
  "TOTAL",
  "TOTAL+URBAN-SC",
  "TOTAL+RURAL-SC",
];
const dayHeader = [
  "DATE",
  "UNITS",
  "TOTAL",
  "TOTAL + URBAN SC",
  "TOTAL + RURAL SC",
];
const touHeader = [
  "DATE",
  "NIGHT UNITS",
  "NIGHT TOTAL",
  "DAY UNITS",
  "DAY TOTAL",
  "PEAK UNITS",
  "PEAK TOTAL",
  "TOTAL",
  "TOTAL + URBAN SC",
  "TOTAL + RURAL SC",
];

// listen for file drag and drop events
dropArea.addEventListener("dragenter", handleDragEnter, false);
dropArea.addEventListener("dragover", handleDragOver, false);
dropArea.addEventListener("dragleave", handleDragLeave, false);
dropArea.addEventListener("drop", handleFileSelect, false);
let data;
let nightArray = [nsHeader];
let dayArray = [dayHeader];
let peakArray = [touHeader];

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
  this.classList.add("hidden");

  loader.classList.remove("hidden");
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

    let location = selectLocation.value;
    let tariff = selectTariff.value;
    loader.classList.add("hidden");
    // resetBtn.classList.remove("hidden");
    // filterContainer.classList.remove("hidden");
    main(result);
    createTable(tariff, location);
    data = result;
  };
  reader.readAsText(file);

  // Create a table element
}

const createTable = (tariff, location) => {
  let table = document.createElement("table");
  table.setAttribute("id", "csv-table");
  if (tariff == "24h") {
    if (location == "urban") {
      displayTable(dayArray);
    } else if (location == "rural") {
      displayTable(dayArray);
    } else {
      alert("invalid location");
    }
  }
  if (tariff == "nightsaver") {
    if (location == "urban") {
      displayTable(nightArray);
    } else if (location == "rural") {
      displayTable(nightArray);
    } else {
      alert("invalid location");
    }
  }
  if (tariff == "tou") {
    if (location == "urban") {
      displayTable(peakArray);
    } else if (location == "rural") {
      displayTable(peakArray);
    } else {
      alert("invalid location");
    }
  }
};

const displayTable = (array) => {
  // getChartInfo()
  if (document.querySelector("#csv-table") !== null) {
    document.querySelector("#csv-table").remove();
  }
  // Create a table header row
  let table = document.createElement("table");
  table.setAttribute("id", "csv-table");

  let headerRow = table.insertRow();
  for (let i = 0; i < array[0].length; i++) {
    let headerCell = headerRow.insertCell();
    headerCell.innerHTML = array[0][i];
    headerCell.setAttribute("id", array[0][i]);
  }
  let tableHeader = document.createElement("thead");
  tableHeader.appendChild(headerRow);
  // Create a table body

  let tableBody = document.createElement("tbody");
  // Insert data rows
  for (let i = 1; i < array.length; i++) {
    let dataRow = tableBody.insertRow();
    for (let j = 0; j < array[i].length; j++) {
      let dataCell = dataRow.insertCell();
      dataCell.innerHTML = array[i][j];
    }
  }

  table.appendChild(tableHeader);
  table.appendChild(tableBody);

  // Append the table to the document
  listContainer.appendChild(table);
  listContainer.classList.remove("hidden");
};
resetBtn.addEventListener("click", () => {
  dropArea.classList.remove("hidden");
  document.querySelector("#csv-table").remove();
  resetBtn.classList.add("hidden");
});

function main(dataArray) {
  //  console.log(dataArray)
  //TARIFS
  //24H
  const alldayPrice = 0.4154;
  const urbanDaySC = 1.4621;
  const ruralDaySC = 1.7725;

  //NIGHTSAVER
  const nighPrice = 0.2271;
  const dayPrice = 0.46;
  const urbanNightsaverSC = 1.7975;
  const ruralNightsaverSC = 2.0446;

  //TOU
  const touNightPrice = 0.2383;
  const touDayPrice = 0.4595;
  const touPeakPrice = 0.5164;
  const touUrbanSC = 1.4621;
  const touRuralSC = 1.7725;

  //DATA
  let data = dataArray;
  //   console.log(data.length)
  var dates = [];

  //GET TOTAL DAYS
  for (let i = 1; i < data.length - 1; i++) {
    // console.log(data[i][0].split(" ")[1].length);
    let time = data[i][0].split(" ")[1];
    let date = data[i][0].split(" ")[0];

    if (time.length < 5) {
      console.log("here");
      time = "0" + time;
    }
    data[i][0] = `${date} ${time}`;

    if (data[i][0].split(" ")[0] !== data[i - 1][0].split(" ")[0]) {
      dates.push({
        date: data[i][0].split(" ")[0],
        totalUsage: 0,
        nightUsage: 0,
        dayUsage: 0,
        peakUsage: 0,
      });
    }
  }

  // GET TOTAL USAGE
  for (let i = 0; i < dates.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (dates[i].date === data[j][0].split(" ")[0]) {
        dates[i].totalUsage += Number(data[j][1]);

        if (
          data[j][0].split(" ")[1] >= "17:00" &&
          data[j][0].split(" ")[1] <= "21:00"
        ) {
          dates[i].peakUsage += Number(data[j][1]);
        }
        if (
          data[j][0].split(" ")[1] > "08:00" &&
          data[j][0].split(" ")[1] < "23:00"
        ) {
          dates[i].dayUsage += Number(data[j][1]);
        } else {
          dates[i].nightUsage += Number(data[j][1]);
        }
      }
    }
  }

  // define currency
  let euro = Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: "EUR",
  });
  // var arr_name:datatype[][]
  // DATE	NIGHT UNITS	NIGHT TOTAL	DAY UNITS	DAY TOTAL	TOTAL 	TOTAL + SC
  for (let i = 0; i < dates.length; i++) {
    let infoDate = dates[i].date;
    let dateUnits = dates[i].totalUsage;
    let dateTotal = dateUnits * alldayPrice;
    let dateTotalSC = dateTotal + urbanDaySC;
    let ruralAllDayTotalSC = dateTotal + ruralDaySC;

    // console.log(infoDate)
    dayArray.push([
      infoDate,
      dateUnits.toFixed(2),
      euro.format(dateTotal),
      euro.format(dateTotalSC),
      euro.format(ruralAllDayTotalSC),
    ]);

    let nightUnits = dates[i].nightUsage;
    let nightTotal = nightUnits * nighPrice;
    let dayUnits = dates[i].dayUsage;
    let dayTotal = dayUnits * dayPrice;
    let daynightTotal = nightTotal + dayTotal;
    let daynightTotalSC = daynightTotal + urbanNightsaverSC;
    let ruralDaynightTotalSC = daynightTotal + ruralNightsaverSC;

    nightArray.push([
      infoDate,
      nightUnits.toFixed(2),
      euro.format(nightTotal),
      dayUnits.toFixed(2),
      euro.format(dayTotal),
      euro.format(daynightTotal),
      euro.format(daynightTotalSC),
      euro.format(ruralDaynightTotalSC),
    ]);

    let peakNightTotal = nightUnits * touNightPrice;
    let peakDayUnits = dayUnits - dates[i].peakUsage;
    let peakDayTotal = peakDayUnits * touDayPrice;

    let peakUnits = dates[i].peakUsage;
    let peakTotal = peakUnits * touPeakPrice;

    let peakDaynightTotal = peakNightTotal + peakDayTotal + peakTotal;
    let peakDaynightTotalSC = peakDaynightTotal + touUrbanSC;
    let peakRuralDaynightTotalSC = peakDaynightTotal + touRuralSC;

    peakArray.push([
      infoDate,
      nightUnits.toFixed(2),
      euro.format(peakNightTotal),
      peakDayUnits.toFixed(2),
      euro.format(peakDayTotal),
      peakUnits.toFixed(2),
      euro.format(peakTotal),
      euro.format(peakDaynightTotal),
      euro.format(peakDaynightTotalSC),
      euro.format(peakRuralDaynightTotalSC),
    ]);
  }

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
}

selectTariff.addEventListener("change", (e) => {
  createTable(selectTariff.value, selectLocation.value);
});

selectLocation.addEventListener("change", (e) => {
  createTable(selectTariff.value, selectLocation.value);
});

const getChartInfo = (d1, d2, d3, days) => {
  chartContainer.classList.remove("hidden");
  const ctx = document.getElementById("myChart");
  const labels = days;
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Night",
        data: d1,
        backgroundColor: "#023047",
      },
      {
        label: "Day",
        data: d2,
        backgroundColor: "#FFB703",
      },
      {
        label: "Peak",
        data: d3,
        backgroundColor: "#FB8500",
      },
    ],
  };

  new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: {
      plugins: {
        title: {
          display: true,
          text: "Chart.js Bar Chart - Stacked",
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
          autoSkip: false,
        },
        y: {
          stacked: true,
        },
      },
    },
  });
};

// Chart or List
