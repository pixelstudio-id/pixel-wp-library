import {
  InspectorControls,
  __experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseGradient,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

export default function ColorDropdown({ name, props }) {
  const { clientId } = props;
  const { gradientValue, setGradient } = __experimentalUseGradient();
  const colorGradientSettings = useMultipleOriginColorsAndGradients();

  const color = props[`${name}Color`];
  const nameTitlecase = name.charAt(0).toUpperCase() + name.slice(1);
  const setColor = props[`set${nameTitlecase}Color`];

  return (
    <InspectorControls group="color">
      <ColorGradientSettingsDropdown
        __experimentalIsRenderedInSidebar
        settings={[
          {
            colorValue: color.color,
            gradientValue,
            label: `${nameTitlecase} Color`,
            onColorChange: (val) => { setColor(val) },
            onGradientChange: setGradient,
            isShownByDefault: true,
            resetAllFilter: () => ({
              iconColor: undefined,
              customIconColor: undefined,
              gradient: undefined,
              customGradient: undefined,
            }),
          },
        ]}
        panelId={ clientId }
        { ...colorGradientSettings }
      />
    </InspectorControls>
  );
};