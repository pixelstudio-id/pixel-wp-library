/**
 * WordPress dependencies
 */
import { __, _x, isRTL } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import {
  RichText,
  BlockControls,
  RichTextShortcut,
  useBlockProps,
} from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import {
  formatListBullets,
  formatListBulletsRTL,
  formatListNumbered,
  formatListNumberedRTL,
  formatIndent,
  formatIndentRTL,
  formatOutdent,
  formatOutdentRTL,
} from '@wordpress/icons';
import {
  isActiveListType,
  canOutdentListItems,
  canIndentListItems,
  indentListItems,
  outdentListItems,
  changeListType,
  isListRootSelected,
} from './helpers.jsx';

/**
 * Internal dependencies
 */
import blockJSON from './block.json';
import OrderedListSettings from './ordered-list-settings.jsx';

export default function ListEdit( {
  attributes,
  setAttributes,
  mergeBlocks,
  onReplace,
  style,
} ) {
  const { ordered, values, type, reversed, start, placeholder } = attributes;
  const { name } = blockJSON;
  const tagName = ordered ? 'ol' : 'ul';

  const controls = ( { value, onChange, onFocus } ) => (
    <>
      <RichTextShortcut
        type="primary"
        character="["
        onUse={ () => {
          onChange( outdentListItems( value ) );
        } }
      />
      <RichTextShortcut
        type="primary"
        character="]"
        onUse={ () => {
          onChange( indentListItems( value, { type: tagName } ) );
        } }
      />
      <RichTextShortcut
        type="primary"
        character="m"
        onUse={ () => {
          onChange( indentListItems( value, { type: tagName } ) );
        } }
      />
      <RichTextShortcut
        type="primaryShift"
        character="m"
        onUse={ () => {
          onChange( outdentListItems( value ) );
        } }
      />
      <BlockControls group="block">
        <ToolbarButton
          icon={ isRTL() ? formatListBulletsRTL : formatListBullets }
          title={ __( 'Unordered' ) }
          describedBy={ __( 'Convert to unordered list' ) }
          isActive={ isActiveListType( value, 'ul', tagName ) }
          onClick={ () => {
            onChange( changeListType( value, { type: 'ul' } ) );
            onFocus();

            if ( isListRootSelected( value ) ) {
              setAttributes( { ordered: false } );
            }
          } }
        />
        <ToolbarButton
          icon={
            isRTL() ? formatListNumberedRTL : formatListNumbered
          }
          title={ __( 'Ordered' ) }
          describedBy={ __( 'Convert to ordered list' ) }
          isActive={ isActiveListType( value, 'ol', tagName ) }
          onClick={ () => {
            onChange( changeListType( value, { type: 'ol' } ) );
            onFocus();

            if ( isListRootSelected( value ) ) {
              setAttributes( { ordered: true } );
            }
          } }
        />
        <ToolbarButton
          icon={ isRTL() ? formatOutdentRTL : formatOutdent }
          title={ __( 'Outdent' ) }
          describedBy={ __( 'Outdent list item' ) }
          shortcut={ _x( 'Backspace', 'keyboard key' ) }
          isDisabled={ ! canOutdentListItems( value ) }
          onClick={ () => {
            onChange( outdentListItems( value ) );
            onFocus();
          } }
        />
        <ToolbarButton
          icon={ isRTL() ? formatIndentRTL : formatIndent }
          title={ __( 'Indent' ) }
          describedBy={ __( 'Indent list item' ) }
          shortcut={ _x( 'Space', 'keyboard key' ) }
          isDisabled={ ! canIndentListItems( value ) }
          onClick={ () => {
            onChange( indentListItems( value, { type: tagName } ) );
            onFocus();
          } }
        />

        
      </BlockControls>
    </>
  );

  const blockProps = useBlockProps( {
    style,
  } );

  return (
    <>
      <RichText
        identifier="values"
        multiline="li"
        tagName={ tagName }
        onChange={ ( nextValues ) =>
          setAttributes( { values: nextValues } )
        }
        value={ values }
        aria-label={ __( 'List text' ) }
        placeholder={ placeholder || __( 'List' ) }
        onMerge={ mergeBlocks }
        onSplit={ ( value ) =>
          createBlock( name, { ...attributes, values: value } )
        }
        __unstableOnSplitMiddle={ () =>
          createBlock( 'core/paragraph' )
        }
        onReplace={ onReplace }
        onRemove={ () => onReplace( [] ) }
        start={ start }
        reversed={ reversed }
        type={ type }
        { ...blockProps }
      >
        { controls }
      </RichText>
      { ordered && (
        <OrderedListSettings
          setAttributes={ setAttributes }
          ordered={ ordered }
          reversed={ reversed }
          start={ start }
          placeholder={ placeholder }
        />
      ) }
    </>
  );
}
