<?php

add_filter('render_block_core/html', '_h_add_wrapper_to_html', 10, 2);

/**
 * @filter render_block_core/html
 */
function _h_add_wrapper_to_html($content, $block) {
  $align = $block['attrs']['align'] ?? '';

  if ($align) {
    preg_match('/.*<\w+.+(class=".+").+>/Ui', $content, $has_class);
    $align_class = "align{$align}";

    if ($has_class) {
      $content = preg_replace(
        '/.*(<\w+.+)(class="(.+)")(.+>)/Ui',
        "$1class=\"$3 {$align_class}\"$4",
        $content
      );
    } else {
      $content = preg_replace(
        '/.*(<\w+\s)(.+>)/Ui',
        "$1class='alignfull' $2",
        $content
      );
    }
  }

  return $content;
}