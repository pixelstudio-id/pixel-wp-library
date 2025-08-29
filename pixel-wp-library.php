<?php
/**
 * Plugin Name: Pixel WP Library
 * Description: Collection of WordPress modules to be used together with pixel-wp-theme
 * Plugin URI: http://github.com/pixelstudio-id/pixel-wp-library
 * Requires at least: 6.2
 * Requires PHP: 7.4
 * License: MIT
 * Author: Pixel Studio
 * Author URI: https://pixelstudio.id
 * Version: 6.8.3
 */

if (!defined('WPINC')) { die; } // exit if accessed directly

// Constant
define('PX_VERSION', '6.8.3');
define('PX_BASE', basename(dirname(__FILE__)).'/'.basename(__FILE__));

// // define('PX_DIR', __DIR__); // for require
define('PX_DIST', plugin_dir_url(__FILE__) . '_dist');


if (!class_exists('Pixel_WP_Library')):

require_once __DIR__ . '/_helper/_index.php';

require_once __DIR__ . '/modify-core/_index.php';
require_once __DIR__ . '/vendor/_index.php';
  
require_once __DIR__ . '/admin-sidenav/_index.php';
require_once __DIR__ . '/comment/_index.php';
require_once __DIR__ . '/widgets/_index.php';
require_once __DIR__ . '/widgets-dark-mode/_index.php';
require_once __DIR__ . '/head-footer/_index.php';

require_once __DIR__ . '/block-faq/_index.php';
require_once __DIR__ . '/block-icon/_index.php';
require_once __DIR__ . '/block-tabs/_index.php';

if (defined('PX_LEGACY_MODE')) {
  require_once __DIR__ . '/post-type/_legacy/_index.php';
  require_once __DIR__ . '/gutenberg/_legacy/_index.php';
  require_once __DIR__ . '/menu/_legacy/_index.php';
} else {
  require_once __DIR__ . '/post-type/_index.php';
  require_once __DIR__ . '/gutenberg/_index.php';
  require_once __DIR__ . '/menu/_index.php';
}

add_action('admin_enqueue_scripts', '_px_enqueue_admin_assets', 100);

/**
 * Add CSS and JS to admin area
 * 
 * @action admin_enqueue_scripts
 */
function _px_enqueue_admin_assets() {
  wp_enqueue_style('px-admin', PX_DIST . '/px-admin.css', [], PX_VERSION);
  wp_enqueue_script('px-admin', PX_DIST . '/px-admin.js', [], PX_VERSION, true);
}


class Pixel_WP_Library {
  function __construct() {
    require_once __DIR__ . '/activation-hook.php';
    register_activation_hook(PX_BASE, [$this, 'register_activation_hook']);

    add_filter('plugin_row_meta', [$this, 'add_doc_links'], 10, 2);
  }

  /**
   * Register activation and deactivation hook
   */
  function register_activation_hook() {
    $hook = new Px_ActivationHook();
    $hook->on_activation();
  }

  /**
   * Add "Documentation" link in the plugin listing (besides the Deactivate link)
   * 
   * @action plugin_row_meta 10
   */
  function add_doc_links($links, $file) {
    if ($file === plugin_basename(__FILE__)) {
      $links[] = '<a target="_blank" rel="noopener noreferrer" href="https://github.com/pixelstudio-id/pixel-wp-library/wiki/"> View Documentation » </a>';
    }

    return $links;
  }
}

new Pixel_WP_Library();
endif;


/////

if (!class_exists('H')):

/**
 * Alternate way to call Edje functions from each module's `_load.php`
 * Example: to call `h_register_post_type()`, we can use `H::register_post_type()`
 */
class H {
  static function __callStatic($name, $args) {
    $func_name = "h_$name";

    if (is_callable($func_name)) {
      return call_user_func_array($func_name, $args);
    } else {
      trigger_error("The function H::{$name} does not exist.", E_USER_ERROR);
    }
  }
}

endif; // class_exists