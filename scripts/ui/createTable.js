import { datesMap } from '../core/main.js';
import { timeChart, getTimeChartInfo } from './mainChart.js';
import { euro } from '../utils/format.js';

const listContainer = document.querySelector('#list-container');

const createTable = (array, dailyArray, datesMap, tariff) => {
  if (document.querySelector('#csv-table') !== null) {
    document.querySelector('#csv-table').remove();
  }

  const table = document.createElement('table');
  table.setAttribute('id', 'csv-table');
  table.classList.add('display', 'table-auto', 'h-full', 'w-full');

  const tableHeader = document.createElement('thead');
  const headerRow = document.createElement('tr');
  for (let i = 0; i < array[0].length; i++) {
    const headerCell = document.createElement('th');
    headerCell.innerText = array[0][i];
    headerCell.classList.add(
      'header-cell', 'table-sortable', 'text-white', 'bg-mainPink', 'dark:bg-blue-500',
      'p-4', 'border', 'border-b-1', 'border-t-0', 'border-l-1',
      'first:border-l-0', 'border-zinc-100', 'sticky', 'top-0',
    );
    headerRow.appendChild(headerCell);
  }
  tableHeader.appendChild(headerRow);

  const tableBody = document.createElement('tbody');
  tableBody.classList.add('dark:text-white');

  const rowTotals = array.slice(1).map((row) => Number(row[row.length - 1].replace(/[^\d.-]/g, '')));
  const avgDailyTotal = rowTotals.reduce((sum, t) => sum + t, 0) / rowTotals.length;
  const anomalyThreshold = avgDailyTotal * 1.5;

  for (let i = array.length - 1; i > 0; i--) {
    const rowTotal = Number(array[i][array[i].length - 1].replace(/[^\d.-]/g, ''));
    const isAnomaly = rowTotal > anomalyThreshold;

    const dataRow = document.createElement('tr');
    dataRow.dataset.date = array[i][0];

    for (let j = 0; j < array[i].length; j++) {
      const dataCell = document.createElement('td');
      dataCell.classList.add('p-1', 'pl-2', 'text-center');
      if (j === 0 && isAnomaly) {
        dataCell.innerHTML = `${array[i][j]} <i class="fa-solid fa-triangle-exclamation text-yellow-400 text-xs" title="Spend is 50%+ above daily average"></i>`;
      } else {
        dataCell.innerHTML = array[i][j];
      }
      dataRow.appendChild(dataCell);
    }
    if (isAnomaly) {
      dataRow.classList.add('border-l-4', 'border-yellow-300', 'dark:border-yellow-400');
    }
    tableBody.appendChild(dataRow);

    const arrayRow = document.createElement('tr');
    arrayRow.classList.add(`${i}`, 'hidden', 'time-row');
    const arrayCell = document.createElement('td');
    arrayCell.setAttribute('colspan', '100%');
    arrayCell.classList.add('text-center');

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

    ['Time', 'Unit', 'Total'].forEach((label) => {
      const th = document.createElement('th');
      th.innerHTML = label;
      subHeaderRow.appendChild(th);
    });

    const dailyData = dailyArray.find((d) => d.day === array[i][0]);
    if (dailyData) {
      const dataSetMap = {
        '24h': datesMap.get(dailyData.day).units,
        nightsaver: datesMap.get(dailyData.day).nightSaver,
        tou: datesMap.get(dailyData.day).timeOfUsage,
      };
      const dataSet = dataSetMap[tariff];

      dataSet.forEach((e) => {
        const subBodyRow = subTableBody.insertRow();
        subBodyRow.classList.add('border', 'border-x-0', 'border-y-1', 'border-mainPink', 'dark:border-slate-500');
        subBodyRow.insertCell().innerHTML = e.time;
        subBodyRow.insertCell().innerHTML = e.usage;
        subBodyRow.insertCell().innerHTML = euro.format(e.total);
      });
    }

    dataRow.classList.add(`${i}`, 'day-row', 'hover:bg-hoverPink', 'hover:dark:bg-blue-500', 'hover:text-white');
  }

  table.appendChild(tableHeader);
  table.appendChild(tableBody);
  listContainer.appendChild(table);
  listContainer.classList.remove('hidden');
};

window.addEventListener('click', (e) => {
  const row = e.target.parentElement;
  if (row.classList.contains('day-row')) {
    const tc = document.querySelector('#time-chart');
    if (row.classList.contains('active-row')) {
      row.classList.remove('active-row');
      row.nextSibling.classList.add('hidden');
      timeChart.destroy();
      document.querySelector('#main-chart').classList.remove('hidden');
      document.querySelector('#main-chart').style.display = 'block';
      tc.classList.add('hidden');
    } else {
      document.querySelectorAll('.day-row').forEach((e) => e.classList.remove('active-row'));
      document.querySelectorAll('.time-row').forEach((e) => e.classList.add('hidden'));
      document.querySelectorAll('.carousel-item').forEach((e) => e.classList.add('hidden'));

      row.classList.toggle('active-row');
      row.nextSibling.classList.toggle('hidden');
      document.querySelector('#time-chart').classList.remove('hidden');
      document.querySelector('#main-chart').style.display = 'none';

      const d = row.dataset.date;
      if (timeChart) {
        timeChart.destroy();
      }

      const time = datesMap.get(d).units.map((e) => e.time.slice(0, 5));
      const units = datesMap.get(d).units.map((e) => e.usage);
      getTimeChartInfo(time, units, d);
    }
  }
});

export { createTable };
