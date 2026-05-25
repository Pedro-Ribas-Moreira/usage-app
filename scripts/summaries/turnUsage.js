const turnUsage = (nightArray) => {
  const dayUsageElement = document.querySelector('#dayUsage');
  const nightUsageElement = document.querySelector('#nightUsage');

  let nightUnits = 0;
  let dayUnits = 0;

  for (let i = 1; i < nightArray.length; i++) {
    nightUnits += Number(nightArray[i][1]);
    dayUnits += Number(nightArray[i][3]);
  }

  const totalUnits = dayUnits + nightUnits;
  const nightPercentage = (nightUnits / totalUnits) * 100;
  const dayPercentage = (dayUnits / totalUnits) * 100;

  dayUsageElement.innerHTML = `${dayPercentage.toFixed(2)}%`;
  nightUsageElement.innerHTML = `${nightPercentage.toFixed(2)}%`;
};

export { turnUsage };
