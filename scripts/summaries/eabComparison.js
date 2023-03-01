import { prices } from "../prices.js";
let euro = Intl.NumberFormat("en-DE", {
  style: "currency",
  currency: "EUR",
});

const eabComparison = (tariff, arr, location) => {
  const totalDays = document.querySelector("#total-days-eab");
  const customerUsage = document.querySelector("#customer-usage-esb");
  const esbAverage = document.querySelector("#average-usage-esb");

  const days = arr.length - 1;
  totalDays.innerHTML = days;

  let estimateUnitsDay = 4200 / 365;
  let estimateTotal = 0;
  if (tariff == "24h") {
    estimateTotal = estimateUnitsDay * prices[2].prices.allDayPrice;
    if (location == "urban") {
      estimateTotal = estimateTotal + prices[2].prices.urbanDaySC;
    } else if (location == "rural") {
      estimateTotal = estimateTotal + prices[2].prices.ruralDaySC;
    } else {
    }
  }
  if (tariff == "nightsaver") {
    let dayUnits = (estimateUnitsDay / 2) * prices[2].prices.dayPrice;
    let nightUnits = (estimateUnitsDay / 2) * prices[2].prices.nightPrice;
    let totalUnits = dayUnits + nightUnits;
    if (location == "urban") {
      estimateTotal = totalUnits + prices[2].prices.urbanNightsaverSC;
    } else if (location == "rural") {
      estimateTotal = totalUnits + prices[2].prices.ruralNightsaverSC;
    } else {
    }
  }
  if (tariff == "tou") {
    let dayUnits = (estimateUnitsDay / 3) * prices[2].prices.touDayPrice;
    let peakUnits = (estimateUnitsDay / 3) * prices[2].prices.touPeakPrice;
    let nightUnits = (estimateUnitsDay / 3) * prices[2].prices.touNightPrice;
    let totalUnits = dayUnits + nightUnits + peakUnits;
    if (location == "urban") {
      estimateTotal = totalUnits + prices[2].prices.touUrbanSC;
    } else if (location == "rural") {
      estimateTotal = totalUnits + prices[2].prices.touRuralSC;
    } else {
    }
  }
  estimateTotal = estimateTotal * days;
  esbAverage.innerHTML = euro.format(estimateTotal);

  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    let a = Number(arr[i][arr[i].length - 1].replace(/[^\d.-]/g, ""));
    total += a;
  }
  customerUsage.innerHTML = euro.format(total);
};

export { eabComparison };
