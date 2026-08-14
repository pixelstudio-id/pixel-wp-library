import './editor.sass';

// @deprecated - too niche

const { registerBlockStyle } = window.wp.blocks;

registerBlockStyle('core/quote', {
  name: 'px-timeline',
  label: 'Timeline',
});
