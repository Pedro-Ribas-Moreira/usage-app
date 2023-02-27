import { prices, BBprices } from "./prices.js";
class Day {
  tariff;

  // 24H
  units = [];

  // DAY/NIGHT
  nightUnits = [];
  dayUnits = [];

  // TOU
  touDayUnits = [];
  touPeakUnits = [];
  touNightUnits = [];

  constructor(day) {
    this.day = day;
    this.findTariff(day);
  }
  findTariff(day) {
    const targetDate = new Date(day.split("/").reverse().join("-"));

    for (let price of prices) {
      const dateStart = new Date(
        price.dateStart.split("/").reverse().join("-")
      );

      const dateEnd =
        price.dateEnd === undefined
          ? targetDate // Use target date as end date for "current" tariff
          : new Date(price.dateEnd.split("/").reverse().join("-"));

      if (targetDate >= dateStart && targetDate <= dateEnd) {
        this.tariff = price.prices;
      }
    }
  }

  addUnit(time, usage) {
    //24h tariff handler
    let a = usage * this.tariff.allDayPrice;
    this.units.push({ time, usage, total: a });

    //NIGHTSAVER tariff handler
    if (time >= "08:00" && time < "23:00") {
      let b = usage * this.tariff.dayPrice;
      this.dayUnits.push({ time, usage, total: b });
    } else {
      let c = usage * this.tariff.nightPrice;
      this.nightUnits.push({ time, usage, total: c });
    }

    //TOU tariff handler
    if (time >= "17:00" && time <= "21:00") {
      let d = usage * this.tariff.touPeakPrice;
      this.touPeakUnits.push({ time, usage, total: d });
    } else if (
      time >= "08:00" &&
      time < "23:00" &&
      !(time >= "17:00" && time <= "21:00")
    ) {
      let e = usage * this.tariff.touDayPrice;
      this.touDayUnits.push({ time, usage, total: e });
    } else {
      let f = usage * this.tariff.touNightPrice;
      this.touNightUnits.push({ time, usage, total: f });
    }
  }

  getTotals(list) {
    let totalUnits = 0;
    let totalPaid = 0;
    for (let i = 0; i < list.length; i++) {
      totalUnits += list[i].usage;
      totalPaid += list[i].total;
    }
    return { totalUnits, totalPaid };
  }
}

export { Day };
