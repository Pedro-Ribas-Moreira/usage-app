import { prices } from './prices.js';

const chartContainer = document.querySelector('.chart-container');
const isDarkMode = document.documentElement.classList.contains('dark');
const themes = {
  nightBar: isDarkMode ? '#48CAE4' : '#023047',
  text: isDarkMode ? '#ffffff' : '#333333',
  grid: isDarkMode ? '#ffffff20' : '#00000020',
   
}

let myChart;

const getChartInfo = (d1, d2, d3, days) => {
  const dates = days.map((dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    // Month is 0-based in JavaScript Date (Jan = 0, Dec = 11)

    return day + '/' + month;
  });

  // chartContainer.classList.remove("hidden");
  const ctx = document.getElementById('myChart');
  const labels = dates;
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Night',
        data: d1,
        backgroundColor: themes.nightBar,
      },
      {
        label: 'Day',
        data: d2,
        backgroundColor: '#FFB703',
      },
      {
        label: 'Peak',
        data: d3,
        backgroundColor: '#FB8500',
      },
    ],
  };

  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
      layout: {
        padding: 20,
      },
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Total Units per Day',
          color: themes.text, 
        },
        legend:{
        labels:{
          color: themes.text
        }
      }
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: themes.text, 
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: themes.text, 
          },
        },
      },
      
    },
  });
};

let timeChart;
const getTimeChartInfo = (time, prices, day) => {
  // chartContainer.classList.remove("hidden");
  const ctx = document.getElementById('timeChart');
  const labels = time;
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Units',
        data: prices,
        fill: false,
        borderColor: '#FFB703',
        backgroundColor: '#FFB703',
        tension: 0.1,
      },
    ],
  };

  timeChart = new Chart(ctx, {
    type: 'line',
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
          type: 'linear',
          min: 0,
          max: Math.max(...prices) > 3 ? Math.round(Math.max(...prices)) + 1 : 3,
        },
      },
    },
  });
};

export {
  myChart,
  getChartInfo,
  // mySecondChart,
  // getSecondChartInfo,
  // myThirdChart,
  // getThirdChartInfo,
  timeChart,
  getTimeChartInfo,
};
