<?php
/**
 * Buttons widget
 * 
 * @since 9.2.0 - Replacing Button widget
 */
class H_WidgetButtons extends H_Widget { 
  function __construct() {
    parent::__construct('h_buttons', __('- Buttons'), [
      'description' => __('Create multiple buttons')
    ]);
  }

  function widget($args, $instance) {
    $fields = get_fields('widget_' . $args['widget_id']);

    $custom_render = apply_filters('px_render_widget_buttons', '', $fields);
    if ($custom_render) {
      echo $args['before_widget'] . $custom_render . $args['after_widget'];
    }

    $addon = $fields['addon'] ?: '';
    $buttons = $fields['buttons'] ?: [];

    // render
    echo $args['before_widget']; ?>
    <div class="wp-block-buttons">
      <?php foreach ($buttons as $b): ?>
      <div class="wp-block-button is-style-<?= $b['style'] ?> <?= $addon ?>">
        <a
          class="wp-block-button__link"
          href="<?= $b['link']['url'] ?>"
          target="<?= $b['link']['target'] ?>"
        >
          <?php if ($b['svg_icon']): ?>
            <?= $b['svg_icon'] ?>

          <?php elseif($b['image']): ?>
            <img src="<?= $b['image']['sizes']['thumbnail'] ?>">
          <?php endif; ?>

          <?php if ($b['link']['title']): ?>
            <span>
              <?= $b['link']['title'] ?>
            </span>
          <?php endif; ?>
        </a>
      </div>
      <?php endforeach; ?>
    </div>

    <?php echo $args['after_widget'];
  }
}