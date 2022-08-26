/**
 * BLOCK: wp-bootstrap-blocks/button
 */

// WordPress dependencies
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import edit from './edit';
import { button } from '../icons';
import './editor.scss';

registerBlockType( 'wp-bootstrap-blocks/button', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Button (Bootstrap)', 'wp-bootstrap-blocks' ), // Block title.
	icon: button,
	category: 'wp-bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Button', 'wp-bootstrap-blocks' ),
		__( 'Bootstrap Button', 'wp-bootstrap-blocks' ),
		__( 'Bootstrap', 'wp-bootstrap-blocks' ),
	],
	example: {},

	// attributes are defined server side with register_block_type(). This is needed to make default attributes available in the blocks render callback.

	getEditWrapperProps( attributes ) {
		return { 'data-alignment': attributes.alignment };
	},

	edit,

	save() {
		return null;
	},
} );
