<?php

register_block_style('core/gallery', [ 'name' => 'px-slider', 'label' => 'Slider' ]);
register_block_style('core/gallery', [ 'name' => 'px-thumbnails', 'label' => 'Thumbnails' ]);

register_block_style('core/cover', [ 'name' => 'px-below-header', 'label' => 'Below Header' ]);

if (!is_admin()) {
  add_filter('render_block_core/cover', '_px_render_responsive_cover', 10, 2);

  add_filter('body_class', '_px_body_class_cover_below_header');
}


/**
 * Wrap the Image with <picture> and add responsive mobile image
 * 
 * @filter render_block_core/cover
 */
function _px_render_responsive_cover($content, $block) {
  // If has mobile image
  if (isset($block['attrs']['pxMobileMediaURL'])) {
    $image = $block['attrs']['pxMobileMediaURL'];

    preg_match('/<div role="img"/', $content, $is_fixed);

    $content = preg_replace(
      '/(wp-block-cover[^_].+)(">)/Ui',
      '$1 px-has-mobile-image">',
      $content
    );

    // If fixed background
    if ($is_fixed) {
      $content = preg_replace(
        '/(<div role="img".+style=".+)(">)/Ui',
        "$1;--pxMobileMediaURL:url({$image});$2",
        $content
      );
    }
    else {
      $content = preg_replace(
        '/<img class="wp-block-cover__image.+\/>/Ui',
        "<picture><source srcset='{$image}' media='(max-width:767px)'>$0</picture>",
        $content
      );
    }
  }

  // If has mobile height
  if (isset($block['attrs']['pxMobileHeight']) && $block['attrs']['pxMobileHeight'] !== '') {
    $height = $block['attrs']['pxMobileHeight'];

    preg_match('/wp-block-cover\s.+(style=).+>/Ui', $content, $has_style);

    // If already have existing style attribute
    if($has_style) {
      $content = preg_replace(
        '/(wp-block-cover\s.+)(style=".+)(".+>)/Ui',
        "$1$2;--pxMobileHeight:{$height};$3",
        $content
      );
    } else {
      $content = preg_replace(
        '/(wp-block-cover\s.+")(.*>)/Ui',
        "$1 style='--pxMobileHeight:{$height}' $2",
        $content
      );
    }
  }
  
  return $content;
}


/**
 * Add extra class if using Cover with Below Header style
 * 
 * @filter body_class
 */
function _px_body_class_cover_below_header($classes) {
  global $post;
  if (!$post) { return $classes; }

  preg_match('/wp-block-cover.+is-style-px-below-header/', $post->post_content, $matches);

  if ($matches) {
    $classes[] = 'px-has-transparent-header';
  }
  return $classes;
}