import { unregisterBlockType, unregisterBlockVariation } from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';

import './px-gutenberg.sass';
import './_core/core.js';
  
import './classic-quote/_index.jsx';
import './quote-testimony/editor.js';
// import './quote-timeline/editor.js';
import './list-inline/editor.js';
import './table-full-color/editor.js';

import './cover-mobile/editor.jsx';
import './cover-below-header/editor.js';
import './gallery-slider/editor.js';
import './gallery-thumbnails/editor.js';

import './group-flex-columns/editor.jsx';
import './columns-gap/editor.js';
import './spacer-negative/editor.js';
import './button-transparent/editor.js';


domReady(() => {
  window.localizePx.disallowedBlocks.forEach((name) => {
    unregisterBlockType(name);
  });

  // Disable useless Group variation
  unregisterBlockVariation('core/group', 'group-stack');
});