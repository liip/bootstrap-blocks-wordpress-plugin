// WordPress dependencies
import { __ } from '@wordpress/i18n';
import {
	CheckboxControl,
	ColorPalette,
	PanelBody,
	RangeControl,
	SelectControl,
} from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { applyFilters } from '@wordpress/hooks';

import * as BlockEditor from '@wordpress/block-editor';
import * as Editor from '@wordpress/editor';

import { isBootstrap5Active, isCssGridEnabled } from '../helper';
import {
	verticalAlignBottom,
	verticalAlignCenter,
	verticalAlignTop,
} from '../icons';

const { InnerBlocks, InspectorControls, BlockControls, AlignmentToolbar } =
	BlockEditor || Editor; // Fallback to deprecated '@wordpress/editor' for backwards compatibility

const contentVerticalAlignmentControls = [
	{
		icon: verticalAlignTop,
		title: __( 'Align content top', 'wp-bootstrap-blocks' ),
		align: 'top',
	},
	{
		icon: verticalAlignCenter,
		title: __( 'Align content center', 'wp-bootstrap-blocks' ),
		align: 'center',
	},
	{
		icon: verticalAlignBottom,
		title: __( 'Align content bottom', 'wp-bootstrap-blocks' ),
		align: 'bottom',
	},
];

const ColumnSizeRangeControl = ( {
	label,
	attributeName,
	value,
	setAttributes,
	...props
} ) => {
	return (
		<RangeControl
			label={ label }
			value={ value }
			onChange={ ( selectedSize ) => {
				setAttributes( {
					[ attributeName ]: selectedSize,
				} );
			} }
			min={ 0 }
			max={ 12 }
			{ ...props }
		/>
	);
};

export let bgColorOptions = [
	{ name: 'primary', color: '#007bff' },
	{ name: 'secondary', color: '#6c757d' },
];

bgColorOptions = applyFilters(
	'wpBootstrapBlocks.column.bgColorOptions',
	bgColorOptions
);

let paddingOptions = [
	{ label: __( 'None', 'wp-bootstrap-blocks' ), value: '' },
	{ label: __( 'Small', 'wp-bootstrap-blocks' ), value: 'p-2' },
	{ label: __( 'Medium', 'wp-bootstrap-blocks' ), value: 'p-3' },
	{ label: __( 'Large', 'wp-bootstrap-blocks' ), value: 'p-5' },
];

paddingOptions = applyFilters(
	'wpBootstrapBlocks.column.paddingOptions',
	paddingOptions
);

class BootstrapColumnEdit extends Component {
	render() {
		const { attributes, className, setAttributes, hasChildBlocks } =
			this.props;
		const {
			sizeXxl,
			sizeXl,
			sizeLg,
			sizeMd,
			sizeSm,
			sizeXs,
			equalWidthXxl,
			equalWidthXl,
			equalWidthLg,
			equalWidthMd,
			equalWidthSm,
			equalWidthXs,
			bgColor,
			padding,
			centerContent,
			contentVerticalAlignment,
		} = attributes;

		// Migrate deprecated centerContent to new contentVerticalAlignment attribute
		if ( centerContent ) {
			setAttributes( {
				contentVerticalAlignment: 'center',
				centerContent: false,
			} );
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'Column size', 'wp-bootstrap-blocks' ) }
						initialOpen={ false }
					>
						<ColumnSizeRangeControl
							label={ __(
								'Xs Column count',
								'wp-bootstrap-blocks'
							) }
							attributeName="sizeXs"
							value={ sizeXs }
							disabled={ equalWidthXs }
							setAttributes={ setAttributes }
						/>
						{ ! isCssGridEnabled() && (
							<CheckboxControl
								label={ __(
									'Xs equal-width',
									'wp-bootstrap-blocks'
								) }
								checked={ equalWidthXs }
								onChange={ ( isChecked ) =>
									setAttributes( { equalWidthXs: isChecked } )
								}
							/>
						) }
						<hr />
						<ColumnSizeRangeControl
							label={ __(
								'Sm Column count',
								'wp-bootstrap-blocks'
							) }
							attributeName="sizeSm"
							value={ sizeSm }
							disabled={ equalWidthSm }
							setAttributes={ setAttributes }
						/>
						{ ! isCssGridEnabled() && (
							<CheckboxControl
								label={ __(
									'Sm equal-width',
									'wp-bootstrap-blocks'
								) }
								checked={ equalWidthSm }
								onChange={ ( isChecked ) =>
									setAttributes( { equalWidthSm: isChecked } )
								}
							/>
						) }
						<hr />
						<ColumnSizeRangeControl
							label={ __(
								'Md Column count',
								'wp-bootstrap-blocks'
							) }
							attributeName="sizeMd"
							value={ sizeMd }
							disabled={ equalWidthMd }
							setAttributes={ setAttributes }
						/>
						{ ! isCssGridEnabled() && (
							<CheckboxControl
								label={ __(
									'Md equal-width',
									'wp-bootstrap-blocks'
								) }
								checked={ equalWidthMd }
								onChange={ ( isChecked ) =>
									setAttributes( { equalWidthMd: isChecked } )
								}
							/>
						) }
						<hr />
						<ColumnSizeRangeControl
							label={ __(
								'Lg Column count',
								'wp-bootstrap-blocks'
							) }
							attributeName="sizeLg"
							value={ sizeLg }
							disabled={ equalWidthLg }
							setAttributes={ setAttributes }
						/>
						{ ! isCssGridEnabled() && (
							<CheckboxControl
								label={ __(
									'Lg equal-width',
									'wp-bootstrap-blocks'
								) }
								checked={ equalWidthLg }
								onChange={ ( isChecked ) =>
									setAttributes( { equalWidthLg: isChecked } )
								}
							/>
						) }
						<hr />
						<ColumnSizeRangeControl
							label={ __(
								'Xl Column count',
								'wp-bootstrap-blocks'
							) }
							attributeName="sizeXl"
							value={ sizeXl }
							disabled={ equalWidthXl }
							setAttributes={ setAttributes }
						/>
						{ ! isCssGridEnabled() && (
							<CheckboxControl
								label={ __(
									'Xl equal-width',
									'wp-bootstrap-blocks'
								) }
								checked={ equalWidthXl }
								onChange={ ( isChecked ) =>
									setAttributes( { equalWidthXl: isChecked } )
								}
							/>
						) }
						{ isBootstrap5Active() && (
							<Fragment>
								<hr />
								<ColumnSizeRangeControl
									label={ __(
										'Xxl Column count',
										'wp-bootstrap-blocks'
									) }
									attributeName="sizeXxl"
									value={ sizeXxl }
									disabled={ equalWidthXxl }
									setAttributes={ setAttributes }
								/>
								{ ! isCssGridEnabled() && (
									<CheckboxControl
										label={ __(
											'Xxl equal-width',
											'wp-bootstrap-blocks'
										) }
										checked={ equalWidthXxl }
										onChange={ ( isChecked ) =>
											setAttributes( {
												equalWidthXxl: isChecked,
											} )
										}
									/>
								) }
							</Fragment>
						) }
					</PanelBody>
					<PanelBody
						title={ __(
							'Background color',
							'wp-bootstrap-blocks'
						) }
						initialOpen={ false }
					>
						<ColorPalette
							colors={ bgColorOptions }
							value={ bgColor }
							onChange={ ( value ) => {
								// Value is undefined if color gets cleared
								if ( ! value ) {
									setAttributes( {
										bgColor: '',
										centerContent: false,
									} );
								} else {
									const selectedColor = bgColorOptions.find(
										( c ) => c.color === value
									);
									if ( selectedColor ) {
										setAttributes( {
											bgColor: selectedColor.name,
										} );
									}
								}
							} }
							disableCustomColors
						/>
					</PanelBody>
					<PanelBody
						title={ __(
							'Padding (inside column)',
							'wp-bootstrap-blocks'
						) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Size', 'wp-bootstrap-blocks' ) }
							value={ padding }
							options={ paddingOptions }
							onChange={ ( value ) => {
								setAttributes( {
									padding: value,
								} );
							} }
						/>
					</PanelBody>
				</InspectorControls>
				<BlockControls>
					<AlignmentToolbar
						value={ contentVerticalAlignment }
						label={ __(
							'Change vertical alignment of content',
							'wp-bootstrap-blocks'
						) }
						onChange={ ( newContentVerticalAlignment ) =>
							setAttributes( {
								contentVerticalAlignment:
									newContentVerticalAlignment,
							} )
						}
						alignmentControls={ contentVerticalAlignmentControls }
					/>
				</BlockControls>
				<div className={ className }>
					<InnerBlocks
						templateLock={ false }
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
)( BootstrapColumnEdit );
