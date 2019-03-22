/**
 * BLOCK: bootstrap-blocks/column
 */

import edit from './edit';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks } = wp.editor;

registerBlockType( 'bootstrap-blocks/column', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Column', 'bootstrap-blocks' ), // Block title.
	icon: 'menu', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Bootstrap Blocks', 'bootstrap-blocks' ),
		__( 'Bootstrap', 'bootstrap-blocks' ),
		__( 'Column', 'bootstrap-blocks' ),
	],
	parent: [ 'bootstrap-blocks/row' ],

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

	getEditWrapperProps( attributes ) {
		const { sizeXl, sizeLg, sizeMd, sizeSm, sizeXs } = attributes;

		return {
			'data-size-xs': sizeXs,
			'data-size-sm': sizeSm,
			'data-size-md': sizeMd,
			'data-size-lg': sizeLg,
			'data-size-xl': sizeXl,
		};
	},

	edit,

	save() {
		return (
			<InnerBlocks.Content />
		);
	},
} );
