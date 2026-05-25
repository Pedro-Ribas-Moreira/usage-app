import { dayArray, dayRuralArray, nightArray, nightRuralArray, peakArray, peakRuralArray } from '../core/createLists.js';
import { eabComparison } from '../summaries/eabComparison.js';
import { averagesSummary } from '../summaries/averages.js';
import { bbTariff } from '../summaries/bbTariff.js';
import { turnUsage } from '../summaries/turnUsage.js';
import { euro } from '../utils/format.js';

const summaryBox = (tariff, array, location, broadband, eab) => {
  const nDays = array.length - 1;
  document.querySelector('#total-days').innerHTML = nDays;
  document.querySelector('#date-range').innerHTML = `${array[1][0]} &ndash; ${array[nDays][0]}`;
  const totalSpendEl = document.querySelector('#total-days-sum');
  const totalSC = document.querySelector('#total-sc');
  const totalSCPlusUsage = document.querySelector('#total-usageAndSC');

  let totalSpend = 0;
  let totalStandingCharge = 0;
  let highestSum = 0;
  let highestDay;

  for (let i = 1; i < array.length; i++) {
    const totalCost = Number(array[i][array[i].length - 1].replace(/[^\d.-]/g, ''));
    const usageCost = Number(array[i][array[i].length - 2].replace(/[^\d.-]/g, ''));
    if (totalCost >= highestSum) {
      highestSum = totalCost;
      highestDay = array[i][0];
    }
    totalSpend += totalCost;
    totalStandingCharge += totalCost - usageCost;
  }

  totalSpendEl.innerHTML = euro.format(totalSpend);
  totalSC.innerHTML = euro.format(totalStandingCharge);
  totalSCPlusUsage.innerHTML = euro.format(totalSpend - totalStandingCharge);
  document.querySelector('#highest-day-spent').innerHTML = highestDay;
  document.querySelector('#highest-day-sum').innerHTML = euro.format(highestSum);

  const ruralArrays = { peak: peakRuralArray, night: nightRuralArray, day: dayRuralArray };
  const urbanArrays = { peak: peakArray, night: nightArray, day: dayArray };
  const arrays = location === 'rural' ? ruralArrays : urbanArrays;

  let peakTotal = 0;
  let nightTotal = 0;
  let dayTotal = 0;
  for (let i = 1; i < array.length; i++) {
    peakTotal += Number(arrays.peak[i][arrays.peak[i].length - 1].replace(/[^\d.-]/g, ''));
    nightTotal += Number(arrays.night[i][arrays.night[i].length - 1].replace(/[^\d.-]/g, ''));
    dayTotal += Number(arrays.day[i][arrays.day[i].length - 1].replace(/[^\d.-]/g, ''));
  }
  document.querySelector('#total-spent-24').innerHTML = euro.format(dayTotal);
  document.querySelector('#total-spent-dn').innerHTML = euro.format(nightTotal);
  document.querySelector('#total-spent-tou').innerHTML = euro.format(peakTotal);

  const tcGrid = document.querySelector('#tc-grid');
  const touColumns = document.querySelectorAll('.tou-column');
  if (tariff === 'tou') {
    tcGrid.classList.replace('grid-cols-2', 'grid-cols-3');
    touColumns.forEach((el) => el.classList.remove('hidden'));
  } else {
    tcGrid.classList.replace('grid-cols-3', 'grid-cols-2');
    touColumns.forEach((el) => el.classList.add('hidden'));
  }

  const comparableTotals = tariff === 'tou'
    ? { '24h': dayTotal, nightsaver: nightTotal, tou: peakTotal }
    : { '24h': dayTotal, nightsaver: nightTotal };
  const tariffLabels = { '24h': '24H', nightsaver: 'Day/Night', tou: 'Time of Use' };
  const bestTariff = Object.keys(comparableTotals).reduce((a, b) => comparableTotals[a] < comparableTotals[b] ? a : b);
  const savings = comparableTotals[tariff] - comparableTotals[bestTariff];
  const recommendationEl = document.querySelector('#tariff-recommendation');
  if (bestTariff === tariff) {
    recommendationEl.innerHTML = `<i class="fa-solid fa-circle-check mr-1 text-green-500"></i> Customer is on the best tariff`;
  } else {
    recommendationEl.innerHTML = `<i class="fa-solid fa-lightbulb mr-1 text-mainPink dark:text-blue-400"></i> Switch to <strong>${tariffLabels[bestTariff]}</strong> &mdash; save <strong>${euro.format(savings)}</strong>`;
  }

  bbTariff(array, broadband, totalSpend);
  eabComparison(tariff, array, location, eab);
  averagesSummary(array);
  turnUsage(nightArray);
};

export { summaryBox };
