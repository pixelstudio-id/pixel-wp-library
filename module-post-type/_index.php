<?php

/**
 * Register Custom Post Type (CPT)
 */
function px_register_post_type(string $post_type, array $args = []) {
  require_once __DIR__ . '/post-type.php';
  $pt = new PxPostType($post_type, $args);
  $pt->register();
}

/**
 * Register Custom Taxonomy
 */
function px_register_taxonomy(string $taxonomy, string $post_type, array $args) {
  require_once __DIR__ . '/taxonomy.php';
  require_once __DIR__ . '/post-filter.php';
  $tx = new PxTaxonomy($taxonomy, $post_type, $args);
  $tx->register();
}

/**
 * Override the posts columns
 */
function px_override_post_columns($post_type, $columns) {
  if (!is_admin()) { return; }

  require_once __DIR__ . '/table-columns.php';
  new PxTableColumns($post_type, $columns, 'post');
}

/**
 * Override the taxonomy columns
 */
function px_override_taxonomy_columns($taxonomy_name, $columns) {
  if (!is_admin()) { return; }

  require_once __DIR__ . '/table-columns.php';
  $tc = new PxTableColumns($taxonomy_name, $columns, 'taxonomy');
}

///// ALIAS

function h_register_post_type(string $post_type, array $args = []) {
  px_register_post_type($post_type, $args);
}

function h_register_taxonomy(string $taxonomy, string $post_type, array $args) {
  px_register_taxonomy($taxonomy, $post_type, $args);
}

function h_override_post_columns($post_type, $columns) {
  px_override_post_columns($post_type, $columns);
}

function h_override_columns($post_type, $columns) {
  px_override_post_columns($post_type, $columns);
}

function h_override_taxonomy_columns($taxonomy_name, $columns) {
  px_override_taxonomy_columns($taxonomy_name, $columns);
}