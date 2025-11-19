<?php

if (!is_admin()) {
  add_filter('render_block_core/spacer', '_px_render_negative_spacer', 10, 2);

  add_filter('render_block_core/group', '_px_render_group_alignment', 5, 2);
  // add_filter('render_block_core/group', '_px_render_group_inner_container_for_flex', 6, 2);
  add_filter('render_block_core/buttons', '_px_render_buttons_alignment', 5, 2);
}

/**
 * Add back the Group's inner container if using layout flex
 * 
 * @filter render_block_core/group
 */
function _px_render_group_inner_container_for_flex($content, $block) {
  // Abort if still the old group
  // preg_match('/^<\w+\sclass="wp-block-group.+><\w+\sclass="wp-block-group__inner-container/Uis', trim($content), $is_old_group);
  $is_old_group = (strpos($content, '$<\w+ class="wp-block-group.+><\w+ class="wp-block-group__inner-container'));
  if ($is_old_group) { return $content; }

  $content = preg_replace(
    '/(wp-block-group\sis-layout-flex.+>)(.+)(<\/\w+>$)/Uis',
    '$1<div class="wp-block-group__inner-container">$2</div>$3',
    $content,
  );
  return $content;
}


/**
 * Modify the height into margin-bottom
 * 
 * @filter render_block_core/spacer
 * @deprecated - Use negative margin instead
 */
function _px_render_negative_spacer($content, $block) {
  $is_negative = isset($block['attrs']['className'])
    && preg_match('/is-style-px-negative/', $block['attrs']['className']);

  if ($is_negative) {
    $content = preg_replace('/height:(\d+)/', 'margin-bottom:-$1', $content);
  }
  return $content;
}


/**
 * Add back the Group's inner container missing from WP 5.9
 * 
 * @filter render_block_core/group
 */
function _px_render_group_alignment($content, $block) {
  $extra_classes = '';

  // Add Row Variation class
  $layout_type = $block['attrs']['layout']['type'] ?? '';
  if ($layout_type) {
    $extra_classes .= "is-layout-{$layout_type} ";
  }

  $wrap = $block['attrs']['layout']['flexWrap'] ?? '';
  if ($wrap === 'nowrap') {
    $extra_classes .= 'is-nowrap ';
  }
  
  $justify = $block['attrs']['layout']['justifyContent'] ?? '';
  if ($justify) {
    $extra_classes .= "is-content-justification-{$justify} ";
  }

  $valign = $block['attrs']['layout']['verticalAlignment'] ?? '';
  if ($valign) {
    $extra_classes .= "is-vertically-aligned-{$valign}";
  }

  if ($extra_classes) {
    $content = preg_replace(
      '/^.<div class="wp-block-group/Uis',
      "$0 {$extra_classes} ",
      $content
    );
  }
  

  // Add back inner-container
  // $content = preg_replace(
  //   '/(wp-block-group.+>)(.+)(<\/div>$)/Uis',
  //   '$1<div class="wp-block-group__inner-container">$2</div>$3',
  //   $content,
  // );

  return $content;
}

/**
 * Add back the missing Buttons alignment class from WP 5.9
 * 
 * @filter render_block_core/buttons
 */
function _px_render_buttons_alignment($content, $block) {
  // Abort if still the old buttons
  if (strpos($content, 'is-content-justification-')) { return $content; }

  $extra_classes = '';

  $justify = $block['attrs']['layout']['justifyContent'] ?? false;
  if ($justify) {
    $extra_classes .= "is-content-justification-{$justify} ";
  }
  
  $is_vertical = isset($block['attrs']['layout']['orientation'])
    && $block['attrs']['layout']['orientation'] === 'vertical';
  if ($is_vertical) {
    $extra_classes .= 'is-vertical ';
  }

  if ($extra_classes) {
    $content = preg_replace(
      '/class="wp-block-buttons/',
      "$0 {$extra_classes} ",
      $content
    );
  }

  return $content;
}