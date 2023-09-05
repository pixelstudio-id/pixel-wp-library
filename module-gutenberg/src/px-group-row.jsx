import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import {
  InspectorControls,
  useBlockProps,
} from '@wordpress/block-editor';
import {
  Button,
  ButtonGroup,
  PanelBody,
} from '@wordpress/components';

/**
 * Add extra attribute to Cover block for the mobile image
 */
addFilter('blocks.registerBlockType', 'extend-group-row/attributes', (settings, name) => {
  // Do nothing if it's another block than our defined ones.
  if (!['core/group'].includes(name)) {
    return settings;
  }

  settings.attributes = {
    ...settings.attributes,
    pxRowColumns: { type: 'number', default: 'auto' },
  };

  return settings;
});

/**
 * Add a new setting in Inspector to upload mobile image
 */
const addControl = createHigherOrderComponent((BlockEdit) => {
  return function (props) {
    // Do nothing if it's another block than our defined ones.
    if (!['core/group'].includes(props.name)) {
      return (
        <BlockEdit {...props} />
      );
    }

    const atts = props.attributes;
    // const wrapperProps = {
    //   ...props.wrapperProps,
    //   className: `has-columns-${atts.pxRowColumns} ${props.className}`,
    // };

    // propss.className = `has-columns-${atts.pxRowColumns}`;

    // Do nothing if not flex group
    if (atts.layout.type !== 'flex') {
      return (
        <BlockEdit {...props} />
      );
    }

    return (
      <>
        <BlockEdit {...props} />
        <InspectorControls>
          <PanelBody title="Row Columns" initialOpen="true">
            <ButtonGroup aria-label="Row Columns">
              { ['auto', 2, 3, 4].map((buttonValue) => (
                <Button
                  key={`row-columns-${buttonValue}`}
                  variant={buttonValue === atts.pxRowColumns ? 'primary' : undefined}
                  onClick={() => {
                    const newAtts = { pxRowColumns: buttonValue };
                    const currentClasses = atts.className || '';

                    if (buttonValue === 'auto') {
                      newAtts.className = currentClasses.replace(/px-has-columns-\d/, '');
                    } else {
                      newAtts.className = currentClasses.match(/px-has-columns-\d/)
                        ? currentClasses.replace(/px-has-columns-\d/, `px-has-columns-${buttonValue}`)
                        : `${currentClasses} px-has-columns-${buttonValue}`;
                    }

                    props.setAttributes(newAtts);
                  }}
                >
                  { buttonValue }
                </Button>
              ))}
            </ButtonGroup>
          </PanelBody>
        </InspectorControls>
      </>
    );
  };
}, 'withInspectorControl');

addFilter('editor.BlockEdit', 'extend-group-row/edit', addControl);
