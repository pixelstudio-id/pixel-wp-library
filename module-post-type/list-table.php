<?php

class H_List_Table extends WP_List_Table {
  private $columns;
  private $data;
  private $view_links;
  private $args;
  private $table_data;

  function __construct($args) {
    parent::__construct();
    $this->columns = $args['columns'];
    $this->data = $args['data'];
    $this->view_links = $args['view_links'] ?? [];

    // $this->args = wp_parse_args($args, [
    //   'bulk_edit' => true,
    //   'search' => true,
    //   'pagination' => true,
    // ]);
  }

  function display() {
    ?>
    <form method="get">
      <input type="hidden" name="page" value="<?= $_REQUEST['page'] ?>" />
      <?php
        $this->views();
        $this->search_box('Search', 'search');
        parent::display();
      ?>
    </form>
    <?php
  }

  /**
   * Add columns settings and data
   */
  function prepare_items() {
    $columns = $this->_get_columns();
    $hidden = [];
    $sortable = $this->_get_sortable();
    $primary  = 'title';

    $this->_column_headers = [$columns, $hidden, $sortable, $primary];
    $this->items = $this->_get_items();
  }

  private function _get_columns() {
    $columns = array_map(function($col) {
      return $col['label'];
    }, $this->columns);

    $columns = array_merge(['cb' => '<input type="checkbox" />'], $columns);
    return $columns;
  }

  private function _get_sortable() {
    $columns = array_filter($this->columns, function($col) {
      return isset($col['sortable']) && $col['sortable'];
    });
  
    $sortable = [];
    foreach ($columns as $key => $args) {
      $sortable[$key] = $args['sortable'] === true
        ? [$key, false]
        : $args['sortable'];
    }

    return $sortable;
  }

  private function _get_items() {
    // if data is not WP_Post, return as is
    if (get_class($this->data[0]) !== 'WP_Post') { return $this->data; }

    $columns = $this->columns;
    $items = array_map(function($p) use ($columns) {
      $item = [
        'id' => $p->ID,
      ];

      foreach ($columns as $key => $args) {
        $value = '';
        switch ($key) {
          case 'title':
            $value = $p->post_title;
            break;

          default:
            $fields = class_exists('ACF') ? get_fields($p) : get_post_meta($p->ID, '', true);
            $content_callback = $args['content'] ?? null;

            if ($content_callback && is_callable($content_callback)) {
              $value = $content_callback($p, $fields);
            } else {
              $value = $fields[$key] ?? null;
            }
        }

        $item[$key] = $value;
      }

      return $item;
    }, $this->data);

    return $items;
  }

  /////

  /**
   * Create the small links above table
   */
  function get_views() {
    // if data is not WP_Post, return as is
    if (get_class($this->data[0]) !== 'WP_Post') {
      $this->get_views_links($this->view_links);
    }

    $links = [];
    $statuses_list = get_post_stati(['show_in_admin_status_list' => true], 'objects');
    $statuses_count = [
      'publish' => 0,
      'future' => 0,
      'draft' => 0,
      'pending' => 0,
      'private' => 0,
      'trash' => 0,
    ];

    // create home links
    $all_count = count($this->data);
    $url_base = $this->screen->parent_base . '.php';
    $all_url = add_query_arg([
      'post_type' => $_GET['post_type'] ?? null,
      'page' => $_GET['page'] ?? null,
    ], $url_base);

    $links['all'] = [
      'url' => esc_url($all_url),
      'label'   => "All <span class='count'>({$all_count})</span>",
      'current' => $all_url === add_query_arg($_GET, $url_base), // potential bug?
    ];

    // count each status
    foreach ($this->data as $p) {
      if (isset($statuses_count[$p->post_status])) {
        $statuses_count[$p->post_status] += 1;
      }
    }

    // create status links
    foreach ($statuses_count as $key => $count) {
      if ($count <= 0) { continue; }

      $label = $statuses_list[$key]->label ?? ucwords($key);
      $links[$key] = [
        'url' => esc_url(add_query_arg(['post_status' => $key], $all_url)),
        'label' => "{$label} ({$count})",
        'current' => isset($_REQUEST['post_status']) && $key === $_REQUEST['post_status'],
      ];
    }

    // append extra links from args, if any
    if ($this->view_links) {
      $links = array_merge($links, $this->view_links);
    }

    return $this->get_views_links($links);
  }

  /////

  function column_default($item, $column_name) {
    return $item[$column_name];
  }

  function column_cb($item) {
    return sprintf(
      '<input type="checkbox" name="post[]" value="%s" />',
      $item['id']
    );
  }
}