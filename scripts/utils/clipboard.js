const copyFeedback = document.querySelector('#copy-elec-feedback');
const copyBBFeedback = document.querySelector('#copy-bb-feedback');
const copyAverageFeedback = document.querySelector('#copy-average-feedback');
const copyHSFeedback = document.querySelector('#copy-hs-feedback');
const copyTCFeedback = document.querySelector('#copy-tc-feedback');
const copyUDFeedback = document.querySelector('#copy-ud-feedback');

// Electricity
document.querySelector('#copy-electotal').addEventListener('click', () => {
  const usage = document.querySelector('#total-usageAndSC');
  const standingCharge = document.querySelector('#total-sc');
  const totalSCPlusUsage = document.querySelector('#total-days-sum');

  navigator.clipboard
    .writeText(
      `Electricity\nUsage: ${usage.textContent}\nStanding Charge: ${standingCharge.textContent}\nTotal: ${totalSCPlusUsage.textContent}`,
    )
    .then(() => {
      copyFeedback.classList.remove('hidden');
      setTimeout(() => { copyFeedback.classList.add('hidden'); }, 500);
    })
    .catch((err) => { console.error(err); });
});

// Broadband
document.querySelector('#copy-bb-total').addEventListener('click', () => {
  const bbDaily = document.querySelector('#broadband-spend-day');
  const bbTotal = document.querySelector('#broadband-spend-total');

  navigator.clipboard
    .writeText(`Broadband\nDaily Charge: ${bbDaily.textContent}\nTotal: ${bbTotal.textContent}`)
    .then(() => {
      copyBBFeedback.classList.remove('hidden');
      setTimeout(() => { copyBBFeedback.classList.add('hidden'); }, 500);
    })
    .catch((err) => { console.error(err); });
});

// Averages
document.querySelector('#copy-averages-total').addEventListener('click', () => {
  const customerDay = document.querySelector('#day-average');
  const customerWeek = document.querySelector('#week-average');
  const customerMonth = document.querySelector('#month-average');
  const EABDay = document.querySelector('#average-eab-daily');
  const EABWeek = document.querySelector('#average-eab-weekly');
  const EABMonth = document.querySelector('#average-eab-monthly');

  navigator.clipboard
    .writeText(
      `Averages\nCustomer - Day: ${customerDay.textContent} Week: ${customerWeek.textContent} Month: ${customerMonth.textContent}\nNational - Day: ${EABDay.textContent} Week:${EABWeek.textContent} Month:${EABMonth.textContent}`,
    )
    .then(() => {
      copyAverageFeedback.classList.remove('hidden');
      setTimeout(() => { copyAverageFeedback.classList.add('hidden'); }, 500);
    })
    .catch((err) => { console.error(err); });
});

// Highest Spend
document.querySelector('#copy-hs-total').addEventListener('click', () => {
  const usageDate = document.querySelector('#highest-day-spent');
  const usageValue = document.querySelector('#highest-day-sum');

  navigator.clipboard
    .writeText(`Highest Spend\nDate: ${usageDate.textContent}\nTotal:${usageValue.textContent}`)
    .then(() => {
      copyHSFeedback.classList.remove('hidden');
      setTimeout(() => { copyHSFeedback.classList.add('hidden'); }, 500);
    })
    .catch((err) => { console.error(err); });
});

// Tariff Comparison
document.querySelector('#copy-tc-total').addEventListener('click', () => {
  const allDayTariff = document.querySelector('#total-spent-24');
  const nightSaverTariff = document.querySelector('#total-spent-dn');
  const touTariff = document.querySelector('#total-spent-tou');

  navigator.clipboard
    .writeText(
      `Tariff Comparison\n24H: ${allDayTariff.textContent}\nD/N: ${nightSaverTariff.textContent}\nTOU: ${touTariff.textContent}`,
    )
    .then(() => {
      copyTCFeedback.classList.remove('hidden');
      setTimeout(() => { copyTCFeedback.classList.add('hidden'); }, 500);
    })
    .catch((err) => { console.error(err); });
});

// Usage Distribution
document.querySelector('#copy-ud-total').addEventListener('click', () => {
  const dayUsageElement = document.querySelector('#dayUsage');
  const nightUsageElement = document.querySelector('#nightUsage');

  navigator.clipboard
    .writeText(`Usage Distribution\nNight: ${nightUsageElement.textContent}\nDay: ${dayUsageElement.textContent}`)
    .then(() => {
      copyUDFeedback.classList.remove('hidden');
      setTimeout(() => { copyUDFeedback.classList.add('hidden'); }, 500);
    })
    .catch((err) => { console.error(err); });
});
