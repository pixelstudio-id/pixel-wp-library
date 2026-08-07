import { addFilter } from '@wordpress/hooks';

import './core-text.sass';
import './core-media.sass';
import './core-design.sass';
import './core-widget.sass';
import './_acf.sass';

/**
 * Change the default alignment settings for some blocks
 */
function setDefaultAlignment(settings, name) {
  switch (name) {
    // Paragraph and Table is allowed to use wide alignment
    case 'core/paragraph':
    case 'core/table':
    case 'core/code':
    case 'core/verse':
    case 'core/preformatted':
    case 'core/pullquote':
    case 'core/heading':
      settings.supports = {
        ...settings.supports,
        align: ['wide'],
      };
      break;

    // List is allowed to use wide alignment and center text-align
    case 'core/list':
      settings.supports = {
        ...settings.supports,
        align: ['center', 'wide'],
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
    case 'core/separator':
      settings.supports = {
        ...settings.supports,
        align: ['wide', 'right', 'left'],
      };
      break;

    // Remove align left and right
    case 'core/file':
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

    default: // do nothing
      break;
  }

  return settings;
}

/**
 * Change the default spacing/dimension settings for some blocks
 */
function setDefaultSpacing(settings, name) {
  if (!settings.supports) { settings.supports = {}; }

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

    default: // do nothing
      break;
  }

  return settings;
}

/**
 * Change the default typography settings for some blocks
 */
function setDefaultTypography(settings, name) {
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
  return settings;
}

/**
 * Change the default palette settings for some blocks
 */
function setDefaultColor(settings, name) {
  switch (name) {
    // add background and text color to Image block
    case 'core/image':
      settings.supports = {
        ...settings.supports,
        color: {
          ...settings.supports.color,
          background: true,
          text: true,
        },
      };
      settings.attributes = {
        ...settings.attributes,
        textColor: {
          type: 'string',
          default: '',
        },
        backgroundColor: {
          type: 'string',
          default: '',
        },
      };
      break;

    // add text color to File and ListItem block
    case 'core/list-item':
    case 'core/file':
      settings.supports = {
        ...settings.supports,
        color: {
          ...settings.supports.color,
          text: true,
          background: false,
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
}

addFilter('blocks.registerBlockType', 'px/set_default_alignment', setDefaultAlignment);
addFilter('blocks.registerBlockType', 'px/set_default_spacing', setDefaultSpacing);
addFilter('blocks.registerBlockType', 'px/set_default_typography', setDefaultTypography);
addFilter('blocks.registerBlockType', 'px/set_default_color', setDefaultColor);