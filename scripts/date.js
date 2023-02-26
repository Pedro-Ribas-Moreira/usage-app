import { prices, BBprices, hello } from "./prices.js";
class Day {
  nighthUnits = [];
  dayUnits = [];
  peakUnits = [];

  constructor(day, units = []) {
    this.day = day;
    this.units = units;
  }

  addUnit(time, usage) {
    this.units.push({ time, usage });
  }

  calculateTotal(price) {
    let total = 0;
    for (let i = 0; i < this.units.length; i++) {
      total += this.units[i].usage * price;
    }
    return total;
  }
}
