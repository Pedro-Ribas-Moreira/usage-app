// import { dailyArray } from "./main.js";

const listContainer = document.querySelector(".list-container");
let euro = Intl.NumberFormat("en-DE", {
  style: "currency",
  currency: "EUR",
});

const createTable = (array, dailyArray, datesMap, tariff) => {
  if (document.querySelector("#csv-table") !== null) {
    document.querySelector("#csv-table").remove();
  }
  // Create a table header row
  let table = document.createElement("table");
  table.setAttribute("id", "csv-table");

  let headerRow = table.insertRow();
  for (let i = 0; i < array[0].length; i++) {
    let headerCell = document.createElement("th");
    headerCell.innerText = array[0][i];
    headerCell.setAttribute("id", array[0][i]);
    headerCell.setAttribute("onclick", `sortTable(${i})`);
    headerCell.classList.add("header-cell");
    headerCell.classList.add("table-sortable");
    headerRow.appendChild(headerCell);
  }
  let tableHeader = document.createElement("thead");
  tableHeader.appendChild(headerRow);
  // Create a table body
  let tableBody = document.createElement("tbody");
  // Insert data rows
  for (let i = array.length - 1; i > 0; i--) {
    let dataRow = tableBody.insertRow();
    for (let j = 0; j < array[i].length; j++) {
      let dataCell = dataRow.insertCell();
      dataCell.innerHTML = array[i][j];
    }
    let arrayRow = tableBody.insertRow();
    arrayRow.classList.add(`${i}`);
    arrayRow.classList.add("hidden");
    arrayRow.classList.add("time-row");

    let arrayCell = arrayRow.insertCell();
    arrayCell.setAttribute("colspan", "100%");

    // ADDING DAY TOTALS
    // HEADERS TIME UNITS TOTAL (based on )

    const subTable = document.createElement("table");
    subTable.classList.add("subTable");
    const subTableHeader = document.createElement("thead");
    const subHeaderRow = subTableHeader.insertRow();
    const subTableBody = document.createElement("tbody");

    subTable.appendChild(subTableHeader);
    subTableHeader.appendChild(subHeaderRow);
    subTable.appendChild(subTableBody);

    arrayCell.appendChild(subTable);

    const firstLabel = "Time";
    const secondLabel = "Unit";
    const thirdLabel = "Total";

    const firsCell = document.createElement("th");
    firsCell.innerHTML = firstLabel;
    subHeaderRow.appendChild(firsCell);

    const secondCell = document.createElement("th");
    secondCell.innerHTML = secondLabel;
    subHeaderRow.appendChild(secondCell);

    const thirdCell = document.createElement("th");
    thirdCell.innerHTML = thirdLabel;
    subHeaderRow.appendChild(thirdCell);

    // console.log(`lenght: ${dailyArray.length}`);

    for (let j = 0; j < dailyArray.length; j++) {
      if (array[i][0] == dailyArray[j].day) {
        // console.log("here");
        // console.log(datesMap.get(dailyArray[j].day));
        if (tariff == "24h") {
          datesMap.get(dailyArray[j].day).units.map((e) => {
            const subBodyRow = subTableBody.insertRow();
            let timeCell = subBodyRow.insertCell();
            timeCell.innerHTML = e.time;

            let usageCell = subBodyRow.insertCell();
            usageCell.innerHTML = e.usage;

            let totalCell = subBodyRow.insertCell();
            totalCell.innerHTML = euro.format(e.total);
          });
        }
        if (tariff == "nightsaver") {
          datesMap.get(dailyArray[j].day).nightSaver.map((e) => {
            const subBodyRow = subTableBody.insertRow();
            let timeCell = subBodyRow.insertCell();
            timeCell.innerHTML = e.time;

            let usageCell = subBodyRow.insertCell();
            usageCell.innerHTML = e.usage;

            let totalCell = subBodyRow.insertCell();
            totalCell.innerHTML = euro.format(e.total);
          });
        }
        if (tariff == "tou") {
          datesMap.get(dailyArray[j].day).timeOfUsage.map((e) => {
            const subBodyRow = subTableBody.insertRow();
            let timeCell = subBodyRow.insertCell();
            timeCell.innerHTML = e.time;

            let usageCell = subBodyRow.insertCell();
            usageCell.innerHTML = e.usage;

            let totalCell = subBodyRow.insertCell();
            totalCell.innerHTML = euro.format(e.total);
          });
        }
      }
    }

    // arrayCell.innerHTML = "Hello World!";

    // arrayRow.classList.add(`${i}`);
    dataRow.classList.add(`${i}`);
    dataRow.classList.add("day-row");
  }

  table.appendChild(tableHeader);
  table.appendChild(tableBody);

  // Append the table to the document
  listContainer.appendChild(table);
  listContainer.classList.remove("hidden");
};

window.addEventListener("click", (e) => {
  let row = e.target.parentElement;
  if (row.classList.contains("day-row")) {
    row.classList.toggle("active-row");
    row.nextSibling.classList.toggle("hidden");
  }
});

export { createTable };
