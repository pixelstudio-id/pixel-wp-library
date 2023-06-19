
import {
  useBlockProps,
  RichText,
  BlockControls,
  InspectorControls,
  MediaUpload,
  __experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseGradient,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';
import {
  ToolbarButton,
  ToolbarGroup,
  ToggleControl,
  PanelBody,
  TextControl,
  TextareaControl,
  Button,
} from '@wordpress/components';
import SVGInline from './_react-svg-inline.jsx';
import URLPicker from './_url-picker.jsx';
import ColorDropdown from './color-dropdown.jsx';


function IconEdit (props) {
  const blockProps = useBlockProps();
  const atts = props.attributes;
  const { setAttributes, isSelected } = props;

  let allowedRichTextFormats = [
    'core/bold', 'core/italic', 'core/strikethrough', 'core/subscript', 'core/superscript',
    'core/image', 'core/text-color', 'core/code'
  ];

  // allow link if not fully clickable
  if (!atts.isFullyClickable) {
    allowedRichTextFormats.push('core/link');
  }

  // format className for the div
  let extraClasses = ` px-block-icon has-icon-position-${atts.iconPosition} `;
  extraClasses += atts.description === '<p></p>' || atts.description === '' ? 'has-no-description ' : 'has-description ';
  extraClasses += atts.useImage ? 'use-image ' : '';
  blockProps.className += extraClasses;

  if (atts.iconColor) {
    blockProps.style['--iconColor'] = atts.iconColor;
  }

  let useFontAwesome = !atts.useRawSVG && !atts.useImage;

  return (<>
    <InspectorControls>
      <PanelBody title="Settings" initialOpen="true">
        <ToggleControl
          label="Is Fully Clickable?"
          checked={atts.isFullyClickable}
          onChange={_onToggleFullyClickable}
        />

        { useFontAwesome &&
          <div className="px-icon-control">
            <div>
              <TextControl
                label="Icon Name"
                value={atts.iconName}
                onChange={_updateIconMarkup}
              />
              <small style={{ display: 'block', marginTop: '-1.5rem' }}>
                Visit here to see list of icons: <a href="https://fontawesome.com/v5/search?m=free&s=solid" target="_blank">FontAwesome.com</a>
              </small>
            </div>
            <SVGInline
              src={`${pxLocalizeIcon.iconURL}/${atts.iconName}.svg`}
              onFound={ markup => setAttributes({ iconMarkup: markup }) }
            />
          </div>
        }

        <ToggleControl
          label="Use Raw SVG?"
          checked={atts.useRawSVG}
          onChange={(value) => setAttributes({ useRawSVG: value, useImage: false }) }
        />

        { atts.useRawSVG &&
          <TextareaControl
            label="Raw SVG"
            value={atts.iconMarkup}
            help="Paste in the SVG code here"
            onChange={(value) => setAttributes({ iconMarkup: value })}
          />
        }

        <ToggleControl
          label="Use Image?"
          checked={atts.useImage}
          onChange={(value) => setAttributes({ useImage: value, useRawSVG: false, iconMarkup: '' }) }
        />

        { atts.useImage &&
          <MediaUpload allowedTypes="image"
            value={atts.mediaID}
            onSelect={onSelectImage}
            render={renderImage}
          />
        }
      </PanelBody>
    </InspectorControls>
    { !atts.useImage &&
      <ColorDropdown
        label="Icon Color"
        name="iconColor"
        props={props}
      />
    }

    <BlockControls>
      <ToolbarGroup>
        <ToolbarButton
          icon="table-col-before"
          title="Icon on Left"
          className={atts.iconPosition == 'left' ? 'is-pressed' : ''}
          onClick={() => setAttributes({ iconPosition: 'left' })}
        />
        <ToolbarButton
          icon="table-row-before"
          title="Icon on Top"
          className={atts.iconPosition == 'top' ? 'is-pressed' : ''}
          onClick={() => setAttributes({ iconPosition: 'top' })}
        />
        <ToolbarButton
          icon="table-col-after"
          title="Icon on Right"
          className={ atts.iconPosition == 'right' ? 'is-pressed' : '' }
          onClick={() => setAttributes({ iconPosition: 'right' })}
        />
      </ToolbarGroup>
    </BlockControls>

    {atts.isFullyClickable &&
      <URLPicker
        url={atts.url}
        setAttributes={setAttributes}
        isSelected={isSelected}
        opensInNewTab={atts.linkTarget === '_blank'}
        onToggleOpenInNewTab={(value) => {
          let linkTarget = value ? '_blank' : undefined;
          setAttributes({ linkTarget: linkTarget });
        }}
      />
    }

    <div {...blockProps}>
      {(atts.useImage) ?
        <figure className='px-block-icon__figure'>
          <img src={atts.imageURL} />
        </figure>
      :
        <figure className='px-block-icon__figure'
          dangerouslySetInnerHTML={{ __html: atts.iconMarkup }}>
        </figure>
      }

      <dl className='px-block-icon__content'>
        <RichText
          tagName='dt'
          inline="true"
          placeholder='Enter title…'
          value={atts.heading}
          allowedFormats={allowedRichTextFormats}
          onChange={(value) => setAttributes({ heading: value })}
        />

        <RichText
          tagName='dd'
          multiline='p'
          placeholder='Enter description…'
          value={atts.description}
          allowedFormats={allowedRichTextFormats}
          onChange={(value) => setAttributes({ description: value })}
        />
      </dl>
    </div>
  </>);


  /**
   * Add slight delay before requesting for update 
   */
  function _updateIconMarkup(value) {
    setAttributes({ iconName: value });
  }

  /**
   * Clean the anchor inside heading and description 
   */
  function _onToggleFullyClickable(value) {
    let attsToSet = {
      isFullyClickable: value
    };

    // remove all anchor inside heading and description
    if (value) { 
      let newHeading = atts.heading.replace(/<\/?a[^>]*>/g, '');
      let newDescription = atts.description.replace(/<\/?a[^>]*>/g, '');

      attsToSet['heading'] = newHeading;
      attsToSet['description'] = newDescription;
    }

    setAttributes(attsToSet);
  }

  /**
   * Assign the image data into attribute
   */
  function onSelectImage(image) {
    setAttributes({ imageURL: image.url, imageID: image.id });
  }

  /**
   * Render image (if uploaded) and upload button
   */
  function renderImage(obj) {
    let className = atts.imageID	? 'button button--transparent' : 'button';
    
    return (<>
      <Button className={className} onClick={obj.open}>
        { atts.imageID ? 'Change Image' : 'Upload Image' }
      </Button>
      { atts.imageID &&
        <img className="px-block-icon__image-preview" src={ atts.imageURL } />
      }
    </>);
  }
}

// export default withColors(IconEdit, ['iconColor']);
export default IconEdit;