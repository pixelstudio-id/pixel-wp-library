<?php if (!defined('ABSPATH')) { exit; }

add_filter('render_block_core/spacer', '_px_render_negative_spacer', 10, 2);

/**
 * Modify the height into margin-bottom
 * @deprecated 2025 - Use negative margin instead
 * 
 * @filter render_block_core/spacer
 */
function _px_render_negative_spacer($content, $block) {
  $is_negative = isset($block['attrs']['className'])
    && preg_match('/is-style-(h|px)-negative/', $block['attrs']['className']);

  if ($is_negative) {
    $content = preg_replace('/height:(\d+)/', 'margin-bottom:-$1', $content);
  }
  return $content;
}