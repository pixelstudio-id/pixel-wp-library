import './admin.sass';

function onReady() {
  const $fields = document.querySelectorAll('.acf-field[data-name="head_code"] textarea, .acf-field[data-name="footer_code"] textarea');
  if (!$fields) { return; }

  $fields.forEach(($field) => {
    window.wp.codeEditor.initialize($field, window.pxCodemirrorSettings);
  });

}

document.addEventListener('DOMContentLoaded', onReady);
