import './editor.sass';
import { pxFetch } from '@lib/PixelFetch';

import debounce from 'lodash/debounce';

const { wp } = window;
const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const {
  Fragment,
  useEffect,
  useMemo,
} = wp.element;
const {
  __experimentalPanelColorGradientSettings: PanelColorGradientSettings,
  InspectorControls,
} = wp.blockEditor;
const {
  PanelBody,
  TextControl,
  __experimentalToggleGroupControl: ToggleGroupControl,
  __experimentalToggleGroupControlOption: ToggleGroupControlOption,
} = wp.components;

const BLOCK_NAMES = ['core/heading', 'core/list-item', 'core/button'];
const BLOCK_NO_BACKGROUND = ['core/button'];
const BLOCK_HAS_POSITION = ['core/button'];
const CDN_BASE_URL = window.pxIconPrefix.cdnURL;
const FONTAWESOME_SEARCH_URL = window.pxIconPrefix.fontawesomeURL;

const encodeSvgAsDataUri = (svgMarkup) => {
  const compactSvg = svgMarkup
    .replace(/\r?\n|\r/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  const encodedSvg = encodeURIComponent(compactSvg)
    .replace(/%20/g, ' ')
    .replace(/%3D/g, '=')
    .replace(/%3A/g, ':')
    .replace(/%2F/g, '/')
    .replace(/%22/g, "'")
    .replace(/%2C/g, ',');

  return `data:image/svg+xml,${encodedSvg}`;
};

const addIconAttributes = (settings, name) => {
  if (!BLOCK_NAMES.includes(name)) { return settings; }

  settings.attributes = {
    ...settings.attributes,
    pxIconName: {
      type: 'string',
      default: '',
    },
    pxIconUri: {
      type: 'string',
      default: '',
    },
    pxIconColor: {
      type: 'string',
      default: '',
    },
  };

  if (!BLOCK_NO_BACKGROUND.includes(name)) {
    settings.attributes.pxIconBg = {
      type: 'string',
      default: '',
    };
  }

  if (BLOCK_HAS_POSITION.includes(name)) {
    settings.attributes.pxIconPosition = {
      type: 'string',
      default: 'left',
    };
  }

  return settings;
};

const withIconControl = createHigherOrderComponent((BlockEdit) => (props) => {
  if (!BLOCK_NAMES.includes(props.name)) {
    return <BlockEdit { ...props } />;
  }

  const {
    pxIconColor = '',
    pxIconName = '',
    pxIconBg = '',
    pxIconPosition = 'left',
  } = props.attributes;

  const debouncedUpdateIconUri = useMemo(
    () => debounce(async (value) => {
      const nextIconName = (value || '').trim();

      if (!nextIconName) {
        props.setAttributes({ pxIconUri: '' });
        return;
      }

      const iconUrl = `${CDN_BASE_URL}/${encodeURIComponent(nextIconName)}.svg`;

      try {
        const rawSvg = await pxFetch.get(iconUrl, { isJSON: false });
        const iconUri = encodeSvgAsDataUri(rawSvg || '');
        props.setAttributes({ pxIconUri: iconUri });
      } catch (error) {
        props.setAttributes({ pxIconUri: '' });
      }
    }, 500),
    [props.clientId],
  );

  useEffect(() => () => debouncedUpdateIconUri.cancel(), [debouncedUpdateIconUri]);

  const onChange = (value) => {
    props.setAttributes({ pxIconName: value });
    debouncedUpdateIconUri(value);
  };

  let colorPanelSettings = [
    {
      colorValue: pxIconColor,
      label: 'Icon Color',
      onColorChange: (value) => props.setAttributes({ pxIconColor: value || '' }),
    },
  ];
  if (!BLOCK_NO_BACKGROUND.includes(props.name)) {
    colorPanelSettings.push({
      colorValue: pxIconBg,
      label: 'Icon Background',
      onColorChange: (value) => props.setAttributes({ pxIconBg: value || '' }),
    });
  }

  return (
    <Fragment>
      <BlockEdit { ...props } />

      <InspectorControls>
        <PanelBody title="Icon" initialOpen={ false } className="px-icon-inspector">
          <div>
            <TextControl
              label="Icon Name"
              value={ pxIconName }
              onChange={ onChange }
            />
            <small>
              Visit <a href={FONTAWESOME_SEARCH_URL} target="_blank">FontAwesome.com</a> to see list of icons
            </small>
            <PanelColorGradientSettings
              title=""
              settings={colorPanelSettings}
            />
            {BLOCK_HAS_POSITION.includes(props.name) && (
              <ToggleGroupControl
                label="Icon Position"
                value={ pxIconPosition }
                className="px-icon-inspector__position"
                onChange={ (value) => props.setAttributes({ pxIconPosition: value }) }
              >
                <ToggleGroupControlOption value="left" label="Left" />
                <ToggleGroupControlOption value="right" label="Right" />
              </ToggleGroupControl>
            )}
          </div>
        </PanelBody>
      </InspectorControls>

    </Fragment>
  );
}, 'withIconControl');

/**
 * Add inline CSS style to block wrapper during editing.
 * - Frontend will be handled with render callback in PHP
 * - Inline CSS is not saved to database to prevent block broken if this addon is deactivated.
 */
const withIconStyle = createHigherOrderComponent((BlockListBlock) => (props) => {
  if (!BLOCK_NAMES.includes(props.name)) {
    return <BlockListBlock { ...props } />;
  }

  const iconUri = props.attributes?.pxIconUri;
  if (!iconUri) {
    return <BlockListBlock { ...props } />;
  }

  const wrapperProps = props.wrapperProps || {};
  const wrapperStyle = wrapperProps.style || {};

  const style = {
    ...wrapperStyle,
    '--pxIcon': `url("${iconUri}")`,
  };

  const iconColor = (props.attributes && props.attributes.pxIconColor) || '';
  if (iconColor) {
    style['--pxIconColor'] = iconColor;
  }

  const iconBg = (props.attributes && props.attributes.pxIconBg) || '';
  if (iconBg) {
    style['--pxIconBg'] = iconBg;
  }

  // add new class for icon position, remove if 'left' (default)
  const iconPosition = (props.attributes && props.attributes.pxIconPosition) || '';
  if (iconPosition && iconPosition !== 'left') {
    const wrapperClassName = wrapperProps.className || '';
    wrapperProps.className = `${wrapperClassName} is-icon-position-${iconPosition}`;
  } else if (iconPosition === 'left') {
    const wrapperClassName = wrapperProps.className || '';
    wrapperProps.className = wrapperClassName.replace(/\s*is-icon-position-\w+\s*/g, ' ');
  }

  return (
    <BlockListBlock
      { ...props }
      wrapperProps={{
        ...wrapperProps,
        style,
      }}
    />
  );
}, 'withIconStyle');

addFilter('blocks.registerBlockType', 'px/icon-prefix/attributes', addIconAttributes);
addFilter('editor.BlockEdit', 'px/icon-prefix/control', withIconControl);
addFilter('editor.BlockListBlock', 'px/icon-prefix/style', withIconStyle);
