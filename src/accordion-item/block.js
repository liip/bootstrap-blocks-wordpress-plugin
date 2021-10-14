/**
 * BLOCK: wp-bootstrap-blocks/accordion-item
 */

// WordPress dependencies
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import * as BlockEditor from '@wordpress/block-editor';
import * as Editor from '@wordpress/editor';

import edit from './edit';
import { column } from '../icons';
import './editor.scss';

const { InnerBlocks } = BlockEditor || Editor; // Fallback to deprecated '@wordpress/editor' for backwards compatibility

registerBlockType( 'wp-bootstrap-blocks/accordion-item', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Accordion item', 'wp-bootstrap-blocks' ), // Block title.
	icon: column, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'wp-bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Accordion item', 'wp-bootstrap-blocks' ),
		__( 'Bootstrap Accordion item', 'wp-bootstrap-blocks' ),
		__( 'Bootstrap', 'wp-bootstrap-blocks' ),
	],
	parent: [ 'wp-bootstrap-blocks/accordion' ],
	// attributes are defined server side with register_block_type(). This is needed to make default attributes available in the blocks render callback.

	edit,

	save: () => {
		return <InnerBlocks.Content />;
	},
} );
