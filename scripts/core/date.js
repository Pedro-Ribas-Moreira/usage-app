import { prices } from "./prices.js";

class Day {
  tariff;
  units = [];
  nightSaver = [];
  timeOfUsage = [];
  nightUnits = [];
  dayUnits = [];
  touDayUnits = [];
  touPeakUnits = [];
  touNightUnits = [];

  constructor(day) {
    this.day = day;
    this.findTariff(day);
  }

  findTariff(day) {
    const targetDate = this.#parseDate(day);
    for (const price of prices) {
      const dateStart = this.#parseDate(price.dateStart);
      const dateEnd = price.dateEnd === undefined
        ? targetDate
        : this.#parseDate(price.dateEnd);
      if (targetDate >= dateStart && targetDate <= dateEnd) {
        this.tariff = price.prices;
      }
    }
  }

  addUnit(time, usage) {
    const targetDate = this.#parseDate(this.day);
    const isDST = this.#isDaylightSaving(targetDate);

    this.units.push({ time, usage, total: usage * this.tariff.allDayPrice });

    if (isDST) {
      // NightSaver: night window 00:30–09:30
      if (time >= "00:30" && time <= "09:30") {
        const total = usage * this.tariff.nightPrice;
        this.nightUnits.push({ time, usage, total });
        this.nightSaver.push({ time, usage, total });
      } else {
        const total = usage * this.tariff.dayPrice;
        this.dayUnits.push({ time, usage, total });
        this.nightSaver.push({ time, usage, total });
      }

      // TOU: peak window 18:30–20:30
      if (time >= "18:30" && time <= "20:30") {
        const total = usage * this.tariff.touPeakPrice;
        this.touPeakUnits.push({ time, usage, total });
        this.timeOfUsage.push({ time, usage, total });
      } else if (time >= "00:30" && time <= "09:30") {
        const total = usage * this.tariff.touNightPrice;
        this.touNightUnits.push({ time, usage, total });
        this.timeOfUsage.push({ time, usage, total });
      } else {
        const total = usage * this.tariff.touDayPrice;
        this.touDayUnits.push({ time, usage, total });
        this.timeOfUsage.push({ time, usage, total });
      }
    } else {
      // NightSaver (standard time): day window 08:00–23:00
      if (time >= "08:00" && time <= "23:00") {
        const total = usage * this.tariff.dayPrice;
        this.dayUnits.push({ time, usage, total });
        this.nightSaver.push({ time, usage, total });
      } else {
        const total = usage * this.tariff.nightPrice;
        this.nightUnits.push({ time, usage, total });
        this.nightSaver.push({ time, usage, total });
      }

      // TOU (standard time): peak window 17:00–19:00
      if (time >= "17:00" && time <= "19:00") {
        const total = usage * this.tariff.touPeakPrice;
        this.touPeakUnits.push({ time, usage, total });
        this.timeOfUsage.push({ time, usage, total });
      } else if (time >= "08:00" && time <= "23:00") {
        const total = usage * this.tariff.touDayPrice;
        this.touDayUnits.push({ time, usage, total });
        this.timeOfUsage.push({ time, usage, total });
      } else {
        const total = usage * this.tariff.touNightPrice;
        this.touNightUnits.push({ time, usage, total });
        this.timeOfUsage.push({ time, usage, total });
      }
    }
  }

  getTotals(list) {
    let totalUnits = 0;
    let totalPaid = 0;
    for (const entry of list) {
      totalUnits += entry.usage;
      totalPaid += entry.total;
    }
    return { totalUnits, totalPaid };
  }

  #parseDate(str) {
    return new Date(str.split("/").reverse().join("-"));
  }

  #isDaylightSaving(date) {
    const month = date.getMonth();
    const day = date.getDate();
    return (
      (month > 2 && month < 9) ||
      (month === 2 && day >= 26) ||
      (month === 9 && day <= 29)
    );
  }
}

export { Day };
