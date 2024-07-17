<?php
/**
 * Create custom column in the post table
 */
class H_PostColumn {
  private $post_type;
  private $sortable;
  private $columns = [];

  function __construct(string $post_type, array $columns) {
    $this->post_type = $post_type;

    $this->columns = $this->_parse_columns($columns);
    $this->sortable = $this->_get_sortable($this->columns);
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
      $label = $col['label'] ?? $col['name'] ?? _H::to_title($slug);
      $col = wp_parse_args($col, [
        'slug' => $slug,
        'label' => $label,
        'content' => false,
        'icon' => false,
        'orderby' => '', // the columns to sort by, if sorting ACF/custom field, add underscore (_) in front like "_price"
        'order' => 'desc', // the initial sorting order, 'desc' or 'asc'

        'sortable_by' => false, // @deprecated, replaced by 'orderby'
        'sortable' => false, // @deprecated, replaced by 'orderby'
      ]);

      // if orderby empty, but sortable_by or sortable has value
      if (!$col['orderby'] && ($col['sortable_by'] || $col['sortable'])) {
        $col['orderby'] = $col['sortable_by'] ?: $col['sortable'];
      }
  
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

  /**
   * Override all columns of a post type table
   */
  function edit_columns() {
    $pt = $this->post_type;

    add_filter("manage_{$pt}_posts_columns", [$this, '_override_columns'], 100);
    add_action("manage_{$pt}_posts_custom_column", [$this, '_fill_columns'], 10, 2);
    add_filter("manage_edit-{$pt}_sortable_columns", [$this, '_enable_sort_columns']);
    add_filter('request', [$this, '_request_allow_order_by_meta']);
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
   * Fill the column, row by row
   * 
   * @action manage_CPT_posts_custom_column
   * 
   * @param $slug (string) - The column slug registered at filter_create()
   * @param $post_id (int) - The post ID of current row
   * @return string - The content of the column
   */
  function _fill_columns($slug, $post_id) {
    global $post;
    $columns = $this->columns;
    if (!isset($columns[$slug])) { return false; }
    
    $default_columns = ['cb', 'title', 'author', 'date', 'categories', 'comments', 'tags'];
    $content_callback = $columns[$slug]['content'] ?? null;

    $fields = get_fields($post_id);
    $post = apply_filters("h_post_object_in_{$this->post_type}_table", $post, $fields);

    // if default columns AND has no callback, abort early since it's automatically filled
    if (in_array($slug, $default_columns) && !$content_callback) {
      return;
    }

    switch ($slug) {
      case 'content':
        echo get_the_excerpt();
        break;

      case 'thumbnail':
        $thumb = get_the_post_thumbnail($post_id, [75, 75]);
        echo $thumb;
        break;

      // if custom field
      default:
        // if function, run it
        if (isset($content_callback) && is_callable($content_callback)) {
          echo $content_callback($post, $fields);
        }
        // if plain string, look for the custom field
        else {
          $output = $this->_get_meta_content($slug, $post_id);
          echo $output;
        }

        break;
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
   * Add parameters to allow sorting by Custom field
   * 
   * @filter request
   * @param array $vars - The WP Args
   * @param array $sortable_columns - Sortable column data
   * @return array - The modified $vars to include sorting method
   */
  function _request_allow_order_by_meta($query_vars) {
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

  /**
   * Get list of Sortable columns
   * 
   * @param array $columns - All column data
   * @return array - List of sortable column's slug.
   */
  private function _get_sortable_columns($columns) {
    $sortable_columns = array_reduce($columns, function($result, $c) {
      if ($c['sortable']) {
        $result[] = $c['slug'];
      }

      return $result;
    }, []);

    return $sortable_columns;
  }

  /**
   * Get the content of a Meta field or Taxonomy
   * 
   * @param string $name - The column slug
   * @param int $post_id
   * 
   * @return string - Plain text or HTML to be echoed out.
   */
  private static function _get_meta_content($name, $post_id) {
    global $post;

    $meta = function_exists('get_field') ? get_field($name, $post_id) : get_post_meta($post_id, $name, true);
    $terms = get_the_terms($post_id, $name);

    // is a term if no error and has been ticked
    $is_terms = !isset($terms->errors) && $terms;

    // if the column is a custom field
    if ($meta) {
      return $meta;
    }
    // if the column is a term
    elseif ($is_terms) {
      $out = [];

      // loop through each term, linking to the 'edit posts' page for the specific term
      foreach ($terms as $term) {
        $out[] = sprintf('<a href="%s">%s</a>',
          esc_url(add_query_arg(
            [
              'post_type' => $post->post_type,
              'type' => $term->slug
            ],
            'edit.php'
          )),
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
