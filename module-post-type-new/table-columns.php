<?php

add_filter('request', 'px_simplify_orderby_meta_value');

/**
 * Create custom column in the Post or Taxonomy table
 * 
 * Documentation:
 * - https://github.com/pixelstudio-id/pixel-wp-library/wiki/Custom-Post-Columns/
 * - https://github.com/pixelstudio-id/pixel-wp-library/wiki/Custom-Taxonomy-Columns
 */
class PxTableColumns {
  private $post_type;
  private $taxonomy_name;
  private $columns = [];
  private $sortable;

  function __construct(string $name, string $type = 'post', array $raw_columns) {
    $this->columns = $this->_parse_columns($raw_columns);
    $this->sortable = $this->_get_sortable($this->columns);

    switch ($type) {
      case 'post':
        $this->post_type = $name;
        add_filter("manage_{$name}_posts_columns", [$this, '_override_columns'], 100);
        add_action("manage_{$name}_posts_custom_column", [$this, '_fill_post_columns'], 10, 2);
        add_filter("manage_edit-{$name}_sortable_columns", [$this, '_enable_sort_columns']);
        break;

      case 'taxonomy':
        $this->taxonomy_name = $name;
        add_filter("manage_edit-{$name}_columns", [$this, '_override_columns'], 10);
        add_action("manage_{$name}_custom_column", [$this, '_fill_taxonomy_columns'], 10, 3);
        add_filter("manage_edit-{$name}_sortable_columns", [$this, '_enable_sort_columns']);
        break;
    }    
  }

  /**
   * 
   */
  private function _parse_columns($raw_columns) {
    $raw_columns = array_filter($raw_columns, function($rc) {
      return $rc;
    });

    $columns = [];
    foreach ($raw_columns as $slug => $col) {
      $col = wp_parse_args($col, [
        'slug' => $slug,
        'label' => $col['label'] ?? _H::to_title($slug),
        'content' => false,
        'icon' => false,
        'orderby' => '',
        'order' => 'desc',
      ]);
  
      // Comments always goes with icon
      if ($slug === 'comments') { 
        $col['icon'] = 'dashicons-admin-comments';
      }

      // If has icon, replace its name
      if ($col['icon']) {
        if (preg_match( '/^dashicons-/', $col['icon'], $has_prefix)) {
          $col['icon'] =  'dashicons-' . $col['icon'];
        }
         
        $col['label'] = "<span class='dashicons {$col['icon']}'></span>
          <span class='screen-reader-text'>
            {$col['label']}
          </span>";
      }

      $columns[$slug] = $col;
    }

    return $columns;
  }

  /**
   * 
   */
  private function _get_sortable($columns) {
    $sortable = array_filter($columns, function ($col) {
      return $col['orderby'];
    });

    $sortable = array_map(function ($col) {
      $is_desc = strcasecmp($col['order'], 'desc') === 0;
      if ($col['orderby'] === true) {
        return [$col['slug'], $is_desc];
      } else {
        return [$col['orderby'], $is_desc];
      }
    }, $sortable);

    return $sortable;
  }

  /////

  /**
   * @filter manage_CPT_posts_columns
   * 
   * @param array $defaults - The current column list
   * @return array - The new list
   */
  function _override_columns($defaults) {
    $list = [];
    foreach ($this->columns as $slug => $args) {
      $list[$slug] = $args['label'];
    }

    // always start with checkbox
    $list = ['cb' => $defaults['cb']] + $list;
    return $list;
  }

  /**
   * Fill the post column
   * 
   * @action manage_{$post_type}_posts_custom_column
   * 
   * @param $slug (string) - The column slug registered at filter_create()
   * @param $post_id (int) - The post ID of current row
   * @return string - The content of the column
   */
  function _fill_post_columns($slug, $post_id) {
    $columns = $this->columns;
    if (!isset($columns[$slug])) { return false; }
    
    $default_columns = ['cb', 'title', 'author', 'date', 'categories', 'comments', 'tags'];
    $content_callback = $columns[$slug]['content'] ?? null;

    // if default columns AND has no callback, abort early since it's automatically filled
    if (in_array($slug, $default_columns) && !$content_callback) {
      return;
    }

    switch ($slug) {
      case 'content':
        echo get_the_excerpt();
        break;
      case 'featured_image':
        $thumb = get_the_post_thumbnail($post_id, [75, 75]);
        echo $thumb;
        break;

      default:
        $fields = [];
        if (class_exists('ACF')) {
          $fields = get_fields($post_id);
        } else {
          $fields = get_post_meta($post_id);
          $fields = array_combine(array_keys($fields), array_column($fields, '0'));
        }

        // if function, run it
        if (isset($content_callback) && is_callable($content_callback)) {
          global $post;
          echo $content_callback($post, $fields);
        }
        // if no content, auto populate it
        else {
          $output = $this->_autofill_post_content($slug, $post_id);
          echo $output;
        }
        break;
    }
  }

  /**
   * Fill the taxonomy column
   * 
   * @action manage_{$taxonomy}_custom_column
   * 
   * @param $value (mixed)
   * @param $slug (string) - The column slug
   * @param $term_id (int) - The taxonomy ID of current row
   * @return string - The content of the column
   */
  function _fill_taxonomy_columns($value, $slug, $term_id) {
    $columns = $this->columns;
    if (!isset($columns[$slug])) { return $value; }

    $default_columns = ['cb', 'name', 'description', 'slug', 'posts'];
    $content_callback = $columns[$slug]['content'] ?? null;

    // if default columns AND has no callback, abort early since it's automatically filled
    if (in_array($slug, $default_columns) && !$content_callback) {
      return $value;
    }

    $fields = [];
    if (class_exists('ACF')) {
      $fields = get_fields("term_{$term_id}");
    } else {
      $fields = get_term_meta($term_id);
      $fields = array_combine(array_keys($fields), array_column($fields, '0'));
    }

    if (is_callable($content_callback)) {
      global $wp_query;
      $term = get_queried_object();
      echo $content_callback($term, $fields);
    } else {
      echo '-';
    }
  }

  /**
   * Apply sorting to List header
   * 
   * @filter manage_edit-CPT_sortable_columns
   * 
   * @params array $defaults - Sortable column list
   * @return array - The updated sortable column list
   */
  function _enable_sort_columns($defaults) {
    return $this->sortable;
  }

  /**
   * Find out whether it's a custom field or taxonomy and fill in accordingly
   * 
   * @param string $slug - The column slug
   * @param int $post_id
   * 
   * @return string - Plain text or HTML to be echoed out.
   */
  private static function _autofill_post_content($slug, $post_id) {
    global $post;

    $meta = function_exists('get_field') ? get_field($slug, $post_id) : get_post_meta($post_id, $slug, true);
    if ($meta) {
      return $meta;
    }

    $terms = get_the_terms($post_id, $slug);
    if (!isset($terms->errors) && $terms) {
      $out = [];

      // loop through each term, linking to the 'edit posts' page for the specific term
      foreach ($terms as $term) {
        $out[] = sprintf('<a href="%s">%s</a>',
          esc_url(add_query_arg([
            'post_type' => $post->post_type,
            'type' => $term->slug
          ], 'edit.php')),
          esc_html(sanitize_term_field(
            'name', $term->name, $term->term_id, 'type', 'display'
          ))
        );
      }

      // join the terms, separating with comma
      return join(', ', $out);
    }
  }
}


/**
 * Simplify ordering by custom field. If the 'orderby' is 'meta_value__xxx', it will split the 'xxx' into 'meta_key' param
 * 
 * @filter request
 * @param array $query_vars
 * @return array - The modified $vars to include sorting method
 */
function px_simplify_orderby_meta_value($query_vars) {
  $orderby = $query_vars['orderby'] ?? null;
  
  // abort if the format is not "meta_value__xxx" or "meta_value_num__xxx"
  preg_match('/(meta_value(?:_num)?)__(.+)/', $orderby, $matches);
  if (!$matches) { return $query_vars; }

  $query_vars = wp_parse_args([
    'orderby' => $matches[1],
    'meta_key' => $matches[2],
  ], $query_vars);

  return $query_vars;
}
