let profileChart;

const getProfileChartInfo = (dailyData) => {
  if (profileChart) profileChart.destroy();

  const timeMap = new Map();
  for (const day of dailyData) {
    for (const entry of day.units) {
      const timeKey = entry.time.slice(0, 5);
      if (!timeMap.has(timeKey)) timeMap.set(timeKey, []);
      timeMap.get(timeKey).push(entry.usage);
    }
  }

  const sortedTimes = Array.from(timeMap.keys()).sort();
  const averages = sortedTimes.map((t) => {
    const values = timeMap.get(t);
    return values.reduce((sum, v) => sum + v, 0) / values.length;
  });

  const isDark = document.documentElement.classList.contains('dark');
  const textColor = isDark ? '#ffffff' : '#333333';
  const ctx = document.getElementById('profile-chart');

  window.profileChart = profileChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: sortedTimes,
      datasets: [
        {
          label: 'Avg kWh',
          data: averages,
          fill: true,
          borderColor: '#E71E70',
          backgroundColor: 'rgba(231, 30, 112, 0.1)',
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
      ],
    },
    options: {
      layout: { padding: 20 },
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Average Usage by Time of Day',
          color: textColor,
        },
        legend: { labels: { color: textColor } },
      },
      scales: {
        x: {
          ticks: { color: textColor, maxTicksLimit: 12 },
        },
        y: {
          min: 0,
          ticks: { color: textColor },
        },
      },
    },
  });
};

export { profileChart, getProfileChartInfo };
