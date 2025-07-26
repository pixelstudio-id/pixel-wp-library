// Script that needs to be at <head> so it runs first

const darkMode = localStorage.pxDarkMode === 'true';

if (darkMode) {
  document.querySelector('html').classList.add('px-is-dark');

  // activate the toggle
  document.addEventListener('DOMContentLoaded', () => {
    const $toggles = document.querySelectorAll('.px-dark-toggle input[type="checkbox"]');
    $toggles.forEach(($t) => {
      $t.checked = true;
    });
  });
}
