/**
 * BLOCK: bootstrap-blocks/column
 */

import config from '../config';
import edit from './edit';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks } = wp.editor;

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

	getEditWrapperProps( attributes ) {
		return { 'data-size-md': attributes.sizeMd };
	},

	edit,

	save() {
		return (
			<InnerBlocks.Content />
		);
	},
} );
