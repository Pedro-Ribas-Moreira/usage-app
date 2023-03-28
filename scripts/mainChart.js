import { prices } from "./prices.js";

const chartContainer = document.querySelector(".chart-container");

let myChart;

const getChartInfo = (d1, d2, d3, days) => {
  // chartContainer.classList.remove("hidden");
  const ctx = document.getElementById("myChart");
  const labels = days;
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Night",
        data: d1,
        backgroundColor: "#023047",
      },
      {
        label: "Day",
        data: d2,
        backgroundColor: "#FFB703",
      },
      {
        label: "Peak",
        data: d3,
        backgroundColor: "#FB8500",
      },
    ],
  };

  myChart = new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: {
      layout: {
        padding: 20,
        onClick: (e) => {
          console.log(e);
        },
      },
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Total Units per Day",
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
          autoSkip: false,
        },
        y: {
          stacked: true,
          autoSkip: false,
        },
      },
      onclick: function (event, chartElement) {
        // Get the index of the hovered data point
        console.log("clicked");
        // var index = chartElement[0].index;
        // // Find the corresponding row in the table
        // var row = document.getElementById("csv-table").rows[index + 1];

        // // Add a highlight class to the row
        // row.classList.add("highlight");
        // console.log(row);
      },
    },
  });
};
let mySecondChart;
const getSecondChartInfo = (d1, d2, d3, days) => {
  // chartContainer.classList.remove("hidden");
  const ctx = document.getElementById("mySecondChart");
  const labels = days;
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Night",
        data: d1,
        backgroundColor: "#023047",
      },
      {
        label: "Day",
        data: d2,
        backgroundColor: "#FFB703",
      },
      {
        label: "Peak",
        data: d3,
        backgroundColor: "#FB8500",
      },
    ],
  };

  mySecondChart = new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: {
      layout: {
        padding: 20,
      },
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Last 7 Days - Units per day",
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
          autoSkip: false,
        },
        y: {
          stacked: true,
          autoSkip: false,
        },
      },
    },
  });
};

let myThirdChart;
const getThirdChartInfo = (d1, d2, d3) => {
  // chartContainer.classList.remove("hidden");
  const ctx = document.getElementById("myThirdChart");
  const labels = ["Day", "Peak", "Night"];
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [d1, d2, d3],
        backgroundColor: ["#FFB703", "#FB8500", "#023047"],
        hoverOffset: 4,
      },
    ],
  };

  myThirdChart = new Chart(ctx, {
    type: "doughnut",
    data: chartData,
    options: {
      layout: {
        padding: 20,
      },
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Total Usage by Period",
        },
      },
      responsive: true,
      // scales: {
      //   x: {
      //     stacked: true,
      //     autoSkip: false,
      //   },
      //   y: {
      //     stacked: true,
      //     autoSkip: false,
      //   },
      // },
    },
  });
};

let timeChart;
const getTimeChartInfo = (time, prices, day) => {
  // chartContainer.classList.remove("hidden");
  const ctx = document.getElementById("timeChart");
  const labels = time;
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Units",
        data: prices,
        fill: false,
        borderColor: "#FFB703",
        backgroundColor: "#FFB703",
        tension: 0.1,
      },
    ],
  };

  timeChart = new Chart(ctx, {
    type: "line",
    data: chartData,
    options: {
      layout: {
        padding: 20,
      },
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: day,
        },
      },

      responsive: true,
      scales: {
        x: {
          stacked: true,
          autoSkip: false,
        },
        y: {
          type: "linear",
          min: 0,
          max:
            Math.max(...prices) > 3 ? Math.round(Math.max(...prices)) + 1 : 3,
        },
      },
    },
  });
};

export {
  myChart,
  getChartInfo,
  mySecondChart,
  getSecondChartInfo,
  myThirdChart,
  getThirdChartInfo,
  timeChart,
  getTimeChartInfo,
};
