<?php

add_action('enqueue_block_editor_assets', 'px_localize_icon_prefix_vars', 150);

add_filter('render_block_core/heading', 'px_add_icon_to_block', 10, 2);
add_filter('render_block_core/list-item', 'px_add_icon_to_block', 10, 2);
add_filter('render_block_core/button', 'px_add_icon_to_block', 10, 2);

/**
 * This function is disabled because we're reusing the vars from h-icon
 * 
 * @action enqueue_block_editor_assets
 */
function px_localize_icon_prefix_vars() {
  $support = get_theme_support('px-icon-block') ?: get_theme_support('h-icon-block');
  $version = $support[0] ?? 'v7';
  $cdn_url = "https://cdn.pixelstudio.id/h-block-icon-{$version}";

  $fontawesome_urls = [
    'v5' => 'https://fontawesome.com/v5/search?m=free&s=solid',
    'v6' => 'https://fontawesome.com/v6/search?f=classic&s=solid&o=r',
    'v6-regular' => 'https://fontawesome.com/v6/search?f=classic&s=regular&o=r',
    'v6-light' => 'https://fontawesome.com/v6/search?f=classic&s=light&o=r',
    'v6-thin' => 'https://fontawesome.com/v6/search?f=classic&s=thin&o=r',
    'v6-duotone' => 'https://fontawesome.com/v6/search?f=duotone&s=solid&o=r',
    'v7' => 'https://fontawesome.com/v7/search?ip=classic&s=solid',
    'v7-regular' => 'https://fontawesome.com/v7/search?ip=classic&s=regular',
    'v7-light' => 'https://fontawesome.com/v7/search?ip=classic&s=light',
    'v7-duotone' => 'https://fontawesome.com/v7/search?ip=duotone&s=solid',
  ];
  $fontawesome_url = $fontawesome_urls[$version] ?? $fontawesome_urls['v5'];

  wp_localize_script('px-gutenberg', 'pxIconPrefix', [
    'cdnURL' => $cdn_url,
    'fontawesomeURL' => $fontawesome_url,
  ]);
}

/**
 * Add the icon as CSS variable to the heading block
 * 
 * @filter render_block_core/heading
 */
function px_add_icon_to_block($content, $block) {
  if (is_admin() || empty($block['attrs']['pxIconUri'])) { return $content; }

  $processor = new WP_HTML_Tag_Processor($content);
  if ($processor->next_tag()) {
    $icon = $block['attrs']['pxIconUri'];
    $iconColor = esc_attr($block['attrs']['pxIconColor'] ?? '');
    $iconBg = esc_attr($block['attrs']['pxIconBg'] ?? '');

    $style = $processor->get_attribute('style');
    $style = $style ? rtrim($style, ';') . ';' : '';
    $style .= "--pxIcon:url(\"{$icon}\");";

    if ($iconColor) {
      $style .= "--pxIconColor:{$iconColor};";
    }
    if ($iconBg) {
      $style .= "--pxIconBg:{$iconBg};";
    }

    $processor->set_attribute('style', $style);

    // if has pxIconPosition, add class px-icon-position-{value}
    $position = $block['attrs']['pxIconPosition'] ?? '';
    if ($position && $position !== 'left') {
      $class = $processor->get_attribute('class');
      $class = $class ? rtrim($class, ' ') . ' ' : '';
      $class .= "is-icon-position-{$position}";
      $processor->set_attribute('class', $class);
    }

    $updated_content = $processor->get_updated_html();

    // add <i> before text if not core/button block
    if ($block['blockName'] !== 'core/button') {
      $pos = strpos($updated_content, '>');
      if ($pos !== false) {
        $updated_content = substr_replace(
          $updated_content, '><i></i>', $pos, 1
        );
      }
    }

    return $updated_content;
  }

  return $content;
}