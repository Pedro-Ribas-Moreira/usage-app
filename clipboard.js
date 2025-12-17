let copyFeedback = document.querySelector('#copy-elec-feedback');
let copyBBFeedback = document.querySelector('#copy-bb-feedback');
let copyAverageFeedback = document.querySelector('#copy-average-feedback');
let copyHSFeedback = document.querySelector('#copy-hs-feedback');
let copyTCFeedback = document.querySelector('#copy-tc-feedback');
let copyUDFeedback = document.querySelector('#copy-ud-feedback');

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

      setTimeout(() => {
        copyFeedback.classList.add('hidden');
      }, 500);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Broaband
document.querySelector('#copy-bb-total'l).addEventListener('click', () => {
  let bbDaily = document.querySelector('#broadband-spend-day');
  let bbTotal = document.querySelector('#broadband-spend-total');

  navigator.clipboard
    .writeText(`Broadband\nDaily Charge: ${bbDaily.textContent}\nTotal: ${bbTotal.textContent}`)
    .then(() => {
      copyBBFeedback.classList.remove('hidden');
      setTimeout(() => {
        copyBBFeedback.classList.add('hidden');
      }, 500);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Averages

document.querySelector('#copy-averages-total').addEventListener('click', () => {
  let customerDay = document.querySelector('#day-average');
  let customerWeek = document.querySelector('#week-average');
  let customerMonth = document.querySelector('#month-average');
  let EABDay = document.querySelector('#average-eab-daily');
  let EABWeek = document.querySelector('#average-eab-weekly');
  let EABMonth = document.querySelector('#average-eab-monthly');

  navigator.clipboard
    .writeText(
      `Averages\nCustomer - Day: ${customerDay.textContent} Week: ${customerMonth.textContent} Month: ${customerMonth.textContent}\nNational - Day: ${EABDay.textContent} Week:${EABWeek.textContent} Month:${EABMonth.textContent}`,
    )
    .then(() => {
      copyAverageFeedback.classList.remove('hidden');

      setTimeout(() => {
        copyAverageFeedback.classList.add('hidden');
      }, 500);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Highest Spend

document.querySelector('#copy-hs-total').addEventListener('click', () => {
  let usageDate = document.querySelector('#highest-day-spent');
  let usageValue = document.querySelector('#highest-day-sum');

  navigator.clipboard
    .writeText(`Highest Spend\nDate: ${usageDate.textContent}\nTotal:${usageValue.textContent}`)
    .then(() => {
      copyHSFeedback.classList.remove('hidden');

      setTimeout(() => {
        copyHSFeedback.classList.add('hidden');
      }, 500);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Tariff Comparison

document.querySelector('#copy-tc-total').addEventListener('click', () => {
  let allDayTariff = document.querySelector('#total-spent-24');
  let nighSaverTariff = document.querySelector('#total-spent-dn');
  let touTarifff = document.querySelector('#total-spent-tou');

  navigator.clipboard
    .writeText(
      `Tariff Comparison\n24H: ${allDayTariff.textContent}\nD/N: ${nighSaverTariff.textContent}\nTOU: ${touTarifff.textContent}`,
    )
    .then(() => {
      copyTCFeedback.classList.remove('hidden');

      setTimeout(() => {
        copyTCFeedback.classList.add('hidden');
      }, 500);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Usage distribuition

document.querySelector('#copy-ud-total').addEventListener('click', () => {
  let dayUsageElement = document.querySelector('#dayUsage');
  let nigthUsageElement = document.querySelector('#nightUsage');

  navigator.clipboard
    .writeText(`Usage Distribuition\nNight: ${nigthUsageElement.textContent}\nDay: ${dayUsageElement.textContent}`)
    .then(() => {
      copyUDFeedback.classList.remove('hidden');

      setTimeout(() => {
        copyUDFeedback.classList.add('hidden');
      }, 500);
    })
    .catch((err) => {
      console.log(err);
    });
});
