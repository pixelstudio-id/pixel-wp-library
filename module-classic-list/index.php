<?php
// @deprecated - having nested list item is beneficial

// add_action('enqueue_block_editor_assets', 'px_classic_list_editor_assets', 100);

function px_classic_list_editor_assets() {
  if (!function_exists('register_block_type')) { return; } // Abort if Gutenberg not exist

  wp_register_script('px-block-list', PX_DIST . '/px-block-list.js', [ 'wp-blocks', 'wp-dom' ] , PX_VERSION, true);
  wp_register_style('px-block-list', PX_DIST . '/px-block-list.css', [ 'wp-edit-blocks' ], PX_VERSION);

  wp_enqueue_style('px-block-list');
  wp_enqueue_script('px-block-list');
};