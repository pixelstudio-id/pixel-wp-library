<?php

add_filter('nav_menu_submenu_css_class', '_h_submenu_classes', 10, 3);
add_filter('wp_nav_menu', '_h_submenu_style_classes', 10);

/**
 * Add depth to the submenu class
 * 
 * @filter nav_menu_submenu_css_class
 */
function _h_submenu_classes($classes, $args, $depth) {
  // shorten the sub-menu class
  if ($classes[0] === 'sub-menu') {
    $classes[0] = 'submenu';
  }

  $depth += 1;
  $classes[] = "submenu-depth-{$depth}";
  return $classes;
}

/**
 * Change the "submenu" class to fit better for MegaMenu / Horizontal usage
 */
function _h_submenu_style_classes($menu) {
  // replace "submenu submenu-depth-1" into "megamenu"
  // print_r('<pre>' . htmlspecialchars($menu) . '</pre>', false);
  $menu = preg_replace('/(menu-item-has-megamenu.+)(submenu\ssubmenu-depth-1)/Uims', '$1megamenu', $menu);
  $menu = preg_replace('/(megamenu__column.+)(class="submenu.+")/Uims', '$1', $menu);

  // move the columns class from <li> to the submenu
  // $menu = preg_replace('/(has-columns-\d+)(.+)(submenu.+)"/Uis', '$2$3 $1"', $menu);
  // $menu = preg_replace('/(is-align-\w+)\s(.+)(submenu.+)"/Uis', '$2$3 $1"', $menu);
  return $menu;
}