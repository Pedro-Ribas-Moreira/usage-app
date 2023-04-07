import { prices, BBprices } from "./prices.js";
class Day {
  tariff;
  // 24H
  units = [];
  nightSaver = [];
  timeOfUsage = [];
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
    const targetDate = new Date(this.day.split("/").reverse().join("-"));
    // const dateStart = new Date("2023-03-26");
    // const dateEnd = new Date("2023-10-29");

    const daylightsaving = false;
    // const daylightsaving =
    //   (targetDate.getMonth() > 2 && // month is after March
    //     targetDate.getMonth() < 9) || // month is before October
    //   (targetDate.getMonth() === 2 && targetDate.getDate() >= 26) || // month is March and day is 26 or later
    //   (targetDate.getMonth() === 9 && targetDate.getDate() <= 29); // month is October and day is 29 or earlier

    let a = usage * this.tariff.allDayPrice;
    this.units.push({ time, usage, total: a });

    if (daylightsaving) {
      //NIGHTSAVER tariff handler
      if (time >= "00:30" && time <= "09:30") {
        let c = usage * this.tariff.nightPrice;
        this.nightUnits.push({ time, usage, total: c });
        this.nightSaver.push({ time, usage, total: c });
      } else {
        let b = usage * this.tariff.dayPrice;
        this.dayUnits.push({ time, usage, total: b });
        this.nightSaver.push({ time, usage, total: b });
      }

      //TOU tariff handler
      if (time >= "18:30" && time <= "20:30") {
        let d = usage * this.tariff.touPeakPrice;
        this.touPeakUnits.push({ time, usage, total: d });
        this.timeOfUsage.push({ time, usage, total: d });
      } else if (time >= "00:30" && time <= "09:30") {
        let f = usage * this.tariff.touNightPrice;
        this.touNightUnits.push({ time, usage, total: f });
        this.timeOfUsage.push({ time, usage, total: f });
      } else if (
        !(time >= "18:30" && time <= "20:30") &&
        !(time >= "00:30" && time <= "09:30")
      ) {
        let e = usage * this.tariff.touDayPrice;
        this.touDayUnits.push({ time, usage, total: e });
        this.timeOfUsage.push({ time, usage, total: e });
      }
    } else {
      //NOT DAYLIGHT SAVING PERIOD
      //NIGHTSAVER tariff handler
      if (time >= "08:00" && time <= "23:00") {
        let b = usage * this.tariff.dayPrice;
        this.dayUnits.push({ time, usage, total: b });
        this.nightSaver.push({ time, usage, total: b });
      } else {
        let c = usage * this.tariff.nightPrice;
        this.nightUnits.push({ time, usage, total: c });
        this.nightSaver.push({ time, usage, total: c });
      }

      //TOU tariff handler
      if (time >= "17:00" && time <= "19:00") {
        let d = usage * this.tariff.touPeakPrice;
        this.touPeakUnits.push({ time, usage, total: d });
        this.timeOfUsage.push({ time, usage, total: d });
      } else if (
        time >= "08:00" &&
        time <= "23:00" &&
        !(time >= "17:00" && time <= "19:00")
      ) {
        let e = usage * this.tariff.touDayPrice;
        this.touDayUnits.push({ time, usage, total: e });
        this.timeOfUsage.push({ time, usage, total: e });
      } else {
        let f = usage * this.tariff.touNightPrice;
        this.touNightUnits.push({ time, usage, total: f });
        this.timeOfUsage.push({ time, usage, total: f });
      }
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

  getPeak() {}
}

export { Day };
