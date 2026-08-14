<?php

if (defined('PX_LEGACY_MODE')) {
  require_once __DIR__ . '/_legacy/menu-item.php';
  require_once __DIR__ . '/_legacy/sub-menu.php';
} else {
  require_once __DIR__ . '/menu-item.php';
  require_once __DIR__ . '/sub-menu.php';
}

add_action('after_setup_theme', function() {
  if (!current_theme_supports('px-megamenu')) { return; }

  add_action('admin_enqueue_scripts', '_px_enqueue_menu_assets', 100);
  add_filter('acf/settings/load_json', '_px_load_acf_json_menu', 20);
}, 20);

/**
 * @action admin_enqueue_scripts
 */
function _px_enqueue_menu_assets() {
  wp_enqueue_script('px-menu-admin', PX_DIST . '/px-menu-admin.js', [], PX_VERSION, true);
  wp_enqueue_style('px-menu-admin', PX_DIST . '/px-menu-admin.css', [], PX_VERSION);
}

/**
 * Allow ACF JSON to load from this directory
 * 
 * @filter acf/settings/load_json 20
 */
function _px_load_acf_json_menu($paths) {
  if (defined('PX_LEGACY_MODE')) {
    $paths[] = plugin_dir_path(__FILE__) . '/_legacy';
  } else {
    $paths[] = plugin_dir_path(__FILE__) . '/acf-json';
  }

  return $paths;
}