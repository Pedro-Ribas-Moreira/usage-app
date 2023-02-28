import {
  createLists,
  dayArray,
  dayRuralArray,
  nightArray,
  nigthRuralArray,
  peakArray,
  peakRuralArray,
} from "./createLists.js";

let euro = Intl.NumberFormat("en-DE", {
  style: "currency",
  currency: "EUR",
});

const summaryBox = (array, location) => {
  // UPDATE THE SUMMARY BOX
  document.querySelector("#total-days").innerHTML = array.length - 1;
  const ts = document.querySelector("#total-days-sum");
  let sum = 0;
  let highestSum = 0;
  let highestDay;

  for (let i = 0; i < array.length; i++) {
    let a = Number(array[i][array[i].length - 1].replace(/[^\d.-]/g, ""));

    if (a >= highestSum) {
      highestSum = a;
      highestDay = array[i][0];
    }

    sum = sum + a;
  }
  ts.innerHTML = euro.format(sum);

  let average = sum / Number(array.length - 1);
  document.querySelector("#average-days-sum").innerHTML = euro.format(average);

  document.querySelector("#highest-day-spent").innerHTML = highestDay;
  document.querySelector("#highest-day-sum").innerHTML =
    euro.format(highestSum);

  if (location == "rural") {
    let pt = 0;
    let nt = 0;
    let dt = 0;

    for (let i = 0; i < array.length; i++) {
      pt =
        pt +
        Number(
          peakRuralArray[i][peakRuralArray[i].length - 1].replace(
            /[^\d.-]/g,
            ""
          )
        );
      nt =
        nt +
        Number(
          nigthRuralArray[i][nigthRuralArray[i].length - 1].replace(
            /[^\d.-]/g,
            ""
          )
        );
      dt =
        dt +
        Number(
          dayRuralArray[i][dayRuralArray[i].length - 1].replace(/[^\d.-]/g, "")
        );
    }
    document.querySelector("#total-spent-24").innerHTML = euro.format(dt);
    document.querySelector("#total-spent-dn").innerHTML = euro.format(nt);
    document.querySelector("#total-spent-tou").innerHTML = euro.format(pt);
  } else {
    let pt = 0;
    let nt = 0;
    let dt = 0;

    for (let i = 0; i < array.length; i++) {
      pt =
        pt +
        Number(peakArray[i][peakArray[i].length - 1].replace(/[^\d.-]/g, ""));
      nt =
        nt +
        Number(nightArray[i][nightArray[i].length - 1].replace(/[^\d.-]/g, ""));
      dt =
        dt +
        Number(dayArray[i][dayArray[i].length - 1].replace(/[^\d.-]/g, ""));
    }
    document.querySelector("#total-spent-24").innerHTML = euro.format(dt);
    document.querySelector("#total-spent-dn").innerHTML = euro.format(nt);
    document.querySelector("#total-spent-tou").innerHTML = euro.format(pt);
  }
};

export { summaryBox };
