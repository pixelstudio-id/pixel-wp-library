<?php
  $atts = $attributes;
  $has_heading = !($atts['heading'] === '<p></p>' || $atts['heading'] === '');
  $has_description = !($atts['description'] === '<p></p>' || $atts['description'] === '');
  $has_link = isset($atts['url']) && $atts['isFullyClickable'];

  $base_classes = '';
  $base_classes .= "has-icon-position-{$atts['iconPosition']} ";
  $base_classes .= isset($atts['iconSize']) && $atts['iconSize'] !== 'medium' ? "size-{$atts['iconSize']} " : '';
  $base_classes .= $has_heading ? '' : 'has-no-heading ';
  $base_classes .= $has_description ? '' : 'has-no-description ';
  $base_classes .= isset($atts['useImage']) && $atts['useImage'] ? 'use-image ' : '';

  $wrapper_args = [
    'class' => $base_classes,
  ];

  if (isset($atts['iconColor'])) {
    $wrapper_args['style'] = "--iconColor: {$atts['iconColor']};";
  }

  if ($has_link) {
    $wrapper_args['href'] = $atts['url'];
    $wrapper_args['target'] = $atts['linkTarget'];
  }

  // Add "width" attribute to SVG if doesn't have one. This is to fix older iOS device
  preg_match('/<svg.+width.+>/Uis', $atts['iconMarkup'], $has_width);
  if (!$has_width) {
    $atts['iconMarkup'] = preg_replace('/viewBox/', 'width="100" height="100" $0', $atts['iconMarkup']);
  }

  $html_atts = get_block_wrapper_attributes($wrapper_args);
?>

<?php if ($has_link): ?>
  <a <?= $html_atts ?>>
<?php else: ?>
  <div <?= $html_atts ?>>
<?php endif; ?>

  <figure class='wp-block-px-icon__figure'>
    <?php if ($atts['useImage']): ?>
      <img src='<?= $atts['imageURL'] ?>'>
    <?php else: ?>
      <?= $atts['iconMarkup'] ?>
    <?php endif; ?>
  </figure>

  <dl class='wp-block-px-icon__content'>
    <?php if ($has_heading): ?>
      <dt>
        <?= $atts['heading'] ?>
      </dt>
    <?php endif ?>
    <?php if ($has_description): ?>
      <dd>
        <?= $atts['description'] ?>
      </dd>
    <?php endif ?>
  </dl>

<?php if ($has_link): ?>
  </a>
<?php else: ?>
  </div>
<?php endif; ?>