/**
 * BLOCK: bootstrap-blocks/container
 */

//  Import CSS.
import './editor.scss';
import config from '../config';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks, InspectorControls } = wp.editor;
const { SelectControl, CheckboxControl, PanelBody } = wp.components;
const { Fragment } = wp.element;
const { applyFilters } = wp.hooks;

const useFluidContainerPerDefault = applyFilters( 'bootstrapBlocks.container.useFluidContainerPerDefault', true );

let customMarginOptions = [
	{
		label: __( 'Small', config.textDomain ),
		value: 'mb-2',
	},
	{
		label: __( 'Medium', config.textDomain ),
		value: 'mb-3',
	},
	{
		label: __( 'Large', config.textDomain ),
		value: 'mb-5',
	},
]
customMarginOptions = applyFilters( 'bootstrapBlocks.container.customMarginOptions', customMarginOptions );

const marginOptions = [
	{
		label: __( 'None', config.textDomain ),
		value: 'mb-0',
	},
	...customMarginOptions
];

registerBlockType( `${ config.namespace }/container`, {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Bootstrap Blocks Container', config.textDomain ), // Block title.
	icon: 'feedback', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Bootstrap Blocks', config.textDomain ),
		__( 'Bootstrap', config.textDomain ),
		__( 'Container', config.textDomain ),
	],

	supports: {
		align: false,
	},

	attributes: {
		isFluid: {
			type: 'boolean',
		},
		marginAfter: {
			type: 'string',
			default: marginOptions[0].value,
		}
	},

	edit( { className, attributes, setAttributes } ) {
		const { isFluid, marginAfter } = attributes;

		// Ensure that isFluid value is set (when block gets added value is undefined -> use default value in this case)
		if ( isFluid === undefined ) {
			setAttributes( { isFluid: useFluidContainerPerDefault } );
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<CheckboxControl
							label={ __( 'Fluid', config.textDomain ) }
							checked={ isFluid }
							onChange={ ( isChecked ) => {
								setAttributes( { isFluid: isChecked } );
							} }
						/>
						<SelectControl
							label={ __( 'Margin After', config.textDomain ) }
							value={ marginAfter }
							options={ marginOptions }
							onChange={ ( selectedMargin ) => {
								setAttributes( { marginAfter: selectedMargin } );
							} }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ className }>
					<InnerBlocks />
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
