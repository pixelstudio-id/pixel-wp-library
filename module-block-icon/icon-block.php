<?php
_px_register_icon_block();

/**
 * Register a custom ICON block
 */
function _px_register_icon_block() {
  wp_register_script('px-icon', PX_DIST . '/px-icon.js', [ 'wp-blocks', 'wp-dom' ] , PX_VERSION, true);
  wp_register_style('px-icon', PX_DIST . '/px-icon.css', [ 'wp-edit-blocks' ], PX_VERSION);

  $url = PX_ICON_TYPE
    ? 'https://cdn.pixelstudio.id/h-block-icon-' . PX_ICON_TYPE
    : 'https://cdn.pixelstudio.id/h-block-icon';

  wp_localize_script('px-icon', 'pxLocalizeIcon', [
    'iconURL' => $url,
  ]);

  register_block_type(__DIR__ . '/src');
}