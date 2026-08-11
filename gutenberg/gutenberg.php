<?php

require_once __DIR__ . '/_core/_index.php';

require_once __DIR__ . '/cover-mobile/cover-mobile.php';
require_once __DIR__ . '/gallery-slider/gallery-slider.php';
require_once __DIR__ . '/spacer-negative/spacer-negative.php';
require_once __DIR__ . '/file-download-button/file-download-button.php';
require_once __DIR__ . '/px-icon-prefix/px-icon-prefix.php';

if (is_admin()) {
  add_filter('safe_style_css', '_px_gutenberg_safe_style');

  add_action('enqueue_block_editor_assets', '_px_enqueue_editor', 20);
  add_filter('block_editor_settings_all', '_px_disable_inspector_tabs');
  
  add_action('admin_menu', '_px_remove_gutenberg_menu', 999);
  add_action('init', '_px_unregister_template_cpt');
} else {
  // remove group container class
  remove_filter('render_block', 'wp_render_layout_support_flag', 10, 2);
  remove_filter('render_block', 'gutenberg_render_layout_support_flag', 10, 2);

  // remove the SVG gradient
  remove_action('wp_body_open', 'wp_global_styles_render_svg_filters', 10);
  add_action('wp_footer', '_px_disable_gutenberg_support_css');

  // remove wp 6.9 separate block assets
  add_filter('should_load_separate_core_block_assets', '__return_false', 99);
}

/**
 * @action admin_menu
 */
function _px_remove_gutenberg_menu() {
  remove_menu_page('gutenberg');
}

/**
 * Disable the 6.4 Template post type
 * 
 * @action init
 */
function _px_unregister_template_cpt() {
  unregister_post_type('wp_template');
  unregister_post_type('wp_template_part');
}

/**
 * Allow this CSS Var to be saved in database
 * 
 * @filter safe_style_css
 */
function _px_gutenberg_safe_style($attr) {
  $attr[] = '--textColor';
  $attr[] = '--bgColor';
  $attr[] = '--iconColor';
  $attr[] = '--faqTitleBg';
  $attr[] = '--faqTitleColor';
  return $attr;
}


/**
 * @action enqueue_block_editor_assets 20
 */
function _px_enqueue_editor() {
  $disallowed_blocks = apply_filters('px_disallowed_blocks', []);

  // if empty, check legacy filter
  if (empty($disallowed_blocks)) {
    $disallowed_blocks = apply_filters('h_disallowed_blocks', []);
  }

  wp_enqueue_style('px-gutenberg', PX_DIST . '/px-gutenberg.css', [], PX_VERSION);
  wp_enqueue_script('px-gutenberg', PX_DIST . '/px-gutenberg.js', [], PX_VERSION, true);
  wp_localize_script('px-gutenberg', 'localizePx', [
    'disallowedBlocks' => $disallowed_blocks
  ]);

  wp_localize_script('px-gutenberg', 'pxApiSettings', [
    'nonce' => wp_create_nonce('wp_rest'),
    'pxUrl' => esc_url_raw(rest_url()) . MY_NAMESPACE,
    'wpUrl' => esc_url_raw(rest_url()) . 'wp/v2',
  ]);
}

/**
 * Disable Inspector Tabs in all blocks
 * 
 * @filter block_editor_settings_all
 */
function _px_disable_inspector_tabs($settings) {
  $settings['blockInspectorTabs'] = [
    'default' => false,
  ];

  return $settings;
}

/**
 * Add custom CSS to Classic Editor
 * 
 * @action admin_init
 */
function _px_enqueue_classic_editor() {
  $assets = plugin_dir_url(__FILE__) . 'css';
  add_editor_style(PX_DIST . '/px-classic-editor.css');
}

/**
 * Disable Support CSS
 * 
 * @action wp_footer
 */
function _px_disable_gutenberg_support_css() {
  wp_dequeue_style('core-block-supports');
}