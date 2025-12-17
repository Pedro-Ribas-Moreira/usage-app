// 1. Select the Toggle Button
const themeToggleBtn = document.getElementById('theme-toggle');

// 2. Define the Cycle Order
// Order: Pink (Default) -> Dark -> Grey -> Pink...
const themeCycle = ['pink', 'dark', 'grey'];

// 3. Helper Function: Apply Theme
function applyTheme(themeName) {
  // Update the HTML tag (This triggers all your Tailwind 'dark:' and 'grey:' classes)
  document.documentElement.setAttribute('data-theme', themeName);
  
  // Save preference
  localStorage.setItem('color-theme', themeName);
}

// 4. Initialization Logic
// Check LocalStorage first, then System Preference, otherwise default to 'pink'
function initTheme() {
  const savedTheme = localStorage.getItem('color-theme');
  
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    // If no save, check system preference
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(systemDark ? 'dark' : 'pink');
  }
}

// 5. Run Init on Load
initTheme();

// 6. Click Event Listener (The Cycle)
themeToggleBtn.addEventListener('click', () => {
  // Get current theme from HTML, default to 'pink'
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'pink';
  
  // Find the index of the current theme
  const currentIndex = themeCycle.indexOf(currentTheme);
  
  // Calculate the next index (loop back to 0 if at the end)
  const nextIndex = (currentIndex + 1) % themeCycle.length;
  
  // Apply the new theme
  const nextTheme = themeCycle[nextIndex];
  applyTheme(nextTheme);
});