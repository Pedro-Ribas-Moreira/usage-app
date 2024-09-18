const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const lightLogo = document.getElementById('lightLogo');
const darkLogo = document.getElementById('darkLogo');
if (
  localStorage.getItem('color-theme') === 'dark' ||
  (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark');
  themeToggleLightIcon.classList.remove('hidden');
  themeToggleDarkIcon.classList.add('hidden');
  darkLogo.classList.remove('hidden');
  lightLogo.classList.add('hidden');
} else {
  document.documentElement.classList.remove('dark');
  document.documentElement.classList.remove('dark');
  themeToggleLightIcon.classList.add('hidden');
  themeToggleDarkIcon.classList.remove('hidden');
  darkLogo.classList.add('hidden');
  lightLogo.classList.remove('hidden');
}

document.querySelector('#theme-toggle').addEventListener('click', () => {
  themeToggleDarkIcon.classList.toggle('hidden');
  themeToggleLightIcon.classList.toggle('hidden');
  lightLogo.classList.remove('hidden');

  if (localStorage.getItem('color-theme')) {
    if (localStorage.getItem('color-theme') === 'light') {
      document.documentElement.classList.add('dark');
      darkLogo.classList.remove('hidden');
      lightLogo.classList.add('hidden');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      darkLogo.classList.add('hidden');
      lightLogo.classList.remove('hidden');
      localStorage.setItem('color-theme', 'light');
    }

    // if NOT set via local storage previously
  } else {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      darkLogo.classList.add('hidden');
      lightLogo.classList.remove('hidden');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      darkLogo.classList.remove('hidden');
      lightLogo.classList.add('hidden');
      localStorage.setItem('color-theme', 'dark');
    }
  }
});
