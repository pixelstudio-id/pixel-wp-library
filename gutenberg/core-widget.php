<?php

add_filter('render_block_core/html', '_px_add_wrapper_to_html', 10, 2);
add_filter('render_block_core/latest-posts', '_px_add_list_class_to_latest_posts', 10, 2);

/**
 * @filter render_block_core/html
 */
function _px_add_wrapper_to_html($content, $block) {
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

/**
 * @filter render_block_core/latest-posts
 */
function _px_add_list_class_to_latest_posts($content, $block) {
  // abort if grid
  if (isset($block['attrs']['postLayout']) && $block['attrs']['postLayout'] === 'grid') {
    return $content;
  }

  $content = preg_replace(
    '/(<ul class="wp-block-latest-posts__list)/Ui',
    '$1 is-list',
    $content
  );

  return $content;
}