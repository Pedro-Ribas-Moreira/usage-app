let dropArea = document.getElementById("drop-area");

// listen for file drag and drop events
dropArea.addEventListener("dragenter", handleDragEnter, false);
dropArea.addEventListener("dragover", handleDragOver, false);
dropArea.addEventListener("dragleave", handleDragLeave, false);
dropArea.addEventListener("drop", handleFileSelect, false);

const handleDragEnter = (e) => {
  this.classList.add("drag-over");
};
const handleDragOver = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const handleDragLeave = (e) => {
  this.classList.remove("drag-over");
};

let data;

const handleFileSelect = (e) => {
  this.classList.remove("drag-over");
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
    console.log(result);
    createTable(result);
    data = result;
  };
  reader.readAsText(file);

  // Create a table element
};

// const createTable = (result) => {
//   let table = document.createElement("table");
//   table.setAttribute("id", "csv-table");

//   // Create a table header row
//   let headerRow = table.insertRow();
//   for (let i = 0; i < result[0].length; i++) {
//     let headerCell = headerRow.insertCell();
//     headerCell.innerHTML = result[0][i];
//   }

//   // Create a table body
//   let tableBody = document.createElement("tbody");
//   table.appendChild(tableBody);

//   // Insert data rows
//   for (let i = 1; i < result.length; i++) {
//     let dataRow = tableBody.insertRow();
//     for (let j = 0; j < result[i].length; j++) {
//       let dataCell = dataRow.insertCell();
//       dataCell.innerHTML = result[i][j];
//     }
//   }

//   // Append the table to the document
//   document.body.appendChild(table);
// };
