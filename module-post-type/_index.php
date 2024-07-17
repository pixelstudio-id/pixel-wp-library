<?php

/**
 * Register Custom Post Type (CPT)
 * 
 * @deprecated 6.2.0 - Use ACF instead
 */
function h_register_post_type(string $post_type, array $args = []) {
  require_once __DIR__ . '/post-type.php';

  $pt = new H_PostType($post_type, $args);
  $pt->register();
}

/**
 * Register Custom Taxonomy
 * 
 * @deprecated 6.2.0 - Use ACF instead
 */
function h_register_taxonomy(string $taxonomy, string $post_type, array $args) {
  require_once __DIR__ . '/taxonomy.php';
  require_once __DIR__ . '/post-filter.php';

  $tx = new H_Taxonomy($taxonomy, $post_type, $args);
  $tx->register();
}


//// POST TABLE

/**
 * Override all columns in the Post Type table with this one.
 * 
 * H::edit_post_columns()
 */
function h_edit_post_columns(string $post_type, array $columns) {
  if (!is_admin()) { return; }
  require_once __DIR__ . '/post-column.php';

  $pc = new H_PostColumn($post_type, $columns);
  $pc->edit_columns();
}

/**
 * Alias for h_edit_post_columns
 */
function h_override_columns(string $post_type, array $columns) {
  h_edit_post_columns($post_type, $columns);
}
function h_register_columns(string $post_type, array $columns) {
  h_override_columns($post_type, $columns);
}

/**
 * Create a WP_List_Table object
 * 
 * @return WP_List_Table - call display() function to echo it
 */
function h_create_list_table($args) {
  require_once __DIR__ . '/list-table.php';

  $table = new H_List_Table($args);
  $table->prepare_items();
  return $table;
}

/**
 * Edit the columns in taxonomy table
 * 
 * H::edit_taxonomy_columns
 */
function h_edit_taxonomy_columns(string $name, array $columns) {
  if (!is_admin()) { return; }

  require_once __DIR__ . '/taxonomy-column.php';

  $tc = new H_TaxonomyColumn($name, $columns);
  $tc->edit_columns();
}