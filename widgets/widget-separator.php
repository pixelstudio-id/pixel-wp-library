<?php

/**
 * Create a separate div for the next set of widgets.
 * 
 * In Header, it will divide the widgets into left / center / right position.
 * In Footer, it will divide them into equal sized div.
 */
class H_WidgetSeparator extends H_Widget { 
  function __construct() {
    parent::__construct('h_separator', __('-----'), [
      'description' => __('Split the widgets')
    ]);
  }

  public function widget($args, $instance) {
    $fields = get_fields('widget_' . $args['widget_id']);
    $size = $fields['footer_size'] ?: 'auto';
    $style = '';
  
    if ($size !== 'auto') {
      $style = "style='--columnSize:{$size}'";
    }

    ?>
      </ul><ul class="widget-column" <?= $style ?>>
    <?php
  }
}