<?php if (!defined('ABSPATH')) { exit; }

// @warn - Disabled because Swiper Elements has weird loading behavior, causing layout shift, use normal Swiper instead

// add_filter('render_block_core/gallery', '_px_setup_gallery_slider', 10, 2);

/**
 * Use WP HTML class to check if the gallery has `is-style-(h|px)-slider` style and replace the wrapper with <swiper-container> and the child into <swiper-slide> elements.
 */
function _px_setup_gallery_slider($content, $block) {
  $is_slider = isset($block['attrs']['className'])
    && preg_match('/is-style-(h|px)-slider/', $block['attrs']['className']);
  
  if (!$is_slider) { return $content; }

  // change child into swiper-slide
  $content = preg_replace('/<figure(\sclass="wp-block-image.+)<\/figure>/Ui', '<swiper-slide$1</swiper-slide>', $content);
  
  // change wrapper into swiper-container
  $content = preg_replace('/<figure(\sclass="wp-block-gallery.+)<\/figure>/Uis', '<swiper-container init="false" $1</swiper-container>', $content);

  return $content;
}