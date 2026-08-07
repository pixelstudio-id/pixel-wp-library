import './editor.sass';

const { registerBlockStyle } = window.wp.blocks;

registerBlockStyle('core/gallery', {
  name: 'px-thumbnails',
  label: 'Thumbnails'
});
