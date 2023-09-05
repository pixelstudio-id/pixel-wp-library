import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent, useInstanceId } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import {
  InspectorControls,
  MediaUpload,
} from '@wordpress/block-editor';
import {
  Button,
  PanelBody,
  __experimentalUnitControl as UnitControl,
} from '@wordpress/components';

/**
 * Add extra attribute to Cover block for the mobile image
 */
addFilter('blocks.registerBlockType', 'extend-cover/attributes', (settings, name) => {
  // Do nothing if it's another block than our defined ones.
  if (!['core/cover'].includes(name)) {
    return settings;
  }

  settings.attributes = {
    ...settings.attributes,
    pxMobileMediaID: { type: 'number' },
    pxMobileMediaURL: { type: 'string' },
    pxMobileHeight: { type: 'string', default: '400px' },
  };

  return settings;
});

/**
 * Add a new setting in Inspector to upload mobile image
 */
const addControl = createHigherOrderComponent((BlockEdit) => {
  return function (props) {
    // Do nothing if it's another block than our defined ones.
    if (!['core/cover'].includes(props.name)) {
      return (
        <BlockEdit {...props} />
      );
    }

    const atts = props.attributes;

    return (
      <Fragment>
        <BlockEdit {...props} />
        <InspectorControls>
          <PanelBody title="Mobile Cover" initialOpen="true">
            <UnitControl
              id={`block-cover-mobile-height-input-${useInstanceId(UnitControl)}`}
              label="Mobile Height"
              value={atts.pxMobileHeight}
              onChange={(newValue) => {
                props.setAttributes({ pxMobileHeight: newValue });
              }}
              isResetValueOnUnitChange
              __unstableInputWidth="80px"
            />
            <p>&nbsp;</p>
            <p>Leave empty to use the primary image in mobile.</p>
            <div>
              { atts.pxMobileMediaURL && <img src={atts.pxMobileMediaURL} /> }

              <MediaUpload
                allowedTypes="image"
                value={atts.pxMobileMediaID}
                onSelect={(media) => {
                  props.setAttributes({
                    pxMobileMediaID: media.id,
                    pxMobileMediaURL: media.url,
                  });
                }}
                render={renderImageButton}
              />
            </div>
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );

    /**
     * Render image upload button in sidebar
     */
    function renderImageButton(obj) {
      return (
        <>
          <Button className="button" onClick={obj.open}>
            { atts.pxMobileMediaID ? 'Change image' : 'Upload image' }
          </Button>
          { atts.pxMobileMediaID && (
            <Button onClick={() => props.setAttributes({ pxMobileMediaURL: null, pxMobileMediaID: null })}>
              Remove
            </Button>
          )}
        </>
      );
    }
  };
}, 'withInspectorControl');

addFilter('editor.BlockEdit', 'extend-cover/edit', addControl);
