// WordPress dependencies
import { __ } from '@wordpress/i18n';
import {
	CheckboxControl,
	PanelBody,
	SelectControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';

import { isBootstrap5Active } from '../helper';

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

let fluidBreakpointOptions = [
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

if ( isBootstrap5Active() ) {
	fluidBreakpointOptions = [
		{
			label: __( 'Xxl', 'wp-bootstrap-blocks' ),
			value: 'xxl',
		},
		...fluidBreakpointOptions,
	];
}

fluidBreakpointOptions = [
	{
		label: __( 'No breakpoint selected', 'wp-bootstrap-blocks' ),
		value: '',
	},
	...fluidBreakpointOptions,
];

const BootstrapContainerEdit = ( {
	attributes,
	className,
	clientId,
	setAttributes,
} ) => {
	const { isFluid, fluidBreakpoint, marginAfter } = attributes;
	const { hasChildBlocks } = useSelect( ( select ) => {
		const { getBlockOrder } = select( 'core/block-editor' );

		return {
			hasChildBlocks: getBlockOrder( clientId ).length > 0,
		};
	} );

	return (
		<>
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
						label={ __( 'Margin After', 'wp-bootstrap-blocks' ) }
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
		</>
	);
};

export default BootstrapContainerEdit;
