import { compose } from '@wordpress/compose';
import { select } from '@wordpress/data';
import {
  getColorObjectByColorValue,
  InspectorControls,
  withColors,
  __experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseGradient,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

export default function ColorDropdown({ attribute, label, hasGradient, props }) {
  const { clientId } = props;
  const colorGradientSettings = useMultipleOriginColorsAndGradients();

  const color = props[`${attribute}`];
  const attributeTitlecase = attribute.charAt(0).toUpperCase() + attribute.slice(1);
  const setColor = props[`set${attributeTitlecase}`];

  const settings = {
    label,
    colorValue: color.color,
    onColorChange: (val) => {
      setColor(val);
      props.setAttributes({ iconColorValue: val });
      // console.log(val);
      // const editorSettings = select('core/editor').getEditorSettings();
      // const colorValue = getColorObjectByColorValue(editorSettings.colors, val);
      // setColor(colorValue);
    },
    isShownByDefault: true,
    resetAllFilter: () => ({
      [`${attribute}`]: undefined,
      [`custom${nameTitlecase}`]: undefined,
      gradient: undefined,
      customGradient: undefined,
    }),
  };

  if (hasGradient) {
    const { gradientValue, setGradient } = __experimentalUseGradient();
    settings.gradientValue = gradientValue;
    settings.onGradientChange = setGradient;
  }

  return (
    <InspectorControls group="color">
      <ColorGradientSettingsDropdown
        __experimentalIsRenderedInSidebar
        settings={[ settings ]}
        panelId={ clientId }
        { ...colorGradientSettings }
      />
    </InspectorControls>
  );
};

/**
 * Shorthand function to enable color selection in Edit callback
 * 
 * @param function editCallback
 * @param array[string] colorAtts - the attribute name of custom colors
 */
export function withColors(editCallback, colorAtts) {
  const args = {};
  colorAtts.forEach((colorAtt) => {
    args[colorAtt] = 'background-color';
  });

  return compose([ withColors(args) ])(editCallback);
}