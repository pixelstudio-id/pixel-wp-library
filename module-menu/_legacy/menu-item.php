<?php

add_filter('nav_menu_item_attributes', '_h_remove_id_in_menu_item', 100, 3);
add_filter('wp_nav_menu_objects', '_h_mega_menu_classes', 100);
add_filter('wp_nav_menu_objects', '_h_menu_item_classes', 101);

/**
 * @filter nav_menu_item_attributes
 */
function _h_remove_id_in_menu_item($li_atts, $menu_item, $args) {
  unset($li_atts['id']);
  return $li_atts;
}

/**
 * Add classes to menu-item that's related to mega menu
 * 
 * @filter wp_nav_menu_objects 100
 */
function _h_mega_menu_classes($items) {
  $mega_menu_ids = []; // used to check whether a children is under mega menu or not

  foreach ($items as &$i) {
    // If parent item, check for mega menu ACF field
    if ($i->menu_item_parent === '0') {
      $columns = get_field('mega_menu', $i);
      $alignment = get_field('mega_menu_alignment', $i);

      if ($columns) {
        $i->classes[] = "menu-item-has-megamenu";
        $i->classes[] = "has-{$columns}-columns";
        $i->classes[] = "is-align-{$alignment}";
        $mega_menu_ids[] = $i->ID;
      }

      continue;
    }
    // Add special class if it's under mega menu
    elseif (in_array($i->menu_item_parent, $mega_menu_ids)) {
      $i->classes[] = 'megamenu__column';

      // remove unnecessary class
      $key = array_search('menu-item', $i->classes);
      $key2 = array_search('menu-item-has-children', $i->classes);
      
      if ($key) {
        $i->classes[$key] = '';
      }
      if ($key2) {
        $i->classes[$key2] = '';
      }
    }
  }

  return $items;
}

/**
 * Change the Menu Item markup
 * 
 * @filter wp_nav_menu_objects 101
 */
function _h_menu_item_classes($items) {
  foreach ($items as &$i) {
    // remove the "menu-item-type-xxx" and "menu-item-object-xxx" class
    $i->classes[2] = '';
    $i->classes[3] = '';

    // if has shortcode
    preg_match('/\[(.+)\]/', $i->title, $matches);
    if (isset($matches[1]) && shortcode_exists($matches[1])) {
      $i->classes[] = 'menu-item-has-shortcode';
      $i->title = '</a>' . do_shortcode($i->title) . '<a>';
      continue;
    }

    // If title is "-", add empty class so it can be hidden
    if ($i->title === '-') {
      $i->title = '&nbsp;';
      $i->classes[] = 'menu-item-empty-title';
    }

    // If a child item, change the "menu-item" class into "submenu-item"
    $is_child = $i->menu_item_parent !== '0' && $i->classes[1] === 'menu-item';
    if ($is_child) {
      $key = array_search('menu-item', $i->classes);
      
      if ($key) {
        $i->classes[$key] = 'submenu-item';
      }
    }

    // Add style as extra class
    $styles = get_field('style', $i);
    
    if (is_array($styles)) {
      foreach ($styles as $s) {
        $i->classes[] = "menu-item-$s";
      }

      // Check for background
      if (in_array('has-background', $styles)) {
        $bg_color = get_field('background_color', $i);
        $i->classes[] = "menu-background-{$bg_color}";
      }
    }

    // Render it
    $i->title = _h_render_menu_item($i, $styles);
  }

  return $items;
}

/**
 * Change the markup of the menu item
 * 
 * @param Object $i - menu item object
 * @param array $styles
 * 
 * @return string - the HTML markup of the menu item
 */
function _h_render_menu_item($i, $styles) {
  $title = $i->title;
  $description = H::markdown($i->post_content, true);
  $image_tag = '';

  if (is_array($styles)) {
    // Check for icon
    if (in_array('has-icon', $styles)) {
      $icon = get_field('icon', $i);

      if ($icon) {
        $src = $icon['sizes']['thumbnail'];
        $image_tag = "<img src='{$src}' loading='lazy'>";
      }
    }

    // Check for image
    if (in_array('has-image', $styles)) {
      $image = get_field('image', $i);
      if ($image) {
        $src = $image['sizes']['medium'];
        $alt = $image['alt'];
        $image_tag = "<img src='{$src}' alt='{$alt}' loading='lazy'>";
      }
    }
  }

  $custom_render = apply_filters('h_menu_item', '', [
    'title' => $title,
    'description' => $description,
    'image_tag' => $image_tag
  ]);

  if ($custom_render) {
    return $custom_render;
  }

  ob_start(); ?>
    <?= $image_tag ?>
    <?php if ($description): ?>
      <dt>
        <?= $title ?>
      </dt>
      <dd>
        <?= $description ?>
      </dd>
    <?php else: ?>
      <?= $title ?>
    <?php endif; ?>
  <?php

  return ob_get_clean();
}