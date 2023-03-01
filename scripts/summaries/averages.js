let euro = Intl.NumberFormat("en-DE", {
  style: "currency",
  currency: "EUR",
});
const averagesSummary = (arr) => {
  const dayAverage = document.querySelector("#day-average");
  const weekAverage = document.querySelector("#week-average");
  const monthAverage = document.querySelector("#month-average");

  let totals = 0;
  for (var i = 1; i < arr.length; i++) {
    let a = Number(arr[i][arr[i].length - 1].replace(/[^\d.-]/g, ""));
    totals += a;
  }
  let numDays = arr.length - 1;
  let day = totals / numDays;
  let week = day * 7;
  let month = day * 30;

  dayAverage.innerHTML = euro.format(day);

  if (numDays < 7) {
    weekAverage.innerHTML = "Not enough data";
    monthAverage.innerHTML = "Not enough data";
  } else if (numDays < 30) {
    weekAverage.innerHTML = euro.format(week);
    monthAverage.innerHTML = "Not enough data";
  } else {
    weekAverage.innerHTML = euro.format(week);
    monthAverage.innerHTML = euro.format(month);
  }
};

export { averagesSummary };
