import { datesMap } from './main.js';
import { timeChart, getTimeChartInfo } from './mainChart.js';

// import { dailyArray } from "./main.js";
timeChart;
const listContainer = document.querySelector('#list-container');
let euro = Intl.NumberFormat('en-DE', {
  style: 'currency',
  currency: 'EUR',
});

const createTable = (array, dailyArray, datesMap, tariff) => {
  if (document.querySelector('#csv-table') !== null) {
    document.querySelector('#csv-table').remove();
  }

  // Create a table element
  let table = document.createElement('table');
  table.setAttribute('id', 'csv-table');
  table.classList.add('display', 'table-auto', 'h-full', 'w-full'); // Use 'display' for DataTables styling

  // Create a table header row
  let tableHeader = document.createElement('thead');
  let headerRow = document.createElement('tr');
  for (let i = 0; i < array[0].length; i++) {
    let headerCell = document.createElement('th');
    headerCell.innerText = array[0][i];
    headerCell.classList.add(
      'header-cell',
      'table-sortable',
      'text-white',
      'bg-mainPink',
      'dark:bg-blue-500',
      // 'font-light',
      'p-4',
      'border',
      'border-b-1',
      'border-t-0',
      'border-l-1',
      'first:border-l-0',
      'border-zinc-100',
      'sticky',
      'top-0',
    );
    headerRow.appendChild(headerCell);
  }
  tableHeader.appendChild(headerRow);

  // Create a table body
  let tableBody = document.createElement('tbody');
  tableBody.classList.add('dark:text-white');

  // Insert data rows
  for (let i = array.length - 1; i > 0; i--) {
    let dataRow = document.createElement('tr');
    for (let j = 0; j < array[i].length; j++) {
      let dataCell = document.createElement('td');
      dataCell.classList.add('p-1', 'pl-2', 'text-center');
      dataCell.innerHTML = array[i][j];
      dataRow.appendChild(dataCell);
    }
    tableBody.appendChild(dataRow);

    // Hidden detailed rows (if required by your design)
    let arrayRow = document.createElement('tr');
    arrayRow.classList.add(`${i}`, 'hidden', 'time-row');
    let arrayCell = document.createElement('td');
    arrayCell.setAttribute('colspan', '100%');
    arrayCell.classList.add('text-center');

    // Create a subtable for additional details
    const subTable = document.createElement('table');
    subTable.classList.add('subTable', 'w-4/5', 'border', 'boder-1', 'm-auto');

    const subTableHeader = document.createElement('thead');
    const subHeaderRow = document.createElement('tr');
    subHeaderRow.classList.add('bg-mainPink', 'text-white', 'dark:bg-blue-500', 'transition-all', 'font-display');

    const subTableBody = document.createElement('tbody');

    subTableHeader.appendChild(subHeaderRow);
    subTable.appendChild(subTableHeader);
    subTable.appendChild(subTableBody);

    arrayCell.appendChild(subTable);
    arrayRow.appendChild(arrayCell);
    tableBody.appendChild(arrayRow);

    // Add headers to the subtable
    ['Time', 'Unit', 'Total'].forEach((label) => {
      const th = document.createElement('th');
      th.innerHTML = label;
      subHeaderRow.appendChild(th);
    });

    // Populate the subtable based on tariff type
    const dailyData = dailyArray.find((d) => d.day === array[i][0]);
    if (dailyData) {
      let dataSet;
      if (tariff === '24h') {
        dataSet = datesMap.get(dailyData.day).units;
      } else if (tariff === 'nightsaver') {
        dataSet = datesMap.get(dailyData.day).nightSaver;
      } else if (tariff === 'tou') {
        dataSet = datesMap.get(dailyData.day).timeOfUsage;
      }

      dataSet.forEach((e) => {
        const subBodyRow = subTableBody.insertRow();
        subBodyRow.classList.add('border', 'border-x-0', 'border-y-1', 'border-mainPink', 'dark:border-slate-500');
        subBodyRow.insertCell().innerHTML = e.time;
        subBodyRow.insertCell().innerHTML = e.usage;
        subBodyRow.insertCell().innerHTML = euro.format(e.total);
      });
    }

    // Additional row styling and classes
    dataRow.classList.add(`${i}`, 'day-row', 'hover:bg-hoverPink', 'hover:dark:bg-blue-500', 'hover:text-white');
  }

  // Append table parts to the main table element
  table.appendChild(tableHeader);
  table.appendChild(tableBody);

  // Append the table to the document
  listContainer.appendChild(table);
  listContainer.classList.remove('hidden');
};

//

window.addEventListener('click', (e) => {
  let row = e.target.parentElement;
  if (row.classList.contains('day-row')) {
    const tc = document.querySelector('#timeChart');
    if (row.classList.contains('active-row')) {
      console.log('here');
      row.classList.remove('active-row');
      row.nextSibling.classList.add('hidden');
      timeChart.destroy();
      document.querySelector('#myChart').classList.remove('hidden');
      document.querySelector('#myChart').style.display = 'block';

      // document.querySelector("#myChart").style.

      tc.classList.add('hidden');
    } else {
      document.querySelectorAll('.day-row').forEach((e) => e.classList.remove('active-row'));
      document.querySelectorAll('.time-row').forEach((e) => e.classList.add('hidden'));

      document.querySelectorAll('.carousel-item').forEach((e) => e.classList.add('hidden'));
      row.classList.toggle('active-row');
      row.nextSibling.classList.toggle('hidden');

      document.querySelector('#timeChart').classList.remove('hidden');
      document.querySelector('#myChart').style.display = 'none';

      let d = row.firstChild.innerHTML;
      if (timeChart) {
        timeChart.destroy();
        // timeChart.style.display = "hidden";
      }
      // console.log(row.firstChild.innerHTML);

      let time = datesMap.get(d).units.map((e) => e.time.slice(0, 5));
      let units = datesMap.get(d).units.map((e) => e.usage);

      getTimeChartInfo(time, units, d);
    }
  }
});

export { createTable };
