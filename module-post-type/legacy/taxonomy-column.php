<?php
/**
 * Create custom column in the taxonomy table
 * 
 * @deprecated - replaced by px_override_taxonomy_columns()
 */
class H_TaxonomyColumn {
  private $tax_name;
  private $columns = [];
  private $sortable;

  public function __construct($tax_name, $raw_columns) {
    $this->tax_name = $tax_name;

    $this->columns = $this->_parse_columns($raw_columns);
    $this->sortable = $this->_get_sortable($this->columns);
  }

  /**
   *
   */
  function _parse_columns($raw_columns) {
    $raw_columns = array_filter($raw_columns, function($rc) {
      return $rc;
    });

    $columns = [];
    foreach ($raw_columns as $slug => $args) {
      $label = $args['label'] ?? $args['name'] ?? _H::to_title($slug);
      $col = wp_parse_args($args, [
        'slug' => $slug,
        'label' => $label,
        'content' => false,
        'icon' => '',
        'orderby' => '',
        'order' => 'desc',
      ]);
  
      // If has icon, replace its name
      if ($col['icon']) {
        if (preg_match( '/^dashicons-/', $col['icon'], $has_prefix)) {
          $col['icon'] =  'dashicons-' . $col['icon'];
        }
         
        $col['name'] = "<span class='dashicons {$col['icon']}'></span>
          <span class='screen-reader-text'>{$col['label']}</span>";
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
   * Override all columns of a taxonomy table
   */
  function edit_columns() {
    $name = $this->tax_name;
    add_filter("manage_edit-{$name}_columns", [$this, '_override_columns'], 10);
    add_action("manage_{$name}_custom_column", [$this, '_fill_columns'], 10, 3);
    add_filter("manage_edit-{$name}_sortable_columns", [$this, '_enable_sort_columns']);
    add_filter('request', [$this, '_allow_sort_by_metakey']);
  }

  /////

  /**
   * @filter manage_TAX_columns
   * 
   * @param array $defaults - The current column list
   * @return array - The new list
   */
  function _override_columns($defaults) {
    $list = [];
    foreach ($this->columns as $slug => $args) {
      $list[$slug] = $args['name'] ?? $args['label'] ?? _H::to_title($slug);
    }

    // always start with checkbox
    $list = ['cb' => $defaults['cb']] + $list;
    return $list;
  }

  /**
   * Fill the column, row by row
   * 
   * @action manage_TAX_custom_column
   * 
   * @param $slug (string) - The column slug registered at filter_create()
   * @param $term_id (int) - The Term ID of current row
   * @return string - The content of the column
   */
  function _fill_columns($value, $slug, $term_id) {
    $columns = $this->columns;
    if (!isset($columns[$slug])) { return $value; }

    switch ($slug) {
      case 'cb':
      case 'name':
      case 'description':
      case 'slug':
      case 'posts':
        return $value;
        break;

      // if custom field
      default:
        $content = $columns[$slug]['content'];

        // if function, run it
        if (isset($content) && is_callable($content)) {
          $fields = get_fields("term_{$term_id}");
          $term = get_term($term_id, $this->tax_name);
          return $content($term, $fields);
        }
        // if plain string, look for the custom field
        else {
          $output = $this->_get_meta_content($slug, $term_id);
          return $output;
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
    $sortable_columns = $this->_get_sortable_columns($this->columns);

    foreach ($sortable_columns as $sc) {
      $defaults[$sc] = $sc;
    }
    return $defaults;
  }

  /**
   * Add parameters to allow sorting by Custom field
   * 
   * @filter request
   * @param array $vars - The WP Args
   * @param array $sortable_columns - Sortable column data
   * @return array - The modified $vars to include sorting method
   */
  function _allow_sort_by_metakey($vars) {
    $sortable_columns = $this->_get_sortable_columns($this->columns);

    $is_orderby_meta = isset($vars['orderby']) && in_array($vars['orderby'], $sortable_columns);

    if ($is_orderby_meta) {
      $vars = array_merge($vars, [
        'meta_key' => $vars['orderby'],
        'orderby' => 'meta_value'
      ]);
    }

    return $vars;
  }

  /**
   * Get list of Sortable columns
   * 
   * @param array $columns - All column data
   * @return array - List of sortable column's slug.
   */
  private function _get_sortable_columns($columns) {
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
  private static function _get_meta_content($field_name, $term_id) {
    $meta = get_field($field_name, "term_{$term_id}");
    return $meta;
  }
}
