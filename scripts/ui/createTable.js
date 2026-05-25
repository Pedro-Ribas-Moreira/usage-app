import { datesMap } from '../core/main.js';
import { timeChart, getTimeChartInfo } from './mainChart.js';
import { euro } from '../utils/format.js';

const listContainer = document.querySelector('#list-container');

const createTable = (array, dailyArray, datesMap, tariff) => {
  ['#table-header-wrapper', '#table-body-wrapper'].forEach((sel) => {
    const el = document.querySelector(sel);
    if (el) el.remove();
  });

  const numCols = array[0].length;
  const makeColgroup = () => {
    const cg = document.createElement('colgroup');
    for (let i = 0; i < numCols; i++) {
      const col = document.createElement('col');
      col.style.width = `${(100 / numCols).toFixed(4)}%`;
      cg.appendChild(col);
    }
    return cg;
  };

  // --- Non-scrolling header ---
  const headerWrapper = document.createElement('div');
  headerWrapper.setAttribute('id', 'table-header-wrapper');
  headerWrapper.classList.add('flex-shrink-0');

  const headerTable = document.createElement('table');
  headerTable.classList.add('table-fixed', 'w-full', 'text-sm');

  const tableHeader = document.createElement('thead');
  const headerRow = document.createElement('tr');
  for (let i = 0; i < array[0].length; i++) {
    const headerCell = document.createElement('th');
    headerCell.innerText = array[0][i];
    headerCell.classList.add(
      'px-4', 'py-3',
      'text-xs', 'font-semibold', 'uppercase', 'tracking-wide',
      'text-white',
      'bg-mainPink', 'dark:bg-blue-600',
      i === 0 ? 'text-left' : 'text-right',
    );
    headerRow.appendChild(headerCell);
  }
  tableHeader.appendChild(headerRow);
  headerTable.appendChild(makeColgroup());
  headerTable.appendChild(tableHeader);
  headerWrapper.appendChild(headerTable);

  // --- Scrollable body ---
  const bodyWrapper = document.createElement('div');
  bodyWrapper.setAttribute('id', 'table-body-wrapper');
  bodyWrapper.classList.add('overflow-y-auto', 'flex-1');

  const bodyTable = document.createElement('table');
  bodyTable.setAttribute('id', 'csv-table');
  bodyTable.classList.add('table-fixed', 'w-full', 'text-sm');

  const tableBody = document.createElement('tbody');

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
      dataCell.classList.add(
        'px-4', 'py-2.5',
        'text-gray-700', 'dark:text-white',
        j === 0 ? 'text-left' : 'text-right',
      );
      if (j === 0 && isAnomaly) {
        dataCell.innerHTML = `${array[i][j]} <i class="fa-solid fa-triangle-exclamation text-yellow-400 text-xs" title="Spend is 50%+ above daily average"></i>`;
      } else {
        dataCell.innerHTML = array[i][j];
      }
      dataRow.appendChild(dataCell);
    }
    dataRow.classList.add('border-b', 'border-gray-50', 'dark:border-slate-700');
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
    subTable.classList.add('subTable', 'w-4/5', 'm-auto', 'my-3', 'rounded-lg', 'overflow-hidden', 'border-2', 'border-mainPink', 'dark:border-blue-500', 'text-sm');

    const subTableHeader = document.createElement('thead');
    const subHeaderRow = document.createElement('tr');
    subHeaderRow.classList.add('bg-mainPink', 'dark:bg-blue-600', 'text-white', 'text-xs', 'uppercase', 'tracking-wide');

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
      th.classList.add('px-4', 'py-2', 'text-left');
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
        subBodyRow.classList.add('border-b', 'border-gray-50', 'dark:border-slate-600', 'text-gray-600', 'dark:text-slate-200');
        ['px-4 py-1.5', 'px-4 py-1.5', 'px-4 py-1.5'].forEach((cls, idx) => {
          const cell = subBodyRow.insertCell();
          cell.classList.add(...cls.split(' '));
          cell.innerHTML = [e.time, e.usage, euro.format(e.total)][idx];
        });
      });
    }

    dataRow.classList.add(`${i}`, 'day-row', 'hover:bg-rose-50', 'dark:hover:bg-slate-600', 'cursor-pointer', 'transition-colors');
  }

  bodyTable.appendChild(makeColgroup());
  bodyTable.appendChild(tableBody);
  bodyWrapper.appendChild(bodyTable);

  listContainer.appendChild(headerWrapper);
  listContainer.appendChild(bodyWrapper);
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
