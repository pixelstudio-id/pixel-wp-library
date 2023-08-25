import {
  useBlockProps,
  RichText,
  BlockControls,
  InspectorControls,
} from '@wordpress/block-editor';
import {
  ToggleControl,
  PanelBody,
  ToolbarGroup,
  ToolbarButton,
} from '@wordpress/components';

export default function edit(props) {
  const atts = props.attributes;
  const blockProps = useBlockProps();
  const isOpen = (props.isSelected || atts.initiallyOpen) ? true : undefined;

  return (
    <>
      <InspectorControls>
        <PanelBody
          title="Settings"
          initialOpen
        >
          <ToggleControl
            label="Open by default?"
            checked={atts.initiallyOpen}
            onChange={(value) => props.setAttributes({ initiallyOpen: value })}
          />
          <ToggleControl
            label="No Index?"
            checked={atts.noIndex}
            onChange={(value) => props.setAttributes({ noIndex: value })}
            help="Exclude this question from SEO Schema data."
          />
        </PanelBody>
      </InspectorControls>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            title="Open by default"
            icon="fullscreen-alt"
            className={atts.initiallyOpen ? 'is-pressed' : ''}
            onClick={() => props.setAttributes({ initiallyOpen: !atts.initiallyOpen })}
          />
          <ToolbarButton
            title="No SEO Index"
            icon="hidden"
            className={atts.noIndex ? 'is-pressed' : ''}
            onClick={() => props.setAttributes({ noIndex: !atts.noIndex })}
          />
        </ToolbarGroup>
      </BlockControls>
      <details
        {...blockProps}
        open={isOpen}
      >
        <summary
          className="wp-block-px-faq__question"
        >
          <RichText
            tagName="span"
            value={atts.question}
            placeholder="Enter the Question..."
            onChange={(value) => {
              props.setAttributes({ question: value });
            }}
            onClick={(e) => e.preventDefault()}
          />
        </summary>
        <RichText
          tagName="div"
          className="wp-block-px-faq__answer"
          value={atts.answer}
          multiline="p"
          placeholder="Enter the Answer..."
          onChange={(value) => {
            props.setAttributes({ answer: value });
          }}
        />
      </details>
    </>
  );
}
