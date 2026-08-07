import './editor.sass';

const { registerBlockStyle } = window.wp.blocks;

registerBlockStyle('core/quote', {
  name: 'px-testimony',
  label: 'Testimony'
});