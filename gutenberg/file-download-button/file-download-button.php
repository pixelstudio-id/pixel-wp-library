<?php

add_filter('render_block_core/file', '_px_render_file_block', 10, 2);


/**
 * Add the file size to the button
 * 
 * @filter render_block_core/file
 */
function _px_render_file_block($content, $block) {
  $file_id = $block['attrs']['id'] ?? null;
  
  if ($file_id) {
    $file_path = get_attached_file($file_id);
    $filesize = round(filesize($file_path) / 1024, 2);
    $filesize_string = $filesize > 1024
      ? round($filesize / 1024, 2) . ' MB'
      : $filesize . ' KB';
    
    $content = preg_replace(
      '/(wp-block-file__button.+>)(.+)<\/a>/',
      "$1<span>$2</span><small>{$filesize_string}</small></a>",
      $content
    );
  }

  $content = preg_replace('/style="background-color:(.+)"/', 'style="--bgColor:$1"', $content);

  return $content;
}
