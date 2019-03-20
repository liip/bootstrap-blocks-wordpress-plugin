/**
 * BLOCK: bootstrap-blocks/row
 */

//  Import CSS.
import './style.scss';
import './editor.scss';
import config from '../config';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks, InspectorControls } = wp.editor;
const { SelectControl, CheckboxControl, PanelBody } = wp.components;
const { Fragment } = wp.element;
const { dispatch, select } = wp.data;
const { applyFilters } = wp.hooks;

const ALLOWED_BLOCKS = [ `${ config.namespace }/column` ];
let templates = {
	'1-1': {
		label: __( '2 Columns (1:1)', config.textDomain ),
		templateLock: 'all',
		blocks: [
			[
				`${ config.namespace }/column`,
				{
					sizeMd: 6,
				},
			],
			[
				`${ config.namespace }/column`,
				{
					sizeMd: 6,
				},
			],
		],
	},
	'1-2': {
		label: __( '2 Columns (1:2)', config.textDomain ),
		templateLock: 'all',
		blocks: [
			[
				`${ config.namespace }/column`,
				{
					sizeMd: 4,
				},
			],
			[
				`${ config.namespace }/column`,
				{
					sizeMd: 8,
				},
			],
		],
	},
	'2-1': {
		label: __( '2 Columns (2:1)', config.textDomain ),
		templateLock: 'all',
		blocks: [
			[
				`${ config.namespace }/column`,
				{
					sizeMd: 8,
				},
			],
			[
				`${ config.namespace }/column`,
				{
					sizeMd: 4,
				},
			],
		],
	},
	'1-1-1': {
		label: __( '3 Columns (1:1:1)', config.textDomain ),
		templateLock: 'all',
		blocks: [
			[
				`${ config.namespace }/column`,
				{
					sizeMd: 4,
				},
			],
			[
				`${ config.namespace }/column`,
				{
					sizeMd: 4,
				},
			],
			[
				`${ config.namespace }/column`,
				{
					sizeMd: 4,
				},
			],
		],
	},
};
templates = applyFilters( 'bootstrapBlocks.bootstrapRowTemplates', templates );

const enableCustomTemplate = applyFilters( 'bootstrapBlocks.enableCustomTemplate', true );
if ( enableCustomTemplate ) {
	templates.custom = {
		label: __( 'Custom', config.textDomain ),
		templateLock: false,
		blocks: [
			[ `${ config.namespace }/column` ],
		],
	};
}

const getColumnsTemplate = ( template ) => {
	return templates[ template ] ? templates[ template ].blocks : [];
};
const getColumnsTemplateLock = ( template ) => {
	return templates[ template ] ? templates[ template ].templateLock : false;
};

registerBlockType( `${ config.namespace }/row`, {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Row', config.textDomain ), // Block title.
	icon: 'layout', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Bootstrap Blocks', config.textDomain ),
		__( 'Bootstrap', config.textDomain ),
		__( 'Row', config.textDomain ),
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
	},

	edit( { className, attributes, setAttributes, clientId } ) {
		const { template } = attributes;
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

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<SelectControl
							label={ __( 'Template', config.textDomain ) }
							value={ template }
							options={ templateOptions }
							onChange={ ( selectedTemplate ) => {
								onChangeTemplate( selectedTemplate );
							} }
						/>
						<CheckboxControl
							label={ __( 'No Gutters', config.textDomain ) }
							checked={ attributes.noGutters }
							onChange={ ( isChecked ) => {
								onChangeGutters( isChecked );
							} }
						/>
					</PanelBody>
				</InspectorControls>
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
