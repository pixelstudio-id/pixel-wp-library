<?php

/**
 * Wrapper for wp_remote_get() with easier usage
 * 
 * @param string $endpoint - full URL including query string, if any
 * @param array $headers
 */
function px_remote_get($endpoint, $headers = []) {
  $response = wp_remote_get($endpoint, [
    'headers' => $headers,
    'timeout' => 30,
  ]);

  if (is_wp_error($response)) { return $response; }

  $status = wp_remote_retrieve_response_code($response);
  if ($status !== 200) {
    return new WP_Error($status, wp_remote_retrieve_response_message($response), [
      'status' => $status,
    ]);
  }

  $body = json_decode(wp_remote_retrieve_body($response), true);
  return $body;
}

/**
 * GET request with caching
 * 
 * @param string $endpoint
 * @param array $headers
 * @param int $cache - insert integer >= 0 to cache the result in transient with that much second to expire. Default is 1 day.
 */
function px_remote_get_with_cache($endpoint, $headers = [], $cache = DAY_IN_SECONDS, $cache_prefix = 'px_') {
  $result = null;

  if ($cache > 0) {
    $transient_key = $cache_prefix . md5($endpoint);
    $result = get_transient($transient_key);
  }

  if (!$result) {
    $result = px_remote_get($endpoint, $headers);
    if (is_wp_error($result)) { return $result; }

    if ($cache > 0) {
      set_transient($transient_key, $result, $cache);
    }
  }

  return $result;
}


/**
 * Wrapper for wp_remote_post() with easier usage
 * 
 * @param string $endpoint - The API endpoint URL including query args
 * @param array|string $params - The body params.
 * @param array $headers - Optional headers for the request
 * 
 * @return array|WP_Error - The response body as an associative array, or WP_Error on failure
 */
function px_remote_post($endpoint, $params = [], $headers = []) {
  $response = wp_remote_post($endpoint, [
    'body' => $params,
    'headers'=> $headers,
    'timeout' => 30,
  ]);

  if (is_wp_error($response)) { return $response; }

  $status = wp_remote_retrieve_response_code($response);
  if ($status !== 200) {
    return new WP_Error($status, wp_remote_retrieve_response_message($response), [
      'status' => $status,
    ]);
  }

  $body = json_decode(wp_remote_retrieve_body($response), true);
  return $body;
}

/**
 * Shortcut for px_remote_post() with JSON body
 */
function px_remote_post_json($endpoint, $params = [], $headers = []) {
  $headers['Content-Type'] = 'application/json';
  $params = wp_json_encode($params);
  return px_remote_post($endpoint, $params, $headers);
}