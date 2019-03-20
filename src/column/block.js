/**
 * BLOCK: bootstrap-blocks/column
 */

import config from '../config';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks, InspectorControls } = wp.editor;
const { PanelBody, RangeControl } = wp.components;
const { Fragment } = wp.element;

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

registerBlockType( `${ config.namespace }/column`, {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Column', config.textDomain ), // Block title.
	icon: 'menu', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Bootstrap Blocks', config.textDomain ),
		__( 'Bootstrap', config.textDomain ),
		__( 'Column', config.textDomain ),
	],
	parent: [ `${ config.namespace }/row` ],

	attributes: {
		sizeXl: {
			type: 'integer',
			default: 0,
		},
		sizeLg: {
			type: 'integer',
			default: 0,
		},
		sizeMd: {
			type: 'integer',
			default: 0,
		},
		sizeSm: {
			type: 'integer',
			default: 0,
		},
		sizeXs: {
			type: 'integer',
			default: 12,
		},
	},

	edit( { attributes, setAttributes } ) {
		const { sizeXl, sizeLg, sizeMd, sizeSm, sizeXs } = attributes;
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<ColumnSizeRangeControl
							label={ __( 'Xl Columns', config.textDomain ) }
							attributeName="sizeXl"
							value={ sizeXl }
							setAttributes={ setAttributes }
						/>
						<ColumnSizeRangeControl
							label={ __( 'Lg Columns', config.textDomain ) }
							attributeName="sizeLg"
							value={ sizeLg }
							setAttributes={ setAttributes }
						/>
						<ColumnSizeRangeControl
							label={ __( 'Md Columns', config.textDomain ) }
							attributeName="sizeMd"
							value={ sizeMd }
							setAttributes={ setAttributes }
						/>
						<ColumnSizeRangeControl
							label={ __( 'Sm Columns', config.textDomain ) }
							attributeName="sizeSm"
							value={ sizeSm }
							setAttributes={ setAttributes }
						/>
						<ColumnSizeRangeControl
							label={ __( 'Xs Columns', config.textDomain ) }
							attributeName="sizeXs"
							value={ sizeXs }
							setAttributes={ setAttributes }
						/>
					</PanelBody>
				</InspectorControls>
				<InnerBlocks templateLock={ false } />
			</Fragment>
		);
	},

	save() {
		return (
			<InnerBlocks.Content />
		);
	},
} );
