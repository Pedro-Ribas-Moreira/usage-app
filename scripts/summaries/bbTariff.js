import { BBprices } from '../prices.js';
let euro = Intl.NumberFormat('en-DE', {
  style: 'currency',
  currency: 'EUR',
});

const bbTariff = (arr, broaband, sum) => {
  const bbBox = document.querySelector('#bb-box');
  const bbTotalDisplay = document.querySelectorAll('.broadband-display');
  const bbSumTotal = document.querySelector('#total-sum-broadband');
  const bbSpendDay = document.querySelector('#broadband-spend-day');
  const bbSpendTotal = document.querySelector('#broadband-spend-total');

  if (broaband == 'no') {
    bbTotalDisplay.forEach((e) => {
      e.classList.add('hidden');
    });
  } else {
    bbTotalDisplay.forEach((e) => {
      e.classList.remove('hidden');
    });
  }

  let dailyCharge;
  let totalCharged;
  let total;
  switch (broaband) {
    case 'FTTC':
      dailyCharge = BBprices.prices.FTTC;
      bbSpendDay.innerHTML = euro.format(dailyCharge);
      totalCharged = dailyCharge * (arr.length - 1);
      bbSpendTotal.innerHTML = euro.format(totalCharged);
      total = totalCharged + sum;
      bbSumTotal.innerHTML = `${euro.format(total)}`;

      break;
    case 'FTTH-150':
      dailyCharge = BBprices.prices.FTTH150;
      bbSpendDay.innerHTML = euro.format(dailyCharge);
      totalCharged = dailyCharge * (arr.length - 1);
      bbSpendTotal.innerHTML = euro.format(totalCharged);
      total = totalCharged + sum;
      bbSumTotal.innerHTML = `${euro.format(total)}`;
      // code block
      break;
    case 'FTTH-500':
      dailyCharge = BBprices.prices.FTTH500;
      bbSpendDay.innerHTML = euro.format(dailyCharge);
      totalCharged = dailyCharge * (arr.length - 1);
      bbSpendTotal.innerHTML = euro.format(totalCharged);
      total = totalCharged + sum;
      bbSumTotal.innerHTML = `${euro.format(total)}`;
      break;
    case 'FTTH-1000':
      dailyCharge = BBprices.prices.FTTH1000;
      bbSpendDay.innerHTML = euro.format(dailyCharge);
      totalCharged = dailyCharge * (arr.length - 1);
      bbSpendTotal.innerHTML = euro.format(totalCharged);
      total = totalCharged + sum;
      bbSumTotal.innerHTML = `${euro.format(total)}`;
      break;
    default:
      return;
  }

  //   console.log({
  //     dailyCharge,
  //     totalCharged,
  //     total,
  //   });
};

export { bbTariff };
