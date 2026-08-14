import './editor.sass';

const { registerBlockStyle } = window.wp.blocks;

registerBlockStyle('core/columns', {
  name: 'px-wide-gap',
  label: 'Wide Gap',
});
registerBlockStyle('core/columns', {
  name: 'px-no-gap',
  label: 'No Gap',
});
