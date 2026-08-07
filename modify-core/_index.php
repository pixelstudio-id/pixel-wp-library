<?php if (!defined('ABSPATH')) { exit; }

require_once __DIR__ . '/bloat-removal.php';
require_once __DIR__ . '/bloat-removal-assets.php';

add_action('plugins_loaded' , '_h_load_modify');

/**
 * @actions plugins_loaded
 */
function _h_load_modify() {
  // admin
  if (is_admin()) {
    require_once __DIR__ . '/admin.php';
    
    if (defined('DISALLOW_FILE_EDIT') && !DISALLOW_FILE_EDIT) {
      require_once __DIR__ . '/code-editor.php';
    }
  }
  // frontend
  else {
    require_once __DIR__ . '/login.php';

    if (class_exists('Jetpack')) {
      require_once __DIR__ . '/jetpack.php';
    }
  }
}