<?php
/**
 * This is a template to create new widget
 */
class PX_WidgetName extends PX_Widget { 
  function __construct() {
    parent::__construct('px_name', __('- Name'), [
      'description' => __('Short description here')
    ]);
  }

  function widget($args, $instance) {
    $fields = get_fields('widget_' . $args['widget_id']);

    $custom_render = apply_filters('px_render_widget_name', '', $fields);
    if ($custom_render) {
      echo $args['before_widget'] . $custom_render . $args['after_widget'];
    }

    $acf_field = $fields['acf_field'] ?: 'Default value';

    // render
    echo $args['before_widget']; ?>
    <div>
      <?= $acf_field ?>
    </div>
    <?php echo $args['after_widget'];
  }
}