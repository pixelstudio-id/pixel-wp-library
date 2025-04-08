import { unregisterBlockType, unregisterBlockVariation } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
import domReady from '@wordpress/dom-ready';

import './px-gutenberg.sass';
import './_core-styles/editor.js';

import './cover-mobile/editor.jsx';
import './group-row-columns/editor.jsx';

// import './classic-list/_index.jsx'; // @deprecated - using the original nested item is useful
import './classic-quote/_index.jsx';

domReady(() => {
  window.localizeH.disallowedBlocks.forEach((name) => {
    unregisterBlockType(name);
  });

  // Disable useless Group variation
  unregisterBlockVariation('core/group', 'group-stack');
});

// Modify settings for Core blocks
addFilter('blocks.registerBlockType', 'px/set_default_alignment', (settings, name) => {
  switch (name) {
    // Paragraph and List is allowed to use wide alignment
    case 'core/paragraph':
    case 'core/list':
    case 'core/code':
    case 'core/verse':
    case 'core/preformatted':
    case 'core/table':
    case 'core/pullquote':
    case 'core/heading':
      settings.supports = {
        ...settings.supports,
        align: ['wide'],
      };
      break;

    case 'core/gallery':
    case 'core/latest-posts':
      settings.supports = {
        ...settings.supports,
        align: ['wide', 'full'],
      };
      break;
      
    // Allow wide, left, and right
    case 'core/file':
    case 'core/separator':
      settings.supports = {
        ...settings.supports,
        align: ['wide', 'right', 'left'],
      };
      break;

    // Remove align left and right
    case 'core/audio':
      settings.supports = {
        ...settings.supports,
        align: [],
      };
      break;

    // only allow center
    case 'core/social-links':
      settings.supports = {
        ...settings.supports,
        align: ['center'],
      };
      break;

    // Columns default is now wide
    case 'core/columns':
      settings.supports = {
        ...settings.supports,
        align: ['wide', 'full'],
      };

      settings.attributes = {
        ...settings.attributes,
        align: {
          type: 'string',
          default: 'wide',
        },
      };
      break;

    // Remove layout setting in Child Column
    case 'core/column':
      settings.supports = {
        ...settings.supports,
        __experimentalLayout: false,
      };
      break;

    case 'core/button':
      settings.supports = {
        ...settings.supports,
        __experimentalBorder: false,
      };
      break;

    // Group defaults to full and remove the Justification
    case 'core/group':
      settings.supports = {
        ...settings.supports,
        // __experimentalLayout: false,
      };

      settings.attributes = {
        ...settings.attributes,
        align: {
          type: 'string',
          default: 'full',
        },
        layout: {
          type: [Object],
          default: { inherit: true },
        },
      };
      break;

    // Cover defaults to Full
    case 'core/cover':
      settings.attributes = {
        ...settings.attributes,
        align: {
          type: 'string',
          default: 'full',
        },
      };
      break;

    default:
      break;
  }

  // SPACING SETTINGS
  if (!settings.supports) {
    settings.supports = {};
  }

  switch (name) {
    // Has visible padding and margin
    case 'core/group':
    case 'core/columns':
    case 'core/cover':
      settings.supports.spacing = {
        ...settings.supports.spacing,
        margin: ['top', 'bottom'],
        __experimentalDefaultControls: {
          padding: true,
          margin: true,
        },
      };
      break;

    // Has visible padding, but hidden margin
    case 'core/column':
      settings.supports.spacing = {
        ...settings.supports.spacing,
        padding: true,
        margin: ['top', 'bottom'],
        __experimentalDefaultControls: {
          padding: true,
          margin: false,
        }
      };
      break;
    

    // Has hidden margin and padding
    case 'core/heading':
    case 'core/paragraph':
    case 'core/quote':
    case 'core/list':
    case 'core/gallery':
    case 'core/code':
    case 'core/verse':
    case 'core/preformatted':
    case 'core/table':
      settings.supports.spacing = {
        ...settings.supports.spacing,
        padding: true,
        margin: ['top', 'bottom'],
        // __experimentalDefaultControls: {
        //   margin: true,
        // },
      };
      break;

    // Only margin
    case 'core/buttons':
    case 'core/separator':
    case 'core/image':
    case 'core/media-text':
    case 'core/latest-posts':
      settings.supports.spacing = {
        ...settings.supports.spacing,
        padding: false,
        margin: ['top', 'bottom'],
        // __experimentalDefaultControls: {
        //   margin: true,
        // },
      };
      break;

    default:
      // do nothing
      break;
  }

  // FONT SIZE Settings
  switch (name) {
    case 'core/paragraph':
    case 'core/list':
      settings.supports.typography = {
        ...settings.supports.typography,
        fontSize: true,
      };
      break;

    default:
      settings.supports.typography = false;
      break;
  }

  // COLOR Settings
  switch (name) {
    // add text color to File block
    case 'core/file':
      settings.supports = {
        ...settings.supports,
        color: {
          ...settings.supports.color,
          text: true,
        },
      };
  
      settings.attributes = {
        ...settings.attributes,
        textColor: {
          type: 'string',
          default: '',
        },
      };
      break;
  }

  return settings;
});
