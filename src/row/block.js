/**
 * BLOCK: wp-bootstrap-blocks/row
 */

import edit from './edit';

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks } = wp.editor;

registerBlockType( 'wp-bootstrap-blocks/row', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Row', 'wp-bootstrap-blocks' ), // Block title.
	icon: 'layout', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'wp-bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Bootstrap Blocks', 'wp-bootstrap-blocks' ),
		__( 'Bootstrap', 'wp-bootstrap-blocks' ),
		__( 'Row', 'wp-bootstrap-blocks' ),
	],

	supports: {
		align: [ 'full' ],
	},

	// attributes are defined server side with register_block_type(). This is needed to make default attributes available in the blocks render callback.

	getEditWrapperProps( attributes ) {
		return {
			'data-alignment': attributes.alignment,
			'data-vertical-alignment': attributes.verticalAlignment,
		};
	},

	edit,

	save() {
		return (
			<InnerBlocks.Content />
		);
	},
} );
