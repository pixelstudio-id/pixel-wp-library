<?php

require_once __DIR__ . '/core-text.php';
require_once __DIR__ . '/core-media.php';
require_once __DIR__ . '/core-design.php';
require_once __DIR__ . '/core-widget.php';

if (is_admin()) {
  add_filter('safe_style_css', '_h_gutenberg_safe_style');

  add_action('enqueue_block_editor_assets', '_h_enqueue_editor', 15);
  add_filter('block_editor_settings_all', '_h_disable_inspector_tabs');
  
  add_action('admin_init', '_h_remove_gutenberg_menu', 100);  
  add_action('init', '_h_unregister_template_cpt');
} else {
  // remove group container class
  remove_filter('render_block', 'wp_render_layout_support_flag', 10, 2);
  remove_filter('render_block', 'gutenberg_render_layout_support_flag', 10, 2);

  // remove the SVG gradient
  remove_action('wp_body_open', 'wp_global_styles_render_svg_filters', 10);
  add_action('wp_footer', '_h_disable_gutenberg_support_css');
}

/**
 * @action admin_init
 */
function _h_remove_gutenberg_menu() {
  remove_menu_page('gutenberg');
}

/**
 * Disable the 6.4 Template post type
 * 
 * @action init
 */
function _h_unregister_template_cpt() {
  unregister_post_type('wp_template');
  unregister_post_type('wp_template_part');
}

/**
 * Allow this CSS Var to be saved in database
 * 
 * @filter safe_style_css
 */
function _h_gutenberg_safe_style($attr) {
  $attr[] = '--textColor';
  $attr[] = '--bgColor';
  $attr[] = '--iconColor';
  $attr[] = '--faqTitleBg';
  $attr[] = '--faqTitleColor';
  return $attr;
}

/**
 * @action enqueue_block_editor_assets
 */
function _h_enqueue_editor() {
  $disallowed_blocks = apply_filters('h_disallowed_blocks', [
    'core/nextpage',
    'core/more',
    'core/pullquote',
  ]);

  wp_enqueue_style('h-gutenberg', PX_DIST . '/h-gutenberg.css', [], PX_VERSION);
  wp_enqueue_script('h-gutenberg', PX_DIST . '/h-gutenberg.js', [], PX_VERSION, true);
  wp_localize_script('h-gutenberg', 'localizeH', [
    'disallowedBlocks' => $disallowed_blocks
  ]);
}

/**
 * Disable Inspector Tabs
 * 
 * @filter block_editor_settings_all
 */
function _h_disable_inspector_tabs($settings) {
  $current_tab_settings = _wp_array_get($settings, ['blockInspectorTabs'], []);

  $tab_settings = apply_filters('h_blocks_disabled_tab', [
      'core/spacer',
      'core/column',
      'core/columns',
      'core/buttons',
      'core/button',
      'core/table',
      'core/group',
      'core/gallery',
      'core/image',
      'core/media-text',
      'core/list',
      'px/faq',
      'px/icon',
      'h/faq',
      'h/icon',
  ]);

  $tab_settings = array_reduce($tab_settings, function($result, $i) {
    $result[$i] = false;
    return $result;
  }, []);

  $settings['blockInspectorTabs'] = array_merge(
    $current_tab_settings,
    $tab_settings,
  );

  return $settings;
}

/**
 * Disable Support CSS
 * 
 * @action wp_footer
 */
function _h_disable_gutenberg_support_css() {
  wp_dequeue_style('core-block-supports');
}