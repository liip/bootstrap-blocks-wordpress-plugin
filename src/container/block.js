/**
 * BLOCK: wp-bootstrap-blocks/container
 */

import edit from './edit';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor || wp.editor; // Fallback to 'wp.editor' for backwards compatibility

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

	edit,

	save() {
		return <InnerBlocks.Content />;
	},
} );
