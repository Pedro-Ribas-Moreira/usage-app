import { prices } from '../core/prices.js';
import { euro } from '../utils/format.js';

const eabComparison = (tariff, arr, location, eab) => {
  const esbAverageDaily = document.querySelector('#average-eab-daily');
  const esbAverageWeekly = document.querySelector('#average-eab-weekly');
  const esbAverageMonthly = document.querySelector('#average-eab-monthly');

  let pricesLength = prices.length - 1;
  let recentTariff = prices[prices.length];

  while (recentTariff === undefined || recentTariff === '') {
    pricesLength--;
    recentTariff = prices[pricesLength];
  }
  let lastPrice = recentTariff.prices;

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
      alert('something went wrong while calculating the national averages');
      return;
  }
  let estimateUnitsDay = eabValue / 365;

  let estimateTotal = 0;
  if (tariff == '24h') {
    estimateTotal = estimateUnitsDay * lastPrice.allDayPrice;
    if (location == 'urban') {
      estimateTotal = estimateTotal + lastPrice.urbanDaySC;
    } else if (location == 'rural') {
      estimateTotal = estimateTotal + lastPrice.ruralDaySC;
    } else {
    }
  }

  if (tariff == 'nightsaver') {
    let dayUnits = (estimateUnitsDay / 2) * lastPrice.dayPrice;
    let nightUnits = (estimateUnitsDay / 2) * lastPrice.nightPrice;
    let totalUnits = dayUnits + nightUnits;
    if (location == 'urban') {
      estimateTotal = totalUnits + lastPrice.urbanNightsaverSC;
    } else if (location == 'rural') {
      estimateTotal = totalUnits + lastPrice.ruralNightsaverSC;
    } else {
    }
  }
  if (tariff == 'tou') {
    let dayUnits = (estimateUnitsDay / 3) * lastPrice.touDayPrice;
    let peakUnits = (estimateUnitsDay / 3) * lastPrice.touPeakPrice;
    let nightUnits = (estimateUnitsDay / 3) * lastPrice.touNightPrice;
    let totalUnits = dayUnits + nightUnits + peakUnits;
    if (location == 'urban') {
      estimateTotal = totalUnits + lastPrice.touUrbanSC;
    } else if (location == 'rural') {
      estimateTotal = totalUnits + lastPrice.touRuralSC;
    } else {
    }
  }

  esbAverageDaily.innerHTML = euro.format(estimateTotal);
  esbAverageWeekly.innerHTML = euro.format(estimateTotal * 7);
  esbAverageMonthly.innerHTML = euro.format(estimateTotal * 30);
};

export { eabComparison };
