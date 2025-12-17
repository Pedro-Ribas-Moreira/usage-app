// app.js (or your specific chart file name)

// 1. Define the 3-Theme System
const themes = {
  // Default "Pink" Theme (Light Mode)
  pink: {
    nightBar: '#023047', // Deep Brand Blue
    dayBar:   '#FFB703', // Brand Yellow
    peakBar:  '#FB8500', // Brand Orange
    text:     '#333333', // Dark Grey
    grid:     '#00000020' // Faint black grid
  },
  // "Dark" Theme (Night Mode)
  dark: {
    nightBar: '#48CAE4', // Luminous Cyan
    dayBar:   '#FFB703', // Yellow
    peakBar:  '#FB8500', // Orange
    text:     '#ffffff', // Pure White
    grid:     '#ffffff20' // Faint white grid
  },
  // "Grey" Theme (Accessibility Mode)
  grey: {
    nightBar: '#000000', // Pure Black
    dayBar:   '#E5E7EB', // Light Grey
    peakBar:  '#6B7280', // Medium Grey
    text:     '#000000', // Pure Black text
    grid:     '#000000'  // Solid black grid
  }
};

// 2. Determine Initial Theme
// Checks <html> tag for data-theme="dark/grey/pink". Defaults to 'pink'.
const currentThemeStr = document.documentElement.getAttribute('data-theme') || 'pink';
const activeTheme = themes[currentThemeStr] || themes.pink;

// 3. Helper for Accessibility Borders (Grey Mode only)
const getBorderConfig = (themeName) => {
    return {
        width: themeName === 'grey' ? 2 : 0,
        color: themeName === 'grey' ? '#000000' : 'transparent'
    };
};

let myChart;
let timeChart;

const getChartInfo = (d1, d2, d3, days) => {
  const dates = days.map((dateStr) => {
    const [day, month] = dateStr.split('/').map(Number);
    return day + '/' + month;
  });

  const ctx = document.getElementById('myChart');
  const labels = dates;

  // Get current active theme again to ensure fresh render
  const currentThemeName = document.documentElement.getAttribute('data-theme') || 'pink';
  const theme = themes[currentThemeName] || themes.pink;
  const borders = getBorderConfig(currentThemeName);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Night',
        data: d1,
        backgroundColor: theme.nightBar,
        borderWidth: borders.width,
        borderColor: borders.color,
      },
      {
        label: 'Day',
        data: d2,
        backgroundColor: theme.dayBar,
        borderWidth: borders.width,
        borderColor: borders.color,
      },
      {
        label: 'Peak',
        data: d3,
        backgroundColor: theme.peakBar,
        borderWidth: borders.width,
        borderColor: borders.color,
      },
    ],
  };

  // Assign to window.myChart for global access
  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
      layout: { padding: 20 },
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Total Units per Day',
          color: theme.text,
        },
        legend: {
          labels: { color: theme.text }
        }
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
          ticks: { color: theme.text },
          grid: { color: theme.grid }
        },
        y: {
          stacked: true,
          ticks: { color: theme.text },
          grid: { color: theme.grid }
        },
      },
    },
  });
};


const getTimeChartInfo = (time, prices, day) => {
  const ctx = document.getElementById('timeChart');
  const labels = time;
  
  const currentThemeName = document.documentElement.getAttribute('data-theme') || 'pink';
  const theme = themes[currentThemeName] || themes.pink;

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Units',
        data: prices,
        fill: false,
        // Use DayBar color (Yellow) for the line, or specific theme color
        borderColor: theme.dayBar, 
        backgroundColor: theme.dayBar,
        tension: 0.1,
      },
    ],
  };

  // Assign to window.timeChart
  window.timeChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
      layout: { padding: 20 },
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: day,
          color: theme.text,
        },
        legend: {
            labels: { color: theme.text }
        }
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
          autoSkip: false,
          ticks: { color: theme.text },
          grid: { color: theme.grid }
        },
        y: {
          type: 'linear',
          min: 0,
          max: Math.max(...prices) > 3 ? Math.round(Math.max(...prices)) + 1 : 3,
          ticks: { color: theme.text },
          grid: { color: theme.grid }
        },
      },
    },
  });
};

// --- AUTOMATIC THEME UPDATER ---
// This watches for changes to <html data-theme="..."> and updates charts instantly
const updateAllCharts = (themeName) => {
    const theme = themes[themeName] || themes.pink;
    const borders = getBorderConfig(themeName);

    // Update Main Bar Chart
    if (window.myChart && typeof window.myChart.update === 'function') {
        const c = window.myChart;
        
        // Update Colors & Borders
        if (c.data.datasets.length >= 3) {
            c.data.datasets[0].backgroundColor = theme.nightBar;
            c.data.datasets[1].backgroundColor = theme.dayBar;
            c.data.datasets[2].backgroundColor = theme.peakBar;
            
            c.data.datasets.forEach(d => {
                d.borderWidth = borders.width;
                d.borderColor = borders.color;
            });
        }

        // Update Text & Grid
        c.options.scales.x.ticks.color = theme.text;
        c.options.scales.y.ticks.color = theme.text;
        c.options.scales.x.grid.color = theme.grid;
        c.options.scales.y.grid.color = theme.grid;
        if(c.options.plugins.title) c.options.plugins.title.color = theme.text;
        if(c.options.plugins.legend) c.options.plugins.legend.labels.color = theme.text;
        
        c.update();
    }

    // Update Time Line Chart
    if (window.timeChart && typeof window.timeChart.update === 'function') {
        const c = window.timeChart;
        
        c.data.datasets[0].borderColor = theme.dayBar;
        c.data.datasets[0].backgroundColor = theme.dayBar;
        
        c.options.scales.x.ticks.color = theme.text;
        c.options.scales.y.ticks.color = theme.text;
        c.options.scales.x.grid.color = theme.grid;
        c.options.scales.y.grid.color = theme.grid;
        if(c.options.plugins.title) c.options.plugins.title.color = theme.text;
        
        c.update();
    }
};

// Start Observer
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
            const newTheme = document.documentElement.getAttribute('data-theme');
            updateAllCharts(newTheme);
        }
    });
});
observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });


export {
  myChart,
  getChartInfo,
  timeChart,
  getTimeChartInfo,
};