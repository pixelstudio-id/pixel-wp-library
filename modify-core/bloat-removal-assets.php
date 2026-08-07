<?php if (!defined('ABSPATH')) { exit; }

add_action('init', function() {
  add_action('wp_default_scripts', 'px_remove_jquery_migrate');
  add_action('wp_enqueue_scripts', 'px_dequeue_dashicons_for_anons', 100);

  add_action('wp_enqueue_scripts', 'px_dequeue_public_gutenberg_assets', 20);
  add_action('admin_enqueue_scripts', 'px_dequeue_admin_gutenberg_assets', 20);
});

/**
 * Strips jquery-migrate (only needed for old themes).
 * 
 * @action wp_default_scripts
 */
function px_remove_jquery_migrate($scripts) {
  if (! is_admin() && isset($scripts->registered['jquery'])) {
    $jq = $scripts->registered['jquery'];
    if (is_array($jq->deps)) {
      $jq->deps = array_diff($jq->deps, array('jquery-migrate'));
    }
  }
}

/**
 * Dequeue dashicons for anonymous users to reduce page load.
 * 
 * @action wp_enqueue_scripts
 */
function px_dequeue_dashicons_for_anons() {
  if (!is_user_logged_in()) {
    wp_dequeue_style('dashicons');
    wp_deregister_style('dashicons');
  }
}

/**
 * Dequeue Gutenberg's public assets to not mess with custom style
 * 
 * @action wp_enqueue_scripts
 */
function px_dequeue_public_gutenberg_assets() {
  wp_deregister_style('wp-block-library');
  wp_dequeue_style('wp-block-library');

  wp_deregister_style('wp-block-library-theme');
  wp_dequeue_style('wp-block-library-theme');

  wp_deregister_style('wp-img-auto-sizes-contain');
  wp_dequeue_style('wp-img-auto-sizes-contain');

  wp_deregister_style('classic-theme-styles');
  wp_dequeue_style('classic-theme-styles');

  wp_deregister_style('global-styles');
  wp_dequeue_style('global-styles');

  wp_deregister_style('global-styles-inline');
  wp_dequeue_style('global-styles-inline');
}

/**
 * Dequeue Gutenberg's admin assets to not mess with custom style
 * 
 * @action admin_enqueue_scripts
 */
function px_dequeue_admin_gutenberg_assets() {
  wp_dequeue_style('global-styles-css-custom-properties');
}