import './editor.sass';

const { registerBlockStyle } = window.wp.blocks;

registerBlockStyle('core/xxx', { name:
  'px-new-style',
  label: 'New Style'
});
