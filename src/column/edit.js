/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InnerBlocks, InspectorControls } = wp.blockEditor || wp.editor; // Fallback to 'wp.editor' for backwards compatibility
const {
	CheckboxControl,
	ColorPalette,
	PanelBody,
	RangeControl,
	SelectControl,
} = wp.components;
const { Component, Fragment } = wp.element;
const { withSelect } = wp.data;
const { applyFilters } = wp.hooks;
const { compose } = wp.compose;

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
		const {
			attributes,
			className,
			setAttributes,
			hasChildBlocks,
		} = this.props;
		const {
			sizeXl,
			sizeLg,
			sizeMd,
			sizeSm,
			sizeXs,
			equalWidthXl,
			equalWidthLg,
			equalWidthMd,
			equalWidthSm,
			equalWidthXs,
			bgColor,
			padding,
			centerContent,
		} = attributes;

		// If centerContent is enabled but no background-color is selected -> reset attribute
		if ( ! bgColor && centerContent ) {
			setAttributes( { centerContent: false } );
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
						{ bgColor ? (
							<CheckboxControl
								label={ __(
									'Center content vertically in row',
									'wp-bootstrap-blocks'
								) }
								checked={ centerContent }
								onChange={ ( isChecked ) =>
									setAttributes( {
										centerContent: isChecked,
									} )
								}
								help={ __(
									'This setting only applies if there is no vertical alignment set on the parent row block.',
									'wp-bootstrap-blocks'
								) }
							/>
						) : null }
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
