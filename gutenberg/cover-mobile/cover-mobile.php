<?php

add_filter('render_block_core/cover', '_px_render_responsive_cover', 10, 2);

/**
 * Wrap the Image with <picture> and add responsive mobile image
 * 
 * @filter render_block_core/cover
 */
function _px_render_responsive_cover($content, $block) {
  // If has mobile image
  $image_src = $block['attrs']['pxMobileMediaURL'] ?? $block['attrs']['hMobileMediaURL'] ?? '';
  if (!empty($image_src)) {
    preg_match('/<div role="img"/', $content, $is_fixed);

    $content = preg_replace(
      '/(wp-block-cover[^_].+)(">)/Ui',
      "$1 px-has-mobile-image\">",
      $content
    );

    // If fixed background
    if ($is_fixed) {
      $content = preg_replace(
        '/(<div role="img".+style=".+)(">)/Ui',
        "$1;--pxMobileMediaURL:url({$image_src});$2",
        $content
      );
    }
    else {
      $content = preg_replace(
        '/<img class="wp-block-cover__image.+\/>/Ui',
        "<picture><source srcset='{$image_src}' media='(max-width:767px)'>$0</picture>",
        $content
      );
    }
  }

  // If has mobile height
  $image_height = $block['attrs']['pxMobileHeight'] ?? $block['attrs']['hMobileHeight'] ?? '';
  if (!empty($image_height)) {
    preg_match('/wp-block-cover\s.+(style=).+>/Ui', $content, $has_style);

    // If already have existing style attribute
    if($has_style) {
      $content = preg_replace(
        '/(wp-block-cover\s.+)(style=".+)(".+>)/Ui',
        "$1$2;--pxMobileHeight:{$image_height};$3",
        $content
      );
    } else {
      $content = preg_replace(
        '/(wp-block-cover\s.+")(.*>)/Ui',
        "$1 style='--pxMobileHeight:{$image_height}' $2",
        $content
      );
    }
  }
  
  return $content;
}
