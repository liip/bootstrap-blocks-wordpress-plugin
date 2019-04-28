/**
 * BLOCK: wp-bootstrap-blocks/row
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

import { alignBottom, alignCenter, alignTop } from './icons';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks, InspectorControls, BlockControls, AlignmentToolbar } = wp.editor;
const { SelectControl, CheckboxControl, PanelBody } = wp.components;
const { Fragment } = wp.element;
const { dispatch, select } = wp.data;
const { applyFilters } = wp.hooks;

const ALLOWED_BLOCKS = [ 'wp-bootstrap-blocks/column' ];
let templates = {
	'1-1': {
		label: __( '2 Columns (1:1)', 'wp-bootstrap-blocks' ),
		templateLock: 'all',
		blocks: [
			[
				'wp-bootstrap-blocks/column',
				{
					sizeMd: 6,
				},
			],
			[
				'wp-bootstrap-blocks/column',
				{
					sizeMd: 6,
				},
			],
		],
	},
	'1-2': {
		label: __( '2 Columns (1:2)', 'wp-bootstrap-blocks' ),
		templateLock: 'all',
		blocks: [
			[
				'wp-bootstrap-blocks/column',
				{
					sizeMd: 4,
				},
			],
			[
				'wp-bootstrap-blocks/column',
				{
					sizeMd: 8,
				},
			],
		],
	},
	'2-1': {
		label: __( '2 Columns (2:1)', 'wp-bootstrap-blocks' ),
		templateLock: 'all',
		blocks: [
			[
				'wp-bootstrap-blocks/column',
				{
					sizeMd: 8,
				},
			],
			[
				'wp-bootstrap-blocks/column',
				{
					sizeMd: 4,
				},
			],
		],
	},
	'1-1-1': {
		label: __( '3 Columns (1:1:1)', 'wp-bootstrap-blocks' ),
		templateLock: 'all',
		blocks: [
			[
				'wp-bootstrap-blocks/column',
				{
					sizeMd: 4,
				},
			],
			[
				'wp-bootstrap-blocks/column',
				{
					sizeMd: 4,
				},
			],
			[
				'wp-bootstrap-blocks/column',
				{
					sizeMd: 4,
				},
			],
		],
	},
};
templates = applyFilters( 'wpBootstrapBlocks.row.templates', templates );

const enableCustomTemplate = applyFilters( 'wpBootstrapBlocks.row.enableCustomTemplate', true );
if ( enableCustomTemplate ) {
	templates.custom = {
		label: __( 'Custom', 'wp-bootstrap-blocks' ),
		templateLock: false,
		blocks: [
			[ 'wp-bootstrap-blocks/column' ],
		],
	};
}

const getColumnsTemplate = ( template ) => {
	return templates[ template ] ? templates[ template ].blocks : [];
};
const getColumnsTemplateLock = ( template ) => {
	return templates[ template ] ? templates[ template ].templateLock : false;
};

registerBlockType( 'wp-bootstrap-blocks/row', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Row', 'wp-bootstrap-blocks' ), // Block title.
	icon: 'layout', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'wp-bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Bootstrap Blocks', 'wp-bootstrap-blocks' ),
		__( 'Bootstrap', 'wp-bootstrap-blocks' ),
		__( 'Row', 'wp-bootstrap-blocks' ),
	],

	supports: {
		align: [ 'full' ],
	},

	// attributes are defined server side with register_block_type(). This is needed to make default attributes available in the blocks render callback.

	getEditWrapperProps( attributes ) {
		return {
			'data-alignment': attributes.alignment,
			'data-vertical-alignment': attributes.verticalAlignment,
		};
	},

	edit( { className, attributes, setAttributes, clientId } ) {
		const { template, noGutters, alignment, verticalAlignment } = attributes;
		const templateOptions = [];
		Object.keys( templates ).forEach( ( templateName ) => {
			templateOptions.push( {
				label: templates[ templateName ].label,
				value: templateName,
			} );
		} );
		const onChangeTemplate = ( selectedTemplate ) => {
			// Grab columns of existing block
			const cols = select( 'core/editor' ).getBlocksByClientId( clientId )[ 0 ].innerBlocks;

			// Update sizes to fit with selected template
			cols.forEach( ( col, index ) => {
				if ( templates[ selectedTemplate ] && templates[ selectedTemplate ].blocks.length > index ) {
					const newAttributes = templates[ selectedTemplate ].blocks[ index ][ 1 ];
					dispatch( 'core/editor' ).updateBlockAttributes( col.clientId, newAttributes );
				}
			} );

			setAttributes( {
				template: selectedTemplate,
			} );
		};

		const onChangeGutters = ( isChecked ) => {
			// Grab columns of existing block
			const cols = select( 'core/editor' ).getBlocksByClientId( clientId )[ 0 ].innerBlocks;

			cols.forEach( ( col ) => {
				dispatch( 'core/editor' ).updateBlockAttributes( col.clientId, { parentNoGutters: isChecked } );
			} );

			setAttributes( {
				noGutters: isChecked,
			} );
		};

		const onChangeVerticalAlignment = ( newVerticalAlignment ) => {
			// Grab columns of existing block
			const cols = select( 'core/editor' ).getBlocksByClientId( clientId )[ 0 ].innerBlocks;

			cols.forEach( ( col ) => {
				dispatch( 'core/editor' ).updateBlockAttributes( col.clientId, { parentVerticalAlignment: newVerticalAlignment } );
			} );

			setAttributes( { verticalAlignment: newVerticalAlignment } );
		};

		const alignmentControls = [
			{
				icon: 'editor-alignleft',
				title: __( 'Align columns left', 'wp-bootstrap-blocks' ),
				align: 'left',
			},
			{
				icon: 'editor-aligncenter',
				title: __( 'Align columns center', 'wp-bootstrap-blocks' ),
				align: 'center',
			},
			{
				icon: 'editor-alignright',
				title: __( 'Align columns right', 'wp-bootstrap-blocks' ),
				align: 'right',
			},
		];

		const verticalAlignmentControls = [
			{
				icon: alignTop,
				title: __( 'Align columns top', 'wp-bootstrap-blocks' ),
				align: 'top',
			},
			{
				icon: alignCenter,
				title: __( 'Align columns center', 'wp-bootstrap-blocks' ),
				align: 'center',
			},
			{
				icon: alignBottom,
				title: __( 'Align columns bottom', 'wp-bootstrap-blocks' ),
				align: 'bottom',
			},
		];

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<SelectControl
							label={ __( 'Template', 'wp-bootstrap-blocks' ) }
							value={ template }
							options={ templateOptions }
							onChange={ ( selectedTemplate ) => {
								onChangeTemplate( selectedTemplate );
							} }
						/>
						<CheckboxControl
							label={ __( 'No Gutters', 'wp-bootstrap-blocks' ) }
							checked={ noGutters }
							onChange={ ( isChecked ) => {
								onChangeGutters( isChecked );
							} }
						/>
					</PanelBody>
				</InspectorControls>
				<BlockControls>
					<AlignmentToolbar
						value={ alignment }
						onChange={ ( newAlignment ) => ( setAttributes( { alignment: newAlignment } ) ) }
						alignmentControls={ alignmentControls }
					/>
					<AlignmentToolbar
						value={ verticalAlignment }
						onChange={ ( newVerticalAlignment ) => onChangeVerticalAlignment( newVerticalAlignment ) }
						alignmentControls={ verticalAlignmentControls }
					/>
				</BlockControls>
				<div className={ className }>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ getColumnsTemplate( template ) }
						templateLock={ getColumnsTemplateLock( template ) }
					/>
				</div>
			</Fragment>
		);
	},

	save() {
		return (
			<InnerBlocks.Content />
		);
	},
} );
