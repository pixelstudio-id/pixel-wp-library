<?php if (!defined('ABSPATH')) { exit; }

add_action('init', function() {
  px_disable_emojis();
  px_disable_embeds();
  px_disable_xmlrpc();
  px_hide_wp_branding();
  px_remove_rsd_wlw();
  px_remove_shortlink();
  px_disable_rss_feed();
  add_action('pre_ping', 'px_block_self_pingbacks');

  px_remove_custom_image_sizes();
  add_action('admin_head', 'px_disable_wp_update_nag_for_non_admins');

  add_filter('redirect_canonical', 'px_prevent_url_guessing');
});

/**
 * Removes the wp-emoji JS + the emoji detection script.
 */
function px_disable_emojis() {
  remove_action('wp_head', 'print_emoji_detection_script', 7);
  remove_action('admin_print_scripts', 'print_emoji_detection_script');
  remove_action('wp_print_styles', 'print_emoji_styles');
  remove_action('admin_print_styles', 'print_emoji_styles');
  remove_filter('the_content_feed', 'wp_staticize_emoji');
  remove_filter('comment_text_rss', 'wp_staticize_emoji');
  remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
  add_filter('tiny_mce_plugins', function ($plugins) {
    return is_array($plugins) ? array_diff($plugins, ['wpemoji']) : [];
  });
  add_filter('emoji_svg_url', '__return_false');
}

/**
 * Removes wp-embed.min.js and oEmbed discovery.
 * 
 * @warn - should test whether it disable youtube embed block?
 */
function px_disable_embeds() {
  // remove_action('rest_api_init', 'wp_oembed_register_route');
  // remove_filter('oembed_dataparse', 'wp_filter_oembed_result', 10);
  remove_action('wp_head', 'wp_oembed_add_discovery_links');
  remove_action('wp_head', 'wp_oembed_add_host_js');
  // The wp-embed footer script was already being printed before the
  // old dequeue fired on some themes; deregister at the source kills
  // it everywhere reliably.
  add_action('init', function() {
    if (!is_admin()) {
      wp_deregister_script('wp-embed');
    }
  }, 1);
}

/**
 * Closes /xmlrpc.php and removes X-Pingback header.
 */
function px_disable_xmlrpc() {
  add_filter('xmlrpc_enabled', '__return_false');
  add_filter('wp_headers', function ($headers) {
    unset($headers['X-Pingback']);
    return $headers;
  });
  remove_action('wp_head', 'rsd_link');
}

/**
 * Hide Wordpress branding and versioning
 */
function px_hide_wp_branding() {
  // version in head
  add_filter('the_generator', '__return_empty_string');
  remove_action('wp_head', 'wp_generator');
  
  // logo in adminbar
  add_action('admin_bar_menu', function($wp_admin_bar) {
    $wp_admin_bar->remove_node('wp-logo');
  }, 999);

  // thankyou message in footer
  add_filter('admin_footer_text', '__return_empty_string', 11);
  add_filter('update_footer', '__return_empty_string', 11);
}


/**
 * Removes legacy RSD/WLW blog-editor links from your page header (most sites don't need them).
 */
function px_remove_rsd_wlw() {
  remove_action('wp_head', 'rsd_link');
  remove_action('wp_head', 'wlwmanifest_link');
}

/**
 * Removes the wp-shortlink tag from your page header.
 */
function px_remove_shortlink() {
  remove_action('wp_head', 'wp_shortlink_wp_head');
  remove_action('template_redirect', 'wp_shortlink_header', 11);
}

/**
 * Disable RSS feed
 */
function px_disable_rss_feed() {
  $bail = function() {
    wp_die(esc_html('RSS feeds are disabled on this site.'), '', ['response' => 404]);
  };
  add_action('do_feed',      $bail, 1);
  add_action('do_feed_rdf',  $bail, 1);
  add_action('do_feed_rss',  $bail, 1);
  add_action('do_feed_rss2', $bail, 1);
  add_action('do_feed_atom', $bail, 1);
  remove_action('wp_head', 'feed_links', 2);
  remove_action('wp_head', 'feed_links_extra', 3);
}

/**
 * Stops your site from pinging itself.
 * 
 * @action pre_ping
 */
function px_block_self_pingbacks(&$links) {
  $home = home_url();
  foreach ($links as $i => $link) {
    if (0 === strpos($link, $home)) {
      unset($links[$i]);
    }
  }
}

/**
 * Remove custom image sizes added by plugin like WooCommerce
 */
function px_remove_custom_image_sizes() {
  foreach (get_intermediate_image_sizes() as $size) {
    if (!in_array($size, ['thumbnail', 'medium', 'large', 'medium_large'])) {
      remove_image_size($size);
    }
  }
}

/**
 * Disables the WP update nag for non-admins.
 * 
 * @action admin_head
 */
function px_disable_wp_update_nag_for_non_admins() {
  if (current_user_can('update_core')) { return; }

  remove_action('admin_notices', 'update_nag', 3);
  remove_action('admin_notices', 'maintenance_nag', 10);
  remove_action('network_admin_notices', 'maintenance_nag', 10);
}

/**
 * Prevent URL guessing and redirect to closest match
 * 
 * @filter redirect_canonical
 */
function px_prevent_url_guessing($url) {
  if (is_404()) { return ''; }
  return $url;
}
