import { unregisterBlockType, unregisterBlockVariation } from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';

import './px-gutenberg.sass';
import './_core/core';

import './classic-quote/_index.jsx';
import './quote-testimony/editor';
// import './quote-timeline/editor';
import './list-inline/editor';
import './table-full-color/editor';

import './cover-mobile/editor.jsx';
import './gallery-slider/editor';
import './gallery-thumbnails/editor';
import './file-download-button/editor.sass';

import './group-flex-columns/editor.jsx';
import './columns-gap/editor';
import './spacer-negative/editor';
import './button-transparent/editor';

import './px-icon-prefix/editor.jsx';

domReady(() => {
  window.localizePx.disallowedBlocks.forEach((name) => {
    unregisterBlockType(name);
  });

  // Disable useless Group variation
  unregisterBlockVariation('core/group', 'group-stack');
});
