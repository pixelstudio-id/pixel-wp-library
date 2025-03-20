
import {
  useBlockProps,
  RichText,
  BlockControls,
  InspectorControls,
  MediaUpload,
} from '@wordpress/block-editor';
import {
  ToolbarButton,
  ToolbarGroup,
  ToggleControl,
  PanelBody,
  TextControl,
  TextareaControl,
  Button,
  FontSizePicker,
} from '@wordpress/components';
import SVGInline from './_react-svg-inline.jsx';
import URLPicker from './_url-picker.jsx';
import ColorDropdown from './color-dropdown.jsx';

function IconEdit(props) {
  const blockProps = useBlockProps();
  const { attributes, setAttributes, isSelected } = props;
  const atts = attributes;

  const allowedRichTextFormats = [
    'core/bold', 'core/italic', 'core/strikethrough', 'core/subscript', 'core/superscript',
    'core/image', 'core/text-color', 'core/code',
  ];

  // allow link if not fully clickable
  if (!atts.isFullyClickable) {
    allowedRichTextFormats.push('core/link');
  }

  // format className for the div
  let extraClasses = ` has-icon-position-${atts.iconPosition} `;
  extraClasses += atts.heading === '<p></p>' || atts.heading === '' ? 'has-no-heading ' : 'has-heading ';
  extraClasses += atts.description === '<p></p>' || atts.description === '' ? 'has-no-description ' : 'has-description ';
  extraClasses += atts.useImage ? 'use-image ' : '';
  extraClasses += atts.iconSize && atts.iconSize !== 'medium' ? `size-${atts.iconSize} ` : '';
  blockProps.className += extraClasses;

  if (atts.iconColor) {
    blockProps.style['--iconColor'] = atts.iconColor;
  }

  const useFontAwesome = !atts.useRawSVG && !atts.useImage;

  return (
    <>
      <InspectorControls>
        <PanelBody title="Settings" initialOpen="true">
          <ToggleControl
            label="Is Fully Clickable?"
            checked={atts.isFullyClickable}
            onChange={onToggleFullyClickable}
          />

          { useFontAwesome && (
            <div className="px-icon-control">
              <div>
                <TextControl
                  label="Icon Name"
                  value={atts.iconName}
                  onChange={updateIconMarkup}
                />
                <small style={{ display: 'block', marginTop: '-1.5rem' }}>
                  Visit here to see list of icons: 
                  <a href={`${window.pxLocalizeIcon.fontawesomeURL}`} target="_blank" rel="noreferrer">
                    FontAwesome.com
                  </a>
                </small>
              </div>
              <SVGInline
                src={`${window.pxLocalizeIcon.iconURL}/${atts.iconName}.svg`}
                onFound={(markup) => setAttributes({ iconMarkup: markup }) }
              />
            </div>
          )}

          <ToggleControl
            label="Use Raw SVG?"
            checked={atts.useRawSVG}
            onChange={(value) => setAttributes({ useRawSVG: value, useImage: false }) }
          />

          { atts.useRawSVG && (
            <TextareaControl
              label="Raw SVG"
              value={atts.iconMarkup}
              help="Paste in the SVG code here"
              onChange={(value) => setAttributes({ iconMarkup: value })}
            />
          )}

          <ToggleControl
            label="Use Image?"
            checked={atts.useImage}
            onChange={(value) => setAttributes({ useImage: value, useRawSVG: false, iconMarkup: '' }) }
          />

          { atts.useImage && (
            <MediaUpload
              allowedTypes="image"
              value={atts.mediaID}
              onSelect={onSelectImage}
              render={renderImage}
            />
          )}
        </PanelBody>
        <PanelBody title="Size" initialOpen="false">
          <FontSizePicker
            fontSizes={[
              { name: 'Small', slug: 'small', size: 'small' },
              { name: 'Medium', slug: 'medium', size: 'medium' },
              { name: 'Large', slug: 'large', size: 'large' },
            ]}
            value={atts.iconSize}
            fallbackFontSize={16}
            onChange={(newSize) => setAttributes({ iconSize: newSize })}
            disableCustomFontSizes={true}
          />
        </PanelBody>
      </InspectorControls>

      { !atts.useImage && (
        <ColorDropdown
          label="Icon Color"
          name="iconColor"
          props={props}
        />
      )}

      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            icon="table-col-before"
            title="Icon on Left"
            className={atts.iconPosition === 'left' ? 'is-pressed' : ''}
            onClick={() => setAttributes({ iconPosition: 'left' })}
          />
          <ToolbarButton
            icon="table-row-before"
            title="Icon on Top"
            className={atts.iconPosition === 'top' ? 'is-pressed' : ''}
            onClick={() => setAttributes({ iconPosition: 'top' })}
          />
          <ToolbarButton
            icon="table-col-after"
            title="Icon on Right"
            className={atts.iconPosition === 'right' ? 'is-pressed' : ''}
            onClick={() => setAttributes({ iconPosition: 'right' })}
          />
        </ToolbarGroup>
      </BlockControls>

      {atts.isFullyClickable && (
        <URLPicker
          url={atts.url}
          setAttributes={setAttributes}
          isSelected={isSelected}
          opensInNewTab={atts.linkTarget === '_blank'}
          onToggleOpenInNewTab={(value) => {
            const linkTarget = value ? '_blank' : undefined;
            setAttributes({ linkTarget });
          }}
        />
      )}

      <div {...blockProps}>
        {(atts.useImage) ? (
          <figure className="wp-block-px-icon__figure">
            <img src={atts.imageURL} alt="" />
          </figure>
        ) : (
          <figure
            className="wp-block-px-icon__figure"
            dangerouslySetInnerHTML={{ __html: atts.iconMarkup }}
          />
        )}

        <dl className="wp-block-px-icon__content">
          <RichText
            tagName="dt"
            inline="true"
            placeholder="Enter title…"
            value={atts.heading}
            allowedFormats={allowedRichTextFormats}
            onChange={(value) => setAttributes({ heading: value })}
          />

          <RichText
            tagName="dd"
            multiline="p"
            placeholder="Enter description…"
            value={atts.description}
            allowedFormats={allowedRichTextFormats}
            onChange={(value) => setAttributes({ description: value })}
          />
        </dl>
      </div>
    </>
  );

  /**
   * Add slight delay before requesting for update
   */
  function updateIconMarkup(value) {
    setAttributes({ iconName: value });
  }

  /**
   * Clean the anchor inside heading and description
   */
  function onToggleFullyClickable(value) {
    const attsToSet = {
      isFullyClickable: value,
    };

    // remove all anchor inside heading and description
    if (value) {
      attsToSet.heading = atts.heading.replace(/<\/?a[^>]*>/g, '');
      attsToSet.description = atts.description.replace(/<\/?a[^>]*>/g, '');
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
    const className = atts.imageID ? 'button button--transparent' : 'button';

    return (
      <div className="wp-block-px-icon__image-field">
        <Button className={className} onClick={obj.open}>
          { atts.imageID ? 'Change Image' : 'Upload Image' }
        </Button>
        { atts.imageID && (
          <img
            className="wp-block-px-icon__image-preview"
            src={atts.imageURL}
            alt=""
          />
        )}
      </div>
    );
  }
}

export default IconEdit;
