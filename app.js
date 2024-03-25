import { main } from './scripts/main.js';
import { displayTable } from './scripts/displayTable.js';
import {
  dayArray,
  dayRuralArray,
  nightArray,
  nigthRuralArray,
  peakArray,
  peakRuralArray,
} from './scripts/createLists.js';

// import renderPricesTable from './scripts/pricesTable.js';
import { myChart, mySecondChart, myThirdChart, timeChart } from './scripts/mainChart.js';

const dropArea = document.getElementById('drop-area');
const loader = document.querySelector('.loader');
const resetBtn = document.querySelector('.reset-btn');
// const filterContainer = document.querySelector(".filter-container");
const selectTariff = document.querySelector('#tariff');
const selectLocation = document.querySelector('#location');
const selectBroadband = document.querySelector('#broadband');
const selectEAB = document.querySelector('#EAB');
const listContainer = document.querySelector('.list-container');
const chartContainer = document.querySelector('.chart-container');
const chartIcon = document.querySelector('#chart-icon');
const displayContainer = document.querySelector('.data-display');
const listIcon = document.querySelector('#list-icon');
const summaryContainer = document.querySelector('.summary-container');

let dataIsLoaded = false;
let chartIsLoaded = false;

// listen for file drag and drop events
dropArea.addEventListener('dragenter', handleDragEnter, false);
dropArea.addEventListener('dragover', handleDragOver, false);
dropArea.addEventListener('dragleave', handleDragLeave, false);
dropArea.addEventListener('drop', handleFileSelect, false);

let data;

//drag and drop handlres
function handleDragEnter(e) {
  this.classList.add('bg-rose-200');
}
function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
}

function handleDragLeave(e) {
  this.classList.remove('bg-rose-200');
}

function handleFileSelect(e) {
  this.classList.remove('bg-rose-200');
  dropArea.style.display = 'none';
  displayContainer.classList.add('grid');
  displayContainer.classList.remove('flex');

  listContainer.classList.remove('hidden');
  chartContainer.classList.remove('hidden');
  summaryContainer.classList.remove('hidden');

  e.preventDefault();
  e.stopPropagation();

  // ensure only one file is accepted
  if (e.dataTransfer.files.length > 1) {
    alert('Please only drop one file at a time.');
    return;
  }

  // check if file is a csv
  let file = e.dataTransfer.files[0];
  if (file.type !== 'text/csv') {
    alert('Please only drop CSV files.');
    return;
  }

  loader.classList.remove('hidden');

  // process the file
  let reader = new FileReader();
  reader.onload = function () {
    let csvData = reader.result;
    let lines = csvData.split('\n');
    let result = [];
    for (let i = 0; i < lines.length; i++) {
      let currentLine = lines[i].split(',');
      result.push(currentLine);
    }
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].length; j++) {
        result[i][j] = result[i][j].replace(/\r/g, '');
      }
    }
    // console.log(result);
    loader.classList.add('hidden');
    let location = selectLocation.value;
    let tariff = selectTariff.value;
    let broaband = selectBroadband.value;
    let eab = selectEAB.value;

    main(result);
    displayTable(tariff, location, broaband, eab);

    listContainer.classList.remove('hidden');
    // chartContainer.classList.remove("hidden");
    chartContainer.classList.remove('hidden');

    // listIcon.classList.add("active");
    dataIsLoaded = true;
    data = result;
  };
  reader.readAsText(file);
}

resetBtn.addEventListener('click', () => {
  dropArea.style.display = 'flex';
  displayContainer.classList.add('flex');
  displayContainer.classList.remove('grid');

  document.querySelector('#csv-table').remove();
  myChart.destroy();
  mySecondChart.destroy();
  myThirdChart.destroy();
  if (timeChart) {
    timeChart.destroy();
  }

  if (document.querySelector('#myChart').classList.contains('disabled-chart')) {
    document.querySelector('#myChart').classList.remove('disabled-chart');
    document.querySelector('#timeChart').classList.add('disabled-chart');
  }

  data = undefined;

  dayArray.length = 1;
  dayRuralArray.length = 1;
  nightArray.length = 1;
  nigthRuralArray.length = 1;
  peakArray.length = 1;
  peakRuralArray.length = 1;

  listContainer.classList.add('hidden');
  chartContainer.classList.add('hidden');
  summaryContainer.classList.add('hidden');

  dataIsLoaded = false;
});

selectTariff.addEventListener('change', (e) => {
  if (dataIsLoaded) {
    displayTable(selectTariff.value, selectLocation.value, selectBroadband.value, selectEAB.value);
  }
});

selectLocation.addEventListener('change', (e) => {
  if (dataIsLoaded) {
    displayTable(selectTariff.value, selectLocation.value, selectBroadband.value, selectEAB.value);
  }
});

selectBroadband.addEventListener('change', (e) => {
  if (dataIsLoaded) {
    displayTable(selectTariff.value, selectLocation.value, selectBroadband.value, selectEAB.value);
  }
});

selectEAB.addEventListener('change', (e) => {
  if (dataIsLoaded) {
    displayTable(selectTariff.value, selectLocation.value, selectBroadband.value, selectEAB.value);
  }
});

chartIcon.addEventListener('click', () => {
  chartIcon.classList.toggle('activeIcon');
  if (chartIcon.classList.contains('activeIcon')) {
    listIcon.classList.remove('activeIcon');

    listContainer.style.display = 'none';
    chartContainer.classList.add('active-container');
  } else {
    listIcon.classList.add('activeIcon');

    listContainer.style.display = 'flex';
    chartContainer.classList.remove('active-container');
  }
});

// OPEN AND CLOSE DRAWER
const toggleDrawerButton = document.querySelector('.toggle-drawer');
const drawer = document.querySelector('.drawer');
const closeDrawerButton = document.getElementById('close-drawer');

// "drawer", "absolute", "left-28", "bg-white";

toggleDrawerButton.addEventListener('click', () => {
  drawer.classList.toggle('hidden');
  // drawer.classList.toggle("-left-1000");
});

closeDrawerButton.addEventListener('click', () => {
  drawer.classList.toggle('hidden');
});

const savingsBtn = document.getElementById('savings-button');
const contentDiv = document.getElementById('savings-modal');
const closeSavingsModal = document.getElementById('savings-modal-close');
const savingsModalContent = document.getElementById('savings-modal-content');

savingsBtn.addEventListener('click', () => {
  contentDiv.classList.toggle('hidden');
  // Get the current date
  const currentDate = new Date();

  // Get the date for Christmas of the current year
  const christmasDate = new Date(currentDate.getFullYear(), 11, 25);

  // Calculate the time difference in milliseconds
  const timeDifference = christmasDate - currentDate;

  // Convert milliseconds to weeks
  const weeksUntilChristmas = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));

  // Output the result
  console.log(`There are ${weeksUntilChristmas} weeks until Christmas!`);

  savingsModalContent.innerHTML = `There are ${weeksUntilChristmas} weeks until Christmas<br>  If you set up your Savings feature now to put aside <strong>€5</strong> per week <br>You'll have<strong> €${
    weeksUntilChristmas * 5
  } </strong>of credit to cover your Christmas energy spend.  `;
});

// When the user clicks on <span> (x), close the modal
closeSavingsModal.onclick = function () {
  contentDiv.classList.toggle('hidden');
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == contentDiv) {
    contentDiv.classList.toggle('hidden');
  }
};
// Show modal and render prices table when button is clicked
