import './editor.sass';

const { registerBlockStyle } = window.wp.blocks;

// DESIGN
registerBlockStyle('core/button', { name: 'px-transparent', label: 'Transparent' });
registerBlockStyle('core/columns', { name: 'px-wide-gap', label: 'Wide Gap' });
registerBlockStyle('core/columns', { name: 'px-no-gap', label: 'No Gap' });
// registerBlockStyle('core/spacer', { name: 'px-negative', label: 'Negative' }); // @deprecated - replaced by negative margin

// MEDIA
registerBlockStyle('core/gallery', { name: 'px-slider', label: 'Slider' });
registerBlockStyle('core/gallery', { name: 'px-thumbnails', label: 'Thumbnails' });
registerBlockStyle('core/cover', { name: 'px-below-header', label: 'Below Header' });

// TEXT
registerBlockStyle('core/list', { name: 'px-inline', label: 'Inline' });
// register_block_style('core/table', { name: 'px-full-color', label: 'Full Color' });
// register_block_style('core/quote', { name: 'px-timeline', label: 'Timeline' });
registerBlockStyle('core/quote', { name: 'px-testimony', label: 'Testimony' });