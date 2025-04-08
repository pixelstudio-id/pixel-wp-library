<?php if (!defined('WPINC')) { die; }
/**
 * This block is forked from https://wordpress.org/plugins/simple-tabs-block/
 */

add_action('init', 'px_register_tabs_block');
add_action('wp_enqueue_scripts', 'px_enqueue_tabs_block', 101);
add_filter('render_block_px/tabs', 'px_split_tabs_button_and_content', 10, 2);

/**
 * @action init
 */
function px_register_tabs_block() {
  if (!current_theme_supports('px-tabs-block')) { return; }

	wp_register_script('px-tabs-editor', PX_DIST . '/px-tabs-editor.js', [ 'wp-blocks', 'wp-dom' ] , PX_VERSION, true);
  wp_register_style('px-tabs-editor', PX_DIST . '/px-tabs-editor.css', [ 'wp-edit-blocks' ], PX_VERSION);

	register_block_type(__DIR__ . '/tabs');
	register_block_type(__DIR__ . '/tab');
}

/**
 * @action wp_enqueue_scripts
 */
function px_enqueue_tabs_block() {
  if (!current_theme_supports('px-tabs-block')) { return; }

  wp_enqueue_script('px-tabs', PX_DIST . '/px-tabs.js', [] , PX_VERSION, true);
}

/**
 * Move the tab buttons to its own wrapper so it can be scrolled.
 * 
 * @filter render_block_px/tabs
 */
function px_split_tabs_button_and_content($content, $block) {
  preg_match_all('/<dt role="tab".+>.+<\/dt>/Ui', $content, $buttons);
  if (!$buttons) { return $content; }

  // remove the buttons
  $content = preg_replace('/<dt role="tab".+>.+<\/dt>/Ui', '', $content);

  // remove color classes and append it to buttons
  // preg_match('/wp-block-px-tabs.+(?:align\S+)\s(.+)"/Ui', $content, $colors);
  // $colors = isset($colors[1]) ? $colors[1] : '';
  // if ($colors) {
  //   $content = preg_replace('/' . $colors . '/', '', $content);
  // }

  // move the buttons to before inner wrapper
  $buttons = "<dl class=\"wp-block-px-tabs__buttons\">" . implode('', $buttons[0]) . '</dl>';
  $content = preg_replace('/<dl class="wp-block-px-tabs__inner".*>/Ui', "{$buttons}$0", $content);

  return $content;
}