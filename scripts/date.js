import { prices, BBprices } from "./prices.js";
class Day {
  units = [];
  nighthUnits = [];
  dayUnits = [];
  peakUnits = [];
  tariff;
  constructor(day) {
    this.day = day;
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

      console.log({ targetDate, dateStart, dateEnd });
      if (targetDate >= dateStart && targetDate <= dateEnd) {
        console.log(true);
        this.tariff = price;
      }
    }
  }

  addUnit(time, usage) {
    this.units.push({ time, usage });

    if (time >= "17:00" && time <= "21:00") {
      this.peakUnits.push({ time, usage });
    }
    if (time >= "08:00" && time < "23:00") {
      this.dayUnits.push({ time, usage });
    } else {
      this.nighthUnits.push({ time, usage });
    }
  }
}

export { Day };
