<?php
_px_register_icon_block();

/**
 * Register a custom ICON block
 */
function _px_register_icon_block() {
  wp_register_script('px-icon', PX_DIST . '/px-icon.js', [ 'wp-blocks', 'wp-dom' ] , PX_VERSION, true);
  wp_register_style('px-icon', PX_DIST . '/px-icon.css', [ 'wp-edit-blocks' ], PX_VERSION);

  $args = get_theme_support('px-icon-block')[0];

  $search_urls = [
    'v5' => 'https://fontawesome.com/v5/search?m=free&s=solid',
    'v6' => 'https://fontawesome.com/v6/search?o=r&s=solid&ip=classic',
    'v6-regular' => 'https://fontawesome.com/v6/search?ip=classic&s=regular&o=r',
    'v6-thin' => 'https://fontawesome.com/v6/search?o=r&s=thin&ip=classic',
    'v6-duotone' => 'https://fontawesome.com/v6/search?o=r&s=solid&ip=duotone',
    'v7' => 'https://fontawesome.com/v7/search?o=r&s=solid&ip=classic',
    'v7-regular' => 'https://fontawesome.com/v7/search?ip=classic&s=regular&o=r',
    'v7-thin' => 'https://fontawesome.com/v7/search?o=r&s=thin&ip=classic',
    'v7-duotone' => 'https://fontawesome.com/v7/search?o=r&s=solid&ip=duotone',
  ];

  if (is_array($args)) {
    $version = $args['version'] ?? 'v6';
    $search_url = $args['search_url'] ?? $search_urls[$version] ?? $search_urls['v6'];
  } else {
    $version = $args ?? 'v5';
    $search_url = $search_urls[$version] ?? $search_urls['v6'];
  }

  $url = "https://cdn.pixelstudio.id/h-block-icon-{$version}";

  wp_localize_script('px-icon', 'pxLocalizeIcon', [
    'iconURL' => $url,
    'searchURL' => $search_url,
  ]);

  register_block_type(__DIR__);
}