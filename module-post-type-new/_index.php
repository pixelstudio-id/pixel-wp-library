<?php

//// POST TABLE

/**
 * Override the posts columns
 */
function px_override_post_columns($post_type, $columns) {
  require_once __DIR__ . '/table-columns.php';
  new PxTableColumns($post_type, 'post', $columns);
}

/**
 * Override the taxonomy columns
 */
function px_override_taxonomy_columns($taxonomy_name, $columns) {
  require_once __DIR__ . '/table-columns.php';
  $tc = new PxTableColumns($taxonomy_name, 'taxonomy', $columns);
}