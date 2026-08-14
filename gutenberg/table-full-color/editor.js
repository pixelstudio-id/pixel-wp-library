import './editor.sass';

const { registerBlockStyle } = window.wp.blocks;

registerBlockStyle('core/table', {
  name: 'px-full-color',
  label: 'Full Color',
});
