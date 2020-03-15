/**
 * BLOCK: wp-bootstrap-blocks/container
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = wp.editor;
const { SelectControl, CheckboxControl, PanelBody } = wp.components;
const { Fragment } = wp.element;
const { applyFilters } = wp.hooks;

let marginAfterOptions = [
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
marginAfterOptions = applyFilters(
	'wpBootstrapBlocks.container.marginAfterOptions',
	marginAfterOptions
);

marginAfterOptions = [
	{
		label: __( 'None', 'wp-bootstrap-blocks' ),
		value: 'mb-0',
	},
	...marginAfterOptions,
];

const fluidBreakpointOptions = [
	{
		label: __( 'No breakpoint selected', 'wp-bootstrap-blocks' ),
		value: '',
	},
	{
		label: __( 'Xl', 'wp-bootstrap-blocks' ),
		value: 'xl',
	},
	{
		label: __( 'Lg', 'wp-bootstrap-blocks' ),
		value: 'lg',
	},
	{
		label: __( 'Md', 'wp-bootstrap-blocks' ),
		value: 'md',
	},
	{
		label: __( 'Sm', 'wp-bootstrap-blocks' ),
		value: 'sm',
	},
];

registerBlockType( 'wp-bootstrap-blocks/container', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Container', 'wp-bootstrap-blocks' ), // Block title.
	icon: 'feedback', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'wp-bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Container', 'wp-bootstrap-blocks' ),
		__( 'Bootstrap Container', 'wp-bootstrap-blocks' ),
		__( 'Bootstrap', 'wp-bootstrap-blocks' ),
	],

	supports: {
		align: false,
	},

	// attributes are defined server side with register_block_type(). This is needed to make default attributes available in the blocks render callback.

	edit( { className, attributes, setAttributes } ) {
		const { isFluid, fluidBreakpoint, marginAfter } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Fluid', 'wp-bootstrap-blocks' ) }>
						<CheckboxControl
							label={ __( 'Fluid', 'wp-bootstrap-blocks' ) }
							checked={ isFluid }
							onChange={ ( isChecked ) => {
								setAttributes( { isFluid: isChecked } );
							} }
						/>
						<SelectControl
							label={ __(
								'Fluid Breakpoint',
								'wp-bootstrap-blocks'
							) }
							disabled={ ! isFluid }
							value={ fluidBreakpoint }
							options={ fluidBreakpointOptions }
							onChange={ ( selectedFluidBreakpoint ) => {
								setAttributes( {
									fluidBreakpoint: selectedFluidBreakpoint,
								} );
							} }
							help={ __(
								'Fluid breakpoints only work with Bootstrap v4.4+. The container will be 100% wide until the specified breakpoint is reached, after which max-widths for each of the higher breakpoints will be applied.',
								'wp-bootstrap-blocks'
							) }
						/>
					</PanelBody>
					<PanelBody title={ __( 'Margin', 'wp-bootstrap-blocks' ) }>
						<SelectControl
							label={ __(
								'Margin After',
								'wp-bootstrap-blocks'
							) }
							value={ marginAfter }
							options={ marginAfterOptions }
							onChange={ ( selectedMarginAfter ) => {
								setAttributes( {
									marginAfter: selectedMarginAfter,
								} );
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
		return <InnerBlocks.Content />;
	},
} );
