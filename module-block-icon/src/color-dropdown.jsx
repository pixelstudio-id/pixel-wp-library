import {
  useBlockProps,
  InspectorControls,
  __experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
  __experimentalUseGradient,
  __experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

export default function ColorDropdown({ name, label, hasGradient, props }) {
  const { attributes, setAttributes, clientId } = props;
  const blockProps = useBlockProps();
  const colorGradientSettings = useMultipleOriginColorsAndGradients();

  if (blockProps && attributes.iconColor) {
    blockProps.style[`--${name}`] = attributes.iconColor;
  }

  const settings = {
    label,
    colorValue: attributes[name],
    onColorChange: (val) => {
      setAttributes({ [name]: val });
    },
    isShownByDefault: true,
    resetAllFilter: () => ({
      [`${attributes}`]: undefined,
      gradient: undefined,
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
        settings={[settings]}
        panelId={clientId}
        {...colorGradientSettings}
      />
    </InspectorControls>
  );
};
