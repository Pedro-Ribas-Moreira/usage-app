const getThemes = () => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  return {
    nightBar: isDarkMode ? '#48CAE4' : '#023047',
    text: isDarkMode ? '#ffffff' : '#333333',
    grid: isDarkMode ? '#ffffff20' : '#00000020',
  };
};

let mainChart;

const getChartInfo = (nightData, dayData, peakData, days) => {
  const themes = getThemes();
  const dates = days.map((dateStr) => {
    const [day, month] = dateStr.split('/').map(Number);
    return day + '/' + month;
  });

  const ctx = document.getElementById('main-chart');
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Night',
        data: nightData,
        backgroundColor: themes.nightBar,
      },
      {
        label: 'Day',
        data: dayData,
        backgroundColor: '#FFB703',
      },
      {
        label: 'Peak',
        data: peakData,
        backgroundColor: '#FB8500',
      },
    ],
  };

  window.mainChart = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
      layout: { padding: 20 },
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Total Units per Day',
          color: themes.text,
        },
        legend: {
          labels: { color: themes.text },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: { color: themes.text },
        },
        y: {
          stacked: true,
          ticks: { color: themes.text },
        },
      },
    },
  });
};

let timeChart;

const getTimeChartInfo = (time, units, day) => {
  const themes = getThemes();
  const ctx = document.getElementById('time-chart');
  const chartData = {
    labels: time,
    datasets: [
      {
        label: 'Units',
        data: units,
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
      layout: { padding: 20 },
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: day,
          color: themes.text,
        },
        legend: {
          labels: { color: themes.text },
        },
      },
      scales: {
        x: {
          stacked: true,
          autoSkip: false,
          ticks: { color: themes.text },
        },
        y: {
          type: 'linear',
          min: 0,
          ticks: { color: themes.text },
          max: Math.max(...units) > 3 ? Math.round(Math.max(...units)) + 1 : 3,
        },
      },
    },
  });
};

export { mainChart, getChartInfo, timeChart, getTimeChartInfo };
