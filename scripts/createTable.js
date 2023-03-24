import { dailyArray } from "./main.js";

const listContainer = document.querySelector(".list-container");

const createTable = (array) => {
  console.log({
    dailyArray,
  });

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
    let arrayCell = arrayRow.insertCell();
    arrayCell.setAttribute("colspan", "100%");
    arrayCell.innerHTML = "Hello World!";
    arrayRow.style.display = "none";

    arrayRow.classList.add(`hidden-row-id-${i}`);
    arrayRow.classList.add(`showHiddenRow(${i})`);
    dataRow.classList.add(`row-id-${i}`);
  }

  table.appendChild(tableHeader);
  table.appendChild(tableBody);

  // Append the table to the document
  listContainer.appendChild(table);
  listContainer.classList.remove("hidden");
};

export { createTable };
