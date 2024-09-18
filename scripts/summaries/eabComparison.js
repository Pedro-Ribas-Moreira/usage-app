import { prices } from '../prices.js';
let euro = Intl.NumberFormat('en-DE', {
  style: 'currency',
  currency: 'EUR',
});

const eabComparison = (tariff, arr, location, eab) => {
  const esbAverageDaily = document.querySelector('#average-eab-daily');
  const esbAverageWeekly = document.querySelector('#average-eab-weekly');
  const esbAverageMonthly = document.querySelector('#average-eab-monthly');
  // const esbAverage = document.querySelector('#average-usage-esb');

  // <p>Daily: <span id="average-eab-daily">€54,31</span></p>
  // <p>Weekly: <span id="average-eab-weekly">€43,31</span></p>
  // <p>Monthly: <span id="average-eab-monthly">€43,31</span></p>

  const days = arr.length - 1;

  let eabValue;
  switch (eab) {
    case 'eab-one':
      eabValue = 2100;
      break;
    case 'eab-two':
      eabValue = 3000;
      break;
    case 'eab-three':
      eabValue = 4200;
      break;
    case 'eab-four':
      eabValue = 6000;
      break;
    case 'eab-five':
      eabValue = 8000;
      break;
    default:
      return;
  }

  let estimateUnitsDay = eabValue / 365;
  let estimateTotal = 0;
  if (tariff == '24h') {
    estimateTotal = estimateUnitsDay * prices[2].prices.allDayPrice;
    if (location == 'urban') {
      estimateTotal = estimateTotal + prices[2].prices.urbanDaySC;
    } else if (location == 'rural') {
      estimateTotal = estimateTotal + prices[2].prices.ruralDaySC;
    } else {
    }
  }
  if (tariff == 'nightsaver') {
    let dayUnits = (estimateUnitsDay / 2) * prices[2].prices.dayPrice;
    let nightUnits = (estimateUnitsDay / 2) * prices[2].prices.nightPrice;
    let totalUnits = dayUnits + nightUnits;
    if (location == 'urban') {
      estimateTotal = totalUnits + prices[2].prices.urbanNightsaverSC;
    } else if (location == 'rural') {
      estimateTotal = totalUnits + prices[2].prices.ruralNightsaverSC;
    } else {
    }
  }
  if (tariff == 'tou') {
    let dayUnits = (estimateUnitsDay / 3) * prices[2].prices.touDayPrice;
    let peakUnits = (estimateUnitsDay / 3) * prices[2].prices.touPeakPrice;
    let nightUnits = (estimateUnitsDay / 3) * prices[2].prices.touNightPrice;
    let totalUnits = dayUnits + nightUnits + peakUnits;
    if (location == 'urban') {
      estimateTotal = totalUnits + prices[2].prices.touUrbanSC;
    } else if (location == 'rural') {
      estimateTotal = totalUnits + prices[2].prices.touRuralSC;
    } else {
    }
  }

  esbAverageDaily.innerHTML = euro.format(estimateTotal);
  esbAverageWeekly.innerHTML = euro.format(estimateTotal * 7);
  esbAverageMonthly.innerHTML = euro.format(estimateTotal * 30);
  estimateTotal = estimateTotal * days;
  // esbAverage.innerHTML = `${days} days: ${euro.format(estimateTotal)}`;

  // let total = 0;
  // for (let i = 0; i < arr.length; i++) {
  //   let a = Number(arr[i][arr[i].length - 1].replace(/[^\d.-]/g, ""));
  //   total += a;
  // }
  // customerUsage.innerHTML = euro.format(total);
};

export { eabComparison };
