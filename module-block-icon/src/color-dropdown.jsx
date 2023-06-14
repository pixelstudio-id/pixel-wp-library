import {
  InspectorControls,
  __experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseGradient,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

export default function ColorDropdown({ name, hasGradient, props }) {
  const { clientId } = props;
  const colorGradientSettings = useMultipleOriginColorsAndGradients();

  const color = props[`${name}Color`];
  const nameTitlecase = name.charAt(0).toUpperCase() + name.slice(1);
  const setColor = props[`set${nameTitlecase}Color`];

  const settings = {
    colorValue: color.color,
    label: `${nameTitlecase} Color`,
    onColorChange: (val) => {
      setColor(val);
    },
    isShownByDefault: true,
    resetAllFilter: () => ({
      [`${name}Color`]: undefined,
      [`custom${nameTitlecase}Color`]: undefined,
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