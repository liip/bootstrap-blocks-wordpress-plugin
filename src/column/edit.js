/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InnerBlocks, InspectorControls } = wp.editor;
const { CheckboxControl, ColorPalette, PanelBody, RangeControl, SelectControl } = wp.components;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { applyFilters } = wp.hooks;

/**
 * Internal dependencies
 */
import { withBlockEditContext } from '../block-edit-context';

const ColumnSizeRangeControl = ( { label, attributeName, value, setAttributes } ) => {
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
		/>
	);
};

let bgColors = [
	{ name: 'primary', color: '#007bff' },
	{ name: 'secondary', color: '#6c757d' },
	{ name: 'white', color: '#fff' },
	/* $theme-colors: map-merge(
  (
    "primary":    $primary,
    "secondary":  $secondary,
    "success":    $success,
    "info":       $info,
    "warning":    $warning,
    "danger":     $danger,
    "light":      $light,
    "dark":       $dark
  ),
  $theme-colors
);
*/
];

bgColors = applyFilters( 'wpBootstrapBlocks.columns.bgColors', bgColors );

let columnPadding = [
	{ label: __( 'None', 'wp-bootstrap-blocks' ), value: '0' },
	{ label: __( 'Gutter', 'wp-bootstrap-blocks' ), value: 'gutter' },
	{ label: __( 'Medium', 'wp-bootstrap-blocks' ), value: '3' },
	{ label: __( 'Large', 'wp-bootstrap-blocks' ), value: '5' },
];

columnPadding = applyFilters( 'wpBootstrapBlocks.columns.columnPadding', columnPadding );

class BootstrapColumnEdit extends Component {
	render() {
		const { attributes, className, setAttributes } = this.props;
		const { sizeXl, sizeLg, sizeMd, sizeSm, sizeXs, bgColor, padding, centerInStretch } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'Column size', 'wp-bootstrap-blocks' ) }
						initialOpen={ false }
					>
						<ColumnSizeRangeControl
							label={ __( 'Xl Columns', 'wp-bootstrap-blocks' ) }
							attributeName="sizeXl"
							value={ sizeXl }
							setAttributes={ setAttributes }
						/>
						<ColumnSizeRangeControl
							label={ __( 'Lg Columns', 'wp-bootstrap-blocks' ) }
							attributeName="sizeLg"
							value={ sizeLg }
							setAttributes={ setAttributes }
						/>
						<ColumnSizeRangeControl
							label={ __( 'Md Columns', 'wp-bootstrap-blocks' ) }
							attributeName="sizeMd"
							value={ sizeMd }
							setAttributes={ setAttributes }
						/>
						<ColumnSizeRangeControl
							label={ __( 'Sm Columns', 'wp-bootstrap-blocks' ) }
							attributeName="sizeSm"
							value={ sizeSm }
							setAttributes={ setAttributes }
						/>
						<ColumnSizeRangeControl
							label={ __( 'Xs Columns', 'wp-bootstrap-blocks' ) }
							attributeName="sizeXs"
							value={ sizeXs }
							setAttributes={ setAttributes }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Background color', 'wp-bootstrap-blocks' ) }
						initialOpen={ false }>
						<ColorPalette
							colors={ bgColors }
							value={ bgColor }
							onChange={ ( value ) => {
								const colorPair = bgColors.filter( color => color.color === value )[ 0 ];
								if ( colorPair ) {
									setAttributes( {
										bgColor: colorPair.name,
									} );
								}
							} }
							disableCustomColors
						/>
						<CheckboxControl
							label={ __( 'Centered in Stretch Row', 'wp-bootstrap-blocks' ) }
							checked={ centerInStretch }
							onChange={ ( isChecked ) => setAttributes( { centerInStretch: isChecked } ) }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Padding', 'wp-bootstrap-blocks' ) }
						initialOpen={ false }>
						<SelectControl
							label={ __( 'Size', 'wp-bootstrap-blocks' ) }
							value={ padding }
							options={ columnPadding }
							onChange={ ( value ) => {
								setAttributes( {
									padding: value,
								} );
							} }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ className }>
					<InnerBlocks templateLock={ false } />
				</div>
			</Fragment>
		);
	}
}

export default compose(
	withBlockEditContext( ( { clientId } ) => {
		return {
			clientId,
		};
	} )
)( BootstrapColumnEdit );
