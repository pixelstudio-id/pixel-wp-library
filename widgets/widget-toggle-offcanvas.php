<?php

/**
 * 
 */
class H_WidgetToggleOffcanvas extends H_Widget { 
  function __construct() {
    parent::__construct('h_toggle', __('- Offcanvas Toggle'), [
      'description' => __('Button to open Offcanvas')
    ]);
  }

  function widget($args, $instance) {
    $fields = get_fields('widget_' . $args['widget_id']);

    $custom_render = apply_filters('px_render_widget_toggle', '', $fields);
    if ($custom_render) {
      echo $args['before_widget'] . $custom_render . $args['after_widget'];
    }

    $label = $fields['label'] ?: 'MENU';
    $icon = "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='27' viewBox='0 0 448 512'><path d=\"M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z\"/></svg>";

    // render
    echo $args['before_widget']; ?>
    <a href="#menu">
      <?= $icon ?>
      <?php if ($label): ?>
        <span><?= $label ?></span>
      <?php endif; ?>
    </a>
    <?php echo $args['after_widget'];
  }
}