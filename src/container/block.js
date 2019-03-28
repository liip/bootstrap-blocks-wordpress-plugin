/**
 * BLOCK: wp-bootstrap-blocks/container
 */

//  Import CSS.
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks, InspectorControls } = wp.editor;
const { SelectControl, CheckboxControl, PanelBody } = wp.components;
const { Fragment } = wp.element;
const { applyFilters } = wp.hooks;

const useFluidContainerPerDefault = applyFilters( 'wpBootstrapBlocks.container.useFluidContainerPerDefault', true );

let customMarginOptions = [
	{
		label: __( 'Small', 'wp-bootstrap-blocks' ),
		value: 'mb-2',
	},
	{
		label: __( 'Medium', 'wp-bootstrap-blocks' ),
		value: 'mb-3',
	},
	{
		label: __( 'Large', 'wp-bootstrap-blocks' ),
		value: 'mb-5',
	},
];
customMarginOptions = applyFilters( 'wpBootstrapBlocks.container.customMarginOptions', customMarginOptions );

const marginOptions = [
	{
		label: __( 'None', 'wp-bootstrap-blocks' ),
		value: 'mb-0',
	},
	...customMarginOptions,
];

registerBlockType( 'wp-bootstrap-blocks/container', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Container', 'wp-bootstrap-blocks' ), // Block title.
	icon: 'feedback', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'wp-bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Bootstrap Blocks', 'wp-bootstrap-blocks' ),
		__( 'Bootstrap', 'wp-bootstrap-blocks' ),
		__( 'Container', 'wp-bootstrap-blocks' ),
	],

	supports: {
		align: false,
	},

	// attributes are defined server side with register_block_type(). This is needed to make default attributes available in the blocks render callback.

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
							label={ __( 'Fluid', 'wp-bootstrap-blocks' ) }
							checked={ isFluid }
							onChange={ ( isChecked ) => {
								setAttributes( { isFluid: isChecked } );
							} }
						/>
						<SelectControl
							label={ __( 'Margin After', 'wp-bootstrap-blocks' ) }
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
