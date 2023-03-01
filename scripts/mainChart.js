const chartContainer = document.querySelector(".chart-container");

let mySecondChart;

let myChart;
const getSecondChartInfo = (d1, d2, d3, days) => {
  chartContainer.classList.remove("hidden");
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
      },
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Chart.js Bar Chart - Stacked",
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

const getChartInfo = (d1, d2, d3, days) => {
  chartContainer.classList.remove("hidden");
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
      },
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Chart.js Bar Chart - Stacked",
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

export { myChart, getChartInfo };
