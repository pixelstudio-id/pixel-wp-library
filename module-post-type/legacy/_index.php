<?php

/**
 *
 */
function h_register_post_type(string $post_type, array $args = []) {
  require_once __DIR__ . '/post-type.php';
  $pt = new H_PostType($post_type, $args);
  $pt->register();
}

/**
 * 
 */
function h_register_taxonomy(string $taxonomy, string $post_type, array $args) {
  require_once __DIR__ . '/taxonomy.php';
  require_once __DIR__ . '/post-filter.php';
  $tx = new H_Taxonomy($taxonomy, $post_type, $args);
  $tx->register();
}


//// POST TABLE

/**
 * Override the posts columns
 */
function h_override_post_columns($post_type, $columns) {
  if (!is_admin()) { return; }

  require_once __DIR__ . '/post-column.php';
  $pc = new H_PostColumn($post_type, $columns);
  $pc->edit_columns();
}

/**
 * Aliases of h_override_post_columns()
 */
function h_edit_post_columns(string $post_type, array $columns) {
  h_override_post_columns($post_type, $columns);
}
function h_override_columns(string $post_type, array $columns) {
  h_override_post_columns($post_type, $columns);
}
function h_register_columns(string $post_type, array $columns) {
  h_override_post_columns($post_type, $columns);
}

/**
 * Override the taxonomy columns
 */
function h_override_taxonomy_columns($taxonomy_name, $columns) {
  if (!is_admin()) { return; }

  require_once __DIR__ . '/taxonomy-column.php';
  $tc = new H_TaxonomyColumn($taxonomy_name, $columns);
  $tc->edit_columns();
}

/**
 * 
 */
function h_edit_taxonomy_columns(string $name, array $columns) {
  h_override_taxonomy_columns($name, $columns);
}