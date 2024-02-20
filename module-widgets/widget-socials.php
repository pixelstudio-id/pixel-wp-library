<?php

/**
 * Create social links
 */
class H_WidgetSocials extends H_Widget {
  function __construct() {
    parent::__construct('h_socials', __('- Socials'), [
      'description' => __('Social Media links'),
    ]);
  }

  function widget($args, $instance) {
    $fields = get_fields('widget_' . $args['widget_id']);

    $custom_render = apply_filters('px_render_widget_socials', '', $fields);
    if ($custom_render) {
      echo $args['before_widget'] . $custom_render . $args['after_widget'];
    }

    $heading = $fields['heading'] ?: '';
    $links = $this->_parse_links($fields['links']);
    $extra_classes = $this->_get_extra_classes($fields);

    // render
    echo $args['before_widget']; ?>
    <?php if ($heading): ?>
      <?= $args['before_title'] ?> <?= $heading ?> <?= $args['after_title'] ?>
    <?php endif; ?>

    <ul class="wp-block-social-links <?= $extra_classes ?>">
      <?php foreach ($links as $item): ?>
        <li class="wp-social-link <?= $item['extra_classes'] ?>">
          <a
            class="wp-block-social-link-anchor"
            href="<?= $item['link']['url'] ?>"
            target='<?= $item['link']['target'] ?>'
            rel="noopener nofollow"
          >
            <figure class="wp-block-social-link__icon">
              <?= $item['svg'] ?>
            </figure>
            <?= $item['label'] ?>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
    <?php echo $args['after_widget'];
  }

  private function _parse_links($links) {
    $links = array_map(function($item) {
      $name = $item['icon'];

      $item['svg'] = $name === 'custom'
        ? $item['svg_code']
        : H::get_social_icon($name)['svg'];

      $item['extra_classes'] = "wp-block-social-link wp-social-link-{$name}";

      // if link is totally empty
      if (!is_array($item['link'])) {
        $item['link'] = [
          'url' => '',
          'target' => '',
          'title' => '',
        ];
      }

      // create label from link title
      $label = $item['link']['title'] ?? '';
      if ($label) {
        $item['label'] = H::markdown($label);
        $item['extra_classes'] .= ' has-label ';
      } else {
        $item['label'] = '';
      }

      return $item;
    }, $links);

    return $links;
  }
  
  private function _get_extra_classes($fields) {
    $style_class = $fields['link_style'] === 'default'
      ? ''
      : "is-style-{$fields['link_style']}";
    $color_class = $fields['color']
      ? "has-{$fields['color']}-color"
      : '';
    $size_class = $fields['size'] === 'normal'
      ? ''
      : "has-{$fields['size']}-icon-size";
    $orientation_class = $fields['orientation'] === 'horizontal'
      ? ''
      : "is-orientation-{$fields['orientation']}";
    
    return "$style_class $color_class $size_class $orientation_class";
  }
}