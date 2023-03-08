const chartContainer = document.querySelector(".chart-container");

let mySecondChart;
let myChart;
const getSecondChartInfo = (d1, d2, d3, days) => {
  chartContainer.classList.remove("hidden");
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

export { myChart, getChartInfo, mySecondChart, getSecondChartInfo };
