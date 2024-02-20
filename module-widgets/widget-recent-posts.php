<?php

/**
 * 
 */
class H_WidgetRecentPosts extends H_Widget { 
  function __construct() {
    parent::__construct('h_recent_posts', __('- Recent Posts'), [
      'description' => __('Show latest posts')
    ]);
  }

  function widget($args, $instance) {
    $fields = get_fields('widget_' . $args['widget_id']);

    $custom_render = apply_filters('px_render_widget_posts', '', $fields);
    if ($custom_render) {
      echo $args['before_widget'] . $custom_render . $args['after_widget'];
    }

    $title = $fields['title'] ?: '';
    $posts = $this->_get_posts($fields);

    // render
    echo $args['before_widget']; ?>
    <ul class="wp-block-latest-posts__list columns-1 wp-block-latest-posts">
      <?php if ($title): ?>
        <?= $args['before_title'] ?> <?= $title ?> <?= $args['after_title'] ?>  
      <?php endif; ?>
      
      <?php foreach ($posts as $p): ?>
        <li>
          <?php if ($p->_thumbnail_src): ?>
            <div class='wp-block-latest-posts__featured-image alignright'>
              <a href="<?= $p->_permalink ?>">
                <img src="<?= $p->_thumbnail_src ?>">
              </a>
            </div>
          <?php endif; ?>

          <a href="<?= $p->_permalink ?>">
            <?= $p->post_title ?>
          </a>
          
          <?php if ($p->_author_name ): ?>
            <div class="wp-block-latest-posts__post-author">
              <?= $p->_author_name ?>
            </div>
          <?php endif; ?>

          <?php if ($p->_date): ?>
            <time class="wp-block-latest-posts__post-date">
              <?= $p->_date ?>
            </time>
          <?php endif; ?>
        </li>
      <?php endforeach; ?>
    </ul>
    <?php echo $args['after_widget'];
  }

  private function _get_posts($fields) {
    $number_of_posts = $fields['number_of_posts'] ?: 3;
    $style = $fields['style'] ?: [];

    $posts = get_posts([
      'posts_per_page' => $number_of_posts,
      'suppress_filters' => false, // WPML support
    ]);

    // loop through posts to append data
    $posts = array_map(function($p) use ($style) {
      $p->_permalink = get_permalink($p);

      if (in_array('show_thumbnail', $style)) {
        $thumbnail_src = get_the_post_thumbnail_url($p, 'thumbnail');
        $p->_thumbnail_src = $thumbnail_src ? $thumbnail_src : null;
      }
      if (in_array('show_date', $style)) {
        $p->_date = get_the_date('', $p);
      }
      if (in_array('show_author', $style)) {
        $p->_author_name = get_the_author_meta('display_name', $p->post_author);
      }
      return $p;
    }, $posts);

    return $posts;
  }
}