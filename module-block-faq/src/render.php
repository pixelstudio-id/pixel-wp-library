<?php
  $atts = $attributes;
  $wrapper_args = [];

  if ($atts['initiallyOpen']) {
    $wrapper_args['open'] = '';
  }

  if ($atts['noIndex']) {
    $wrapper_args['data-no-index'] = '';
  }

  $html_atts = get_block_wrapper_attributes($wrapper_args);
?>

<details <?= $html_atts ?>>
  <summary class='wp-block-px-faq__question'>
    <?= $atts['question'] ?>
  </summary>
  <div class='wp-block-px-faq__answer'>
    <?= $atts['answer'] ?>
  </div>
</details>