<?php

add_action('widgets_init', '_px_register_widgets_dark_toggle');
add_filter('acf/settings/load_json', '_px_fields_for_widgets_dark_toggle', 20);
add_action('wp_enqueue_scripts', '_px_enqueue_dark_mode_assets');

/**
 * @action widgets_init
 */
function _px_register_widgets_dark_toggle() {
  register_widget('PX_WidgetDarkToggle');
}

/**
 * @filter acf/settings/load_json 20
 */
function _px_fields_for_widgets_dark_toggle($paths) {
  $paths[] = plugin_dir_path(__FILE__) . '/acf-json';
  return $paths;
}

/**
 * @action wp_enqueue_scripts
 */
function _px_enqueue_dark_mode_assets() {
  if (!is_active_widget(false, false, 'px_dark_toggle')) { return; }

  wp_enqueue_script('px-dark-mode-head', PX_DIST . '/px-dark-mode-head.js', [], PX_VERSION);

  wp_enqueue_style('px-dark-mode', PX_DIST . '/px-dark-mode.css', [], PX_VERSION);
  wp_enqueue_script('px-dark-mode', PX_DIST . '/px-dark-mode.js', [], PX_VERSION, true);
}

/**
 * Create a dark mode toggle
 */
class PX_WidgetDarkToggle extends WP_Widget { 
  function __construct() {
    parent::__construct('px_dark_toggle', __('- Dark Mode Toggle'), [
      'description' => __('Switch between dark/light mode')
    ]);
  }

  function widget($args, $instance) {
    $widget_id = 'widget_' . $args['widget_id'];
    $data = [
      'widget_id' => $widget_id,
      'style' => get_field('style', $widget_id),
      'label_light' => '',
      'label_dark' => '',
    ];

    if ($data['style'] === 'has-label') {
      $label_light = get_field('label_light', $widget_id);
      $label_dark = get_field('label_dark', $widget_id);

      $data['label_light'] = $label_light ? $label_light : 'Light';
      $data['label_dark'] = $label_dark ? $label_dark : 'Dark';
    }

    $custom_render = apply_filters('px_widget_dark_toggle', '', $data);

    echo $args['before_widget'];
    echo $custom_render ? $custom_render : $this->render_widget($data);
    echo $args['after_widget'];
  }

  function render_widget($data) {
    [
      'style' => $style,
      'label_light' => $label_light,
      'label_dark' => $label_dark,
    ] = $data;
    ob_start(); ?>

    <label class="px-dark-toggle is-style-<?= $style ?>">
      <?php if ($label_light): ?>
        <span>
          <?= $label_light ?>
        </span>
      <?php endif; ?>

      <input type="checkbox">
      <div class="px-dark-toggle__switch" tabindex="0"></div>
      
      <?php if ($label_dark): ?>
        <span>
          <?= $label_dark ?>
        </span>
      <?php endif; ?>
    </label>

    <?php return ob_get_clean();
  }

  function form($instance) {
    // Leave empty, will be handled by ACF
  }

  function update($new_instance, $old_instance) {
    return $new_instance; // handled by ACF
  }

  function add_acf_fields() {
    acf_add_local_field_group([]);
  }
}