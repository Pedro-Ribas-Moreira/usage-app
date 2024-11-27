const turnUsage = (nightArray) => {
  let dayUsageElement = document.querySelector('#dayUsage');
  let nigthUsageElement = document.querySelector('#nightUsage');

  console.log(nightArray);

  let nightUnits = 0;
  let dayUnits = 0;
  let totalUnits = 0;
  for (let i = 1; i < nightArray.length; i++) {
    console.log(`night unit: ${Number(nightArray[i][1])}`);
    console.log(`days unit: ${Number(nightArray[i][3])}`);
    nightUnits = nightUnits + Number(nightArray[i][1]);
    dayUnits = dayUnits + Number(nightArray[i][3]);
  }

  totalUnits = dayUnits + nightUnits;
  console.log({ totalUnits });

  let nightPercentage = (nightUnits / totalUnits) * 100;

  let dayPercentage = (dayUnits / totalUnits) * 100;

  //   console.log({ nightPercentage, dayPercentage });

  console.log(`Night Units: ${nightPercentage.toFixed(2)}%`);
  console.log(`Day Units: ${dayPercentage.toFixed(2)}%`);

  dayUsageElement.innerHTML = `${dayPercentage.toFixed(2)}%`;
  nigthUsageElement.innerHTML = `${nightPercentage.toFixed(2)}%`;
};

export { turnUsage };
