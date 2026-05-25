import { broadbandPrices } from '../core/prices.js';
import { euro } from '../utils/format.js';

const BB_PRICE_KEYS = {
  'FTTC': 'FTTC',
  'FTTH-150': 'FTTH150',
  'FTTH-500': 'FTTH500',
  'FTTH-1000': 'FTTH1000',
};

const bbTariff = (arr, broadband, sum) => {
  const bbTotalDisplay = document.querySelectorAll('.broadband-display');
  const bbSumTotal = document.querySelector('#total-sum-broadband');
  const bbSpendDay = document.querySelector('#broadband-spend-day');
  const bbSpendTotal = document.querySelector('#broadband-spend-total');

  bbTotalDisplay.forEach((el) => el.classList.toggle('hidden', broadband === 'no'));

  const priceKey = BB_PRICE_KEYS[broadband];
  if (!priceKey) return;

  const dailyCharge = broadbandPrices.prices[priceKey];
  const totalCharged = dailyCharge * (arr.length - 1);

  bbSpendDay.innerHTML = euro.format(dailyCharge);
  bbSpendTotal.innerHTML = euro.format(totalCharged);
  bbSumTotal.innerHTML = euro.format(totalCharged + sum);
};

export { bbTariff };
