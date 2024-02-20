<?php

/**
 * Show the logo that is set in Customizer or allow overriding with own image.
 */
class H_WidgetLogo extends H_Widget { 
  function __construct() {
    parent::__construct('h_logo', __('- Logo'), [
      'description' => __('Show logo from Customizer')
    ]);
  }

  function widget($args, $instance) {
    $fields = get_fields('widget_' . $args['widget_id']);

    $custom_render = apply_filters('px_render_widget_logo', '', $fields);
    if ($custom_render) {
      echo $args['before_widget'] . $custom_render . $args['after_widget'];
    }

    $logo = $fields['logo'] ? $fields['logo']['sizes']['medium'] : null;
    $logo_alt = isset($fields['logo_alt']) && $fields['logo_alt'] ? $fields['logo_alt']['sizes']['medium'] : null;
    $tagline = $fields['tagline'] ?? null;

    // if logo is empty, use the logo from Customizer
    if (!$logo) {
      $default_logo_id = get_theme_mod('custom_logo');
      $logo = wp_get_attachment_image_url($default_logo_id, 'medium');
    }

    // render
    echo $args['before_widget']; ?>
    <div class="wp-block-site-logo">
      <a
        href="<?= get_home_url() ?>"
        class='custom-logo-link'
        rel="home"
      >
        <?php if ($logo_alt): ?>
          <img loading="lazy" class="wp-block-site-logo__alt" src="<?= $logo_alt ?>">
        <?php endif; ?>
        <img loading="lazy" src="<?= $logo ?>">
      </a>
      <?php if ($tagline): ?>
        <span>
          <?= $tagline ?>
        </span>
      <?php endif; ?>
    </div>
    <?php echo $args['after_widget'];
  }
}