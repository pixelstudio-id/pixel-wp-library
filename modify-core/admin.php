<?php if (!defined('ABSPATH')) { exit; }
/**
 * Modify settings for Admin panel
 */

add_action('admin_menu', '_px_add_reusable_blocks_menu', 10);
add_filter('wp_terms_checklist_args', '_h_fixed_position_on_term_checkboxes', 1, 2);

/**
 * Add a shortcut to Reusable Blocks in the admin menu
 * 
 * @action admin_menu
 */
function _px_add_reusable_blocks_menu() {
  add_submenu_page(
    'edit.php?post_type=page',
    'Reusable Blocks',
    'Reusable Blocks',
    'edit_posts',
    'edit.php?post_type=wp_block'
  );
}

/**
 * Prevent reordering of Category checklist
 * @filter wp_terms_checklist_args
 */
function _h_fixed_position_on_term_checkboxes($args, $post_id) {
  $args['checked_ontop'] = false;
  return $args;
}