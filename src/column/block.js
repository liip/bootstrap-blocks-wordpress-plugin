/**
 * BLOCK: wp-bootstrap-blocks/column
 */

// WordPress dependencies
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import * as BlockEditor from '@wordpress/block-editor';
import * as Editor from '@wordpress/editor';

import edit, { bgColorOptions } from './edit';
import { column } from '../icons';

const { InnerBlocks } = BlockEditor || Editor; // Fallback to deprecated '@wordpress/editor' for backwards compatibility

registerBlockType( 'wp-bootstrap-blocks/column', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Column (Bootstrap)', 'wp-bootstrap-blocks' ), // Block title.
	icon: column, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'wp-bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Column', 'wp-bootstrap-blocks' ),
		__( 'Bootstrap Column', 'wp-bootstrap-blocks' ),
		__( 'Bootstrap', 'wp-bootstrap-blocks' ),
	],
	parent: [ 'wp-bootstrap-blocks/row' ],

	// attributes are defined server side with register_block_type(). This is needed to make default attributes available in the blocks render callback.

	getEditWrapperProps( attributes ) {
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
			contentVerticalAlignment,
		} = attributes;

		// Prepare styles for selected background-color
		let style = {};
		if ( bgColor ) {
			const selectedBgColor = bgColorOptions.find(
				( bgColorOption ) => bgColorOption.name === bgColor
			);
			if ( selectedBgColor ) {
				style = {
					backgroundColor: selectedBgColor.color,
				};
			}
		}

		return {
			'data-size-xs':
				equalWidthXxl ||
				equalWidthXl ||
				equalWidthLg ||
				equalWidthMd ||
				equalWidthSm ||
				equalWidthXs
					? 0
					: sizeXs,
			'data-size-sm':
				equalWidthXxl ||
				equalWidthXl ||
				equalWidthLg ||
				equalWidthMd ||
				equalWidthSm
					? 0
					: sizeSm,
			'data-size-md':
				equalWidthXxl || equalWidthXl || equalWidthLg || equalWidthMd
					? 0
					: sizeMd,
			'data-size-lg':
				equalWidthXxl || equalWidthXl || equalWidthLg ? 0 : sizeLg,
			'data-size-xl': equalWidthXxl || equalWidthXl ? 0 : sizeXl,
			'data-size-xxl': equalWidthXxl ? 0 : sizeXxl,
			'data-bg-color': bgColor,
			'data-padding': padding,
			'data-content-vertical-alignment': contentVerticalAlignment,
			style,
		};
	},

	edit,

	save() {
		return <InnerBlocks.Content />;
	},
} );
