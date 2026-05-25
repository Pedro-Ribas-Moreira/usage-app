// =============================================================================
// TODO: Future improvements
//
// 1. TARIFF RECOMMENDATION
//    The tariff comparison card already shows 24H / NightSaver / TOU totals.
//    Add an explicit recommendation line: "You'd save €X by switching to
//    NightSaver." Derive from the three totals already computed in summaryBox.
//
// 2. PEAK-SHIFTING SAVINGS TIP
//    Using the TOU data, calculate how many kWh fell in peak hours and show:
//    "X units were used at peak rate; moving them to off-peak would save €Y."
//    Source data: each Day object's touPeakUnits[] array.
//
// 3. ANOMALY FLAGS IN THE TABLE
//    Mark any day whose total spend is >150% of the customer's own daily
//    average with a warning colour in the table. Useful for billing disputes.
//    Source data: dailyArray totals vs the average already computed in averages.js.
//
// 4. AVERAGE HOURLY PROFILE CHART
//    Average the half-hourly readings across all days to render a "typical day"
//    usage curve. Shows the customer what time they use most energy.
//    Source data: Day.units[] (time-stamped 30-min entries) on every Day object.
//
// 5. DAY-OF-WEEK BREAKDOWN
//    Group daily totals by Mon–Sun to reveal weekend vs weekday patterns.
//    Source data: group dailyArray entries by new Date(day.day).getDay().
//
// 6. CHEAPEST APPLIANCE WINDOW CALLOUT
//    Static callout showing the cheapest rate window from the active tariff,
//    e.g. "Cheapest time to run appliances: 00:30–09:30 (Night: €0.xx/kWh)."
//    Source data: the tariff object already on each Day instance.
//
// 7. DATE RANGE LABEL
//    Show "Analysis covers DD/MM/YYYY – DD/MM/YYYY (N days)" prominently so
//    agents can quote the exact period covered without counting rows.
//    Source data: first and last entries in dailyArray.
// =============================================================================

import { main } from './scripts/core/main.js';
import { displayTable } from './scripts/core/displayTable.js';

const track = (event, params = {}) => {
  if (typeof gtag === 'function') gtag('event', event, params);
};
import {
  dayArray,
  dayRuralArray,
  nightArray,
  nightRuralArray,
  peakArray,
  peakRuralArray,
} from './scripts/core/createLists.js';
import { mainChart, timeChart } from './scripts/ui/mainChart.js';
import { profileChart, getProfileChartInfo } from './scripts/ui/profileChart.js';
import { dowChart } from './scripts/ui/dowChart.js';

const dropArea = document.getElementById('drop-area');
const loader = document.querySelector('.loader');
const resetBtn = document.querySelector('#reset-btn');
// const filterContainer = document.querySelector(".filter-container");
const selectTariff = document.querySelector('#tariff');
const selectLocation = document.querySelector('#location');
const selectBroadband = document.querySelector('#broadband');
const selectEab = document.querySelector('#eab');
const chartIcon = document.querySelector('#chart-icon');
const displayContainer = document.querySelector('.data-display');
const listIcon = document.querySelector('#list-icon');
const summaryContainer = document.querySelector('.summary-container');
const newBtnForm = document.querySelector('#form-new-btn');
const customerSettingsForm = document.querySelector('#customer-settings-form');

const settingsMainDiv = document.querySelector('#settings-main-div');
const resultMainDiv = document.querySelector('#result-main-div');

let dataIsLoaded = false;

// listen for file drag and drop events
dropArea.addEventListener('dragenter', handleDragEnter, false);
dropArea.addEventListener('dragover', handleDragOver, false);
dropArea.addEventListener('dragleave', handleDragLeave, false);
dropArea.addEventListener('drop', handleFileSelect, false);

let data;
let file;

//drag and drop handlres
function handleDragEnter(e) {
  this.classList.add('bg-rose-200', 'dark:brightness-150');
}
function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
}

function handleDragLeave(e) {
  this.classList.remove('bg-rose-200', 'dark:brightness-150');
}

function handleFileSelect(e) {
  this.classList.remove('bg-rose-200', 'dark:brightness-150');
  // dropArea.style.display = 'none';
  // displayContainer.classList.add('grid');
  // displayContainer.classList.remove('flex');

  // listContainer.classList.remove('hidden');
  // chartContainer.classList.remove('hidden');
  // summaryContainer.classList.remove('hidden');

  e.preventDefault();
  e.stopPropagation();

  // ensure only one file is accepted
  if (e.dataTransfer.files.length > 1) {
    alert('Please only drop one file at a time.');
    return;
  }

  // check if file is a csv
  file = e.dataTransfer.files[0];
  if (file.type !== 'text/csv') {
    alert('Please only drop CSV files.');
    return;
  }

  customerSettingsForm.classList.remove('hidden');
  dropArea.classList.add('hidden');
}

newBtnForm.addEventListener('click', () => {
  if (selectTariff.value == '' || selectLocation.value == '' || selectBroadband.value == '' || selectEab.value == '') {
    alert('All options are required.');
    return;
  }

  // dropArea.classList.remove('hidden');
  loader.classList.remove('hidden');
  customerSettingsForm.classList.add('hidden');

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
    let broadband = selectBroadband.value;
    let eab = selectEab.value;

    const dailyData = main(result);
    getProfileChartInfo(dailyData);
    displayTable(tariff, location, broadband, eab);

    dataIsLoaded = true;
    track('file_loaded', {
      tariff,
      location,
      broadband,
      eab,
      days_count: result.length - 1,
    });
    data = result;
  };
  reader.readAsText(file);
  loader.classList.add('hidden');

  resultMainDiv.classList.remove('hidden');
  settingsMainDiv.classList.add('hidden');

  summaryContainer.classList.remove('hidden');
});

resetBtn.addEventListener('click', () => {
  track('session_reset');
  dropArea.classList.remove('hidden');
  customerSettingsForm.classList.add('hidden');
  displayContainer.classList.add('hidden');
  settingsMainDiv.classList.remove('hidden');

  selectLocation.value = '';
  selectTariff.value = '';
  selectBroadband.value = '';
  selectEab.value = '';

  document.querySelector('#csv-table').remove();
  mainChart.destroy();
  if (timeChart) {
    timeChart.destroy();
    document.querySelector('#time-chart').classList.add('hidden');
  }
  if (profileChart) {
    profileChart.destroy();
    document.querySelector('#profile-chart').classList.add('hidden');
  }
  if (dowChart) {
    dowChart.destroy();
    document.querySelector('#dow-chart').classList.add('hidden');
  }

  document.querySelector('#main-chart').classList.remove('hidden');
  document.querySelector('#main-chart').style.display = 'block';

  setActiveChartBtn(document.querySelector('#chart-view-daily'));

  data = undefined;

  dayArray.length = 1;
  dayRuralArray.length = 1;
  nightArray.length = 1;
  nightRuralArray.length = 1;
  peakArray.length = 1;
  peakRuralArray.length = 1;

  dataIsLoaded = false;
});

selectTariff.addEventListener('change', () => {
  if (dataIsLoaded) {
    track('tariff_changed', { tariff: selectTariff.value });
    displayTable(selectTariff.value, selectLocation.value, selectBroadband.value, selectEab.value);
  }
});

selectLocation.addEventListener('change', () => {
  if (dataIsLoaded) {
    track('location_changed', { location: selectLocation.value });
    displayTable(selectTariff.value, selectLocation.value, selectBroadband.value, selectEab.value);
  }
});

selectBroadband.addEventListener('change', () => {
  if (dataIsLoaded) {
    track('broadband_changed', { broadband: selectBroadband.value });
    displayTable(selectTariff.value, selectLocation.value, selectBroadband.value, selectEab.value);
  }
});

selectEab.addEventListener('change', () => {
  if (dataIsLoaded) {
    track('eab_changed', { eab: selectEab.value });
    displayTable(selectTariff.value, selectLocation.value, selectBroadband.value, selectEab.value);
  }
});

// chartIcon.addEventListener('click', () => {
//   chartIcon.classList.toggle('activeIcon');
//   if (chartIcon.classList.contains('activeIcon')) {
//     listIcon.classList.remove('activeIcon');

//     listContainer.style.display = 'none';
//     chartContainer.classList.add('active-container');
//   } else {
//     listIcon.classList.add('activeIcon');

//     listContainer.style.display = 'flex';
//     chartContainer.classList.remove('active-container');
//   }
// });

// OPEN AND CLOSE DRAWER
const toggleDrawerButton = document.querySelector('#toggle-drawer');
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
  track('savings_modal_opened');
  // Get the current date
  const currentDate = new Date();

  // Get the date for Christmas of the current year
  const christmasDate = new Date(currentDate.getFullYear(), 11, 25);

  // Calculate the time difference in milliseconds
  const timeDifference = christmasDate - currentDate;

  // Convert milliseconds to weeks
  const weeksUntilChristmas = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));

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

// ======================== CHART VIEW TOGGLE ================================

const chartViewDaily = document.querySelector('#chart-view-daily');
const chartViewProfile = document.querySelector('#chart-view-profile');

const allChartViewBtns = () => [
  document.querySelector('#chart-view-daily'),
  document.querySelector('#chart-view-profile'),
  document.querySelector('#chart-view-dow'),
];

function setActiveChartBtn(activeBtn) {
  allChartViewBtns().forEach((btn) => {
    const isActive = btn === activeBtn;
    btn.classList.toggle('bg-mainPink', isActive);
    btn.classList.toggle('text-white', isActive);
    btn.classList.toggle('dark:bg-blue-500', isActive);
    btn.classList.toggle('bg-gray-100', !isActive);
    btn.classList.toggle('text-gray-500', !isActive);
    btn.classList.toggle('dark:bg-slate-600', !isActive);
    btn.classList.toggle('dark:text-slate-300', !isActive);
  });
}

chartViewDaily.addEventListener('click', () => {
  track('chart_view_changed', { chart_view: 'daily' });
  document.querySelector('#main-chart').classList.remove('hidden');
  document.querySelector('#main-chart').style.display = 'block';
  document.querySelector('#profile-chart').classList.add('hidden');
  document.querySelector('#profile-chart').style.display = 'none';
  document.querySelector('#dow-chart').classList.add('hidden');
  document.querySelector('#dow-chart').style.display = 'none';
  if (timeChart) {
    timeChart.destroy();
    document.querySelector('#time-chart').classList.add('hidden');
  }
  setActiveChartBtn(chartViewDaily);
});

chartViewProfile.addEventListener('click', () => {
  track('chart_view_changed', { chart_view: 'typical_day' });
  document.querySelector('#profile-chart').classList.remove('hidden');
  document.querySelector('#profile-chart').style.display = 'block';
  document.querySelector('#main-chart').classList.add('hidden');
  document.querySelector('#main-chart').style.display = 'none';
  document.querySelector('#dow-chart').classList.add('hidden');
  document.querySelector('#dow-chart').style.display = 'none';
  if (timeChart) {
    timeChart.destroy();
    document.querySelector('#time-chart').classList.add('hidden');
  }
  if (window.profileChart) window.profileChart.resize();
  setActiveChartBtn(chartViewProfile);
});

const chartViewDow = document.querySelector('#chart-view-dow');
chartViewDow.addEventListener('click', () => {
  track('chart_view_changed', { chart_view: 'typical_week' });

  const dowCanvas = document.querySelector('#dow-chart');
  const profileCanvas = document.querySelector('#profile-chart');
  const mainCanvas = document.querySelector('#main-chart');

  dowCanvas.classList.remove('hidden');
  dowCanvas.style.display = 'block';
  mainCanvas.classList.add('hidden');
  mainCanvas.style.display = 'none';
  profileCanvas.classList.add('hidden');
  profileCanvas.style.display = 'none';

  if (timeChart) {
    timeChart.destroy();
    document.querySelector('#time-chart').classList.add('hidden');
  }
  if (window.dowChart) window.dowChart.resize();
  setActiveChartBtn(chartViewDow);
});

// ======================== CHART COLORS ================================

// 1. Define your Theme Colors
const themes = {
  dark: {
    nightBar: '#48CAE4', // Bright Cyan
    text: '#ffffff', // Pure White
    grid: '#ffffff20', // Faint white grid (optional)
  },
  light: {
    nightBar: '#023047', // Deep Blue
    text: '#333333', // Dark Gray
    grid: '#00000020', // Faint black grid (optional)
  },
};

// 2. The Master Update Function
function updateChartsTheme(isDark) {
  const theme = isDark ? themes.dark : themes.light;

  // --- Update Main Chart (mainChart) ---
  if (window.mainChart && typeof window.mainChart.update === 'function') {
    const chart = window.mainChart;

    // 1. Update Bar Colors
    chart.data.datasets[0].backgroundColor = theme.nightBar;

    // 2. Update Text Colors (Scales)
    chart.options.scales.x.ticks.color = theme.text;
    chart.options.scales.y.ticks.color = theme.text;

    // 3. Update Title Color
    if (chart.options.plugins.title) {
      chart.options.plugins.title.color = theme.text;
    }

    // 4. Update Legend Color (if visible)
    if (chart.options.plugins.legend) {
      chart.options.plugins.legend.labels.color = theme.text;
    }

    chart.update();
  }

  // --- Update Time Chart (timeChart) ---
  if (window.timeChart && typeof window.timeChart.update === 'function') {
    const chart = window.timeChart;
    chart.options.scales.x.ticks.color = theme.text;
    chart.options.scales.y.ticks.color = theme.text;
    if (chart.options.plugins.title) chart.options.plugins.title.color = theme.text;
    chart.update();
  }

  // --- Update Profile Chart (profileChart) ---
  if (window.profileChart && typeof window.profileChart.update === 'function') {
    const chart = window.profileChart;
    chart.options.scales.x.ticks.color = theme.text;
    chart.options.scales.y.ticks.color = theme.text;
    if (chart.options.plugins.title) chart.options.plugins.title.color = theme.text;
    if (chart.options.plugins.legend) chart.options.plugins.legend.labels.color = theme.text;
    chart.update();
  }

  // --- Update Day-of-Week Chart (dowChart) ---
  if (window.dowChart && typeof window.dowChart.update === 'function') {
    const chart = window.dowChart;
    const weekdayColor = isDark ? '#48CAE4' : '#E71E70';
    const weekendColor = '#FB8500';
    chart.data.datasets[0].backgroundColor = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((_, i) => i < 5 ? weekdayColor : weekendColor);
    chart.options.scales.x.ticks.color = theme.text;
    chart.options.scales.y.ticks.color = theme.text;
    if (chart.options.plugins.title) chart.options.plugins.title.color = theme.text;
    if (chart.options.plugins.legend) chart.options.plugins.legend.labels.color = theme.text;
    chart.update();
  }
}

// 3. The Observer (Watches for Dark Mode Toggle)
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'class') {
      const isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
      track('dark_mode_toggled', { mode: isDark ? 'dark' : 'light' });
      updateChartsTheme(isDark);
    }
  });
});

// Start watching
observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
