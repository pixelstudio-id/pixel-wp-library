<?php
_px_register_icon_block();

/**
 * Register a custom ICON block
 */
function _px_register_icon_block() {
  wp_register_script('px-icon', PX_DIST . '/px-icon.js', [ 'wp-blocks', 'wp-dom' ] , PX_VERSION, true);
  wp_register_style('px-icon', PX_DIST . '/px-icon.css', [ 'wp-edit-blocks' ], PX_VERSION);

  $support = get_theme_support('px-icon-block');
  $version = $support[0] ?? 'v5';
  $url = "https://cdn.pixelstudio.id/h-block-icon-{$version}";

  $fontawesome_urls = [
    'v5' => 'https://fontawesome.com/v5/search?m=free&s=solid',
    'v6' => 'https://fontawesome.com/search?o=r&s=solid&ip=classic',
    'v6-regular' => 'https://fontawesome.com/search?ip=classic&s=regular&o=r',
    'v6-thin' => 'https://fontawesome.com/search?o=r&s=thin&ip=classic',
    'v6-duotone' => 'https://fontawesome.com/search?o=r&s=solid&ip=duotone',
  ];
  $fontawesome_url = $fontawesome_urls[$version] ?? $fornawesome_urls['v5'];

  wp_localize_script('px-icon', 'pxLocalizeIcon', [
    'iconURL' => $url,
    'fontawesomeURL' => $fontawesome_url,
  ]);

  register_block_type(__DIR__);
}