import './editor.sass';

const { registerBlockStyle } = window.wp.blocks;

registerBlockStyle('core/list', {
  name: 'px-inline',
  label: 'Inline',
});
