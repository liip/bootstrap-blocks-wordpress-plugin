/**
 * BLOCK: wp-bootstrap-blocks/column
 */

import edit, { bgColorOptions } from './edit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor || wp.editor; // Fallback to 'wp.editor' for backwards compatibility

registerBlockType( 'wp-bootstrap-blocks/column', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Column', 'wp-bootstrap-blocks' ), // Block title.
	icon: 'menu', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
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
				equalWidthXl ||
				equalWidthLg ||
				equalWidthMd ||
				equalWidthSm ||
				equalWidthXs
					? 0
					: sizeXs,
			'data-size-sm':
				equalWidthXl || equalWidthLg || equalWidthMd || equalWidthSm
					? 0
					: sizeSm,
			'data-size-md':
				equalWidthXl || equalWidthLg || equalWidthMd ? 0 : sizeMd,
			'data-size-lg': equalWidthXl || equalWidthLg ? 0 : sizeLg,
			'data-size-xl': equalWidthXl ? 0 : sizeXl,
			'data-bg-color': bgColor,
			'data-padding': padding,
			'data-center-content': centerContent,
			style,
		};
	},

	edit,

	save() {
		return <InnerBlocks.Content />;
	},
} );
