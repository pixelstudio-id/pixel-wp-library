import './style.sass';

const pxDarkMode = {
  init() {
    this.clickListener();
    this.tabindexListener();
  },

  /**
   * Click listener for dark mode toggle
   */
  clickListener() {
    const $darkToggles = document.querySelectorAll('.px-dark-toggle input[type="checkbox"]');
    if ($darkToggles.length <= 0) { return; }

    $darkToggles.forEach(($t) => {
      $t.addEventListener('change', (e) => {
        this.toggle(e.currentTarget.checked);
      });
    });
  },

  /**
   * Keyboard listener for dark mode toggle
   */
  tabindexListener() {
    const $darkSwitches = document.querySelectorAll('.px-dark-toggle__switch');

    $darkSwitches.forEach(($s) => {
      $s.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
          const $checkbox = e.currentTarget.closest('.px-dark-toggle').querySelector('input[type="checkbox"]');
          $checkbox.checked = !$checkbox.checked;
          this.toggle($checkbox.checked);
        }
      });
    });
  },

  /**
   * Toggle the body class and cache the variable
   */
  toggle(isChecked) {
    document.querySelector('html').classList.toggle('px-is-dark', isChecked);

    // the checker for this is outputed into wp_body_open() by Edje WP Library
    localStorage.setItem('pxDarkMode', isChecked);
  },
};

document.addEventListener('DOMContentLoaded', () => {
  pxDarkMode.init();
});
