/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InnerBlocks, InspectorControls } = wp.blockEditor || wp.editor; // Fallback to 'wp.editor' for backwards compatibility
const { CheckboxControl, PanelBody, SelectControl } = wp.components;
const { Component, Fragment } = wp.element;
const { withSelect } = wp.data;
const { compose } = wp.compose;
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

class BootstrapContainerEdit extends Component {
	render() {
		const {
			attributes,
			className,
			setAttributes,
			hasChildBlocks,
		} = this.props;
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
					<InnerBlocks
						renderAppender={
							hasChildBlocks
								? undefined
								: () => <InnerBlocks.ButtonBlockAppender />
						}
					/>
				</div>
			</Fragment>
		);
	}
}

export default compose(
	withSelect( ( select, ownProps ) => {
		const { clientId } = ownProps;
		const { getBlockOrder } =
			select( 'core/block-editor' ) || select( 'core/editor' ); // Fallback to 'core/editor' for backwards compatibility

		return {
			hasChildBlocks: getBlockOrder( clientId ).length > 0,
		};
	} )
)( BootstrapContainerEdit );
