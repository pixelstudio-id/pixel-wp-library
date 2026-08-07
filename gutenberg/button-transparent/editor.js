import './editor.sass';

const { registerBlockStyle } = window.wp.blocks;

registerBlockStyle('core/button', {
  name: 'px-transparent',
  label: 'Transparent'
});