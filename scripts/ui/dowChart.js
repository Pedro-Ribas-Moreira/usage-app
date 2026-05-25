let dowChart;

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const getDowChartInfo = (array) => {
  console.log('[dowChart] getDowChartInfo called, array length:', array.length);
  if (dowChart) { console.log('[dowChart] destroying existing chart'); dowChart.destroy(); }

  const dowTotals = Array(7).fill(0);
  const dowCounts = Array(7).fill(0);

  for (let i = 1; i < array.length; i++) {
    const [dd, mm, yyyy] = array[i][0].split('/');
    const date = new Date(yyyy, mm - 1, dd);
    const dow = (date.getDay() + 6) % 7; // 0=Mon … 6=Sun
    const total = Number(array[i][array[i].length - 1].replace(/[^\d.-]/g, ''));
    dowTotals[dow] += total;
    dowCounts[dow]++;
  }

  const averages = dowTotals.map((total, i) =>
    dowCounts[i] > 0 ? Number((total / dowCounts[i]).toFixed(2)) : 0
  );

  const isDark = document.documentElement.classList.contains('dark');
  const textColor = isDark ? '#ffffff' : '#333333';
  const weekdayColor = isDark ? '#48CAE4' : '#E71E70';
  const weekendColor = '#FB8500';
  const backgroundColors = DAY_LABELS.map((_, i) => (i < 5 ? weekdayColor : weekendColor));

  const ctx = document.getElementById('dow-chart');

  console.log('[dowChart] averages computed:', averages);
  console.log('[dowChart] canvas element:', ctx, '| offsetWidth:', ctx.offsetWidth, '| offsetHeight:', ctx.offsetHeight, '| display:', getComputedStyle(ctx).display);
  window.dowChart = dowChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: DAY_LABELS,
      datasets: [
        {
          label: 'Avg daily spend',
          data: averages,
          backgroundColor: backgroundColors,
          borderRadius: { topLeft: 6, topRight: 6 },
          borderSkipped: false,
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
          text: 'Typical Week — Average Daily Spend',
          color: textColor,
        },
        legend: { labels: { color: textColor } },
        tooltip: {
          callbacks: {
            label: (ctx) => ` €${ctx.parsed.y.toFixed(2)}`,
          },
        },
      },
      scales: {
        x: { ticks: { color: textColor } },
        y: {
          min: 0,
          ticks: {
            color: textColor,
            callback: (value) => `€${value.toFixed(2)}`,
          },
        },
      },
    },
  });
};

export { dowChart, getDowChartInfo };
