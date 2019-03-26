/**
 * BLOCK: wp-bootstrap-blocks/row
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks, InspectorControls, BlockControls, AlignmentToolbar } = wp.editor;
const { SelectControl, CheckboxControl, PanelBody, Path, SVG } = wp.components;
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
templates = applyFilters( 'wpBootstrapBlocks.bootstrapRowTemplates', templates );

const enableCustomTemplate = applyFilters( 'wpBootstrapBlocks.enableCustomTemplate', true );
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

	attributes: {
		template: {
			type: 'string',
			default: Object.keys( templates )[ 0 ],
		},
		noGutters: {
			type: 'boolean',
			default: false,
		},
		alignment: {
			type: 'string',
		},
		verticalAlignment: {
			type: 'string',
		},
	},

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
			setAttributes( {
				noGutters: isChecked,
			} );
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
				icon: (
					<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
						<Path d="M51.542,9.5H36.458C34.551,9.5,33,11.051,33,12.958v29.083c0,1.907,1.551,3.458,3.458,3.458h15.083
							c1.907,0,3.458-1.551,3.458-3.458V12.958C55,11.051,53.449,9.5,51.542,9.5z M53,13.5v6v6v6v6v4.542
							c0,0.804-0.654,1.458-1.458,1.458H36.458C35.654,43.5,35,42.846,35,42.042V12.958c0-0.804,0.654-1.458,1.458-1.458h15.083
							c0.804,0,1.458,0.654,1.458,1.458V13.5z" />
						<Path d="M23.542,9.5H8.458C6.551,9.5,5,11.051,5,12.958v39.083C5,53.949,6.551,55.5,8.458,55.5h15.083
							c1.907,0,3.458-1.551,3.458-3.458V12.958C27,11.051,25.449,9.5,23.542,9.5z" />
						<Path d="M59,4.5H1c-0.552,0-1,0.448-1,1s0.448,1,1,1h58c0.552,0,1-0.448,1-1S59.552,4.5,59,4.5z" />
					</SVG>
				),
				title: __( 'Align columns top', 'wp-bootstrap-blocks' ),
				align: 'top',
			},
			{
				icon: (
					<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
						<Path d="M59,29h-4V15.458C55,13.551,53.448,12,51.541,12H36.458C34.551,12,33,13.551,33,15.458V29h-6V10.458
							C27,8.551,25.449,7,23.542,7H8.458C6.551,7,5,8.551,5,10.458V29H1c-0.552,0-1,0.448-1,1s0.448,1,1,1h4v18.542
							C5,51.449,6.551,53,8.458,53h15.083C25.449,53,27,51.449,27,49.542V31h6v13.542C33,46.449,34.551,48,36.458,48h15.083
							C53.449,48,55,46.449,55,44.542V31h4c0.553,0,1-0.448,1-1S59.553,29,59,29z M53,34v6v4.542C53,45.346,52.346,46,51.542,46H36.458
							C35.654,46,35,45.346,35,44.542V15.458C35,14.654,35.654,14,36.458,14h15.083C52.346,14,53,14.654,53,15.458V16v6v6V34z" />
					</SVG>
				),
				title: __( 'Align columns center', 'wp-bootstrap-blocks' ),
				align: 'center',
			},
			{
				icon: (
					<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
						<Path d="M36.458,50.5L36.458,50.5h15.083h0.001c1.669,0,3.065-1.188,3.388-2.762C54.976,47.513,55,47.28,55,47.042V17.958
							c0-1.907-1.551-3.458-3.458-3.458H36.459C34.552,14.5,33,16.051,33,17.958v29.083c0,0.238,0.024,0.471,0.07,0.696
							C33.393,49.312,34.789,50.5,36.458,50.5z M35,17.958c0-0.804,0.654-1.458,1.459-1.458h15.083c0.804,0,1.458,0.654,1.458,1.458V18.5
							v6v6v6v6v4.542c0,0.201-0.041,0.393-0.115,0.567c-0.222,0.523-0.741,0.891-1.344,0.891H36.459c-0.604,0-1.122-0.368-1.344-0.891
							C35.041,47.434,35,47.243,35,47.042V17.958z" />
						<Path d="M8.458,50.5h15.083c1.907,0,3.459-1.551,3.459-3.458V7.958C27,6.051,25.449,4.5,23.542,4.5H8.459
							C6.552,4.5,5,6.051,5,7.958v39.083C5,48.949,6.551,50.5,8.458,50.5z" />
						<Path d="M59,53.5H1c-0.553,0-1,0.448-1,1s0.447,1,1,1h58c0.553,0,1-0.448,1-1S59.553,53.5,59,53.5z" />
					</SVG>
				),
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
						onChange={ ( newVerticalAlignment ) => ( setAttributes( { verticalAlignment: newVerticalAlignment } ) ) }
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
