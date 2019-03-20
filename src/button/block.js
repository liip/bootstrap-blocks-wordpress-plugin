/**
 * BLOCK: bootstrap-blocks/button
 */

import './editor.scss';
import config from '../config';
import edit from './edit';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { G, Path, SVG } = wp.components;

registerBlockType( `${ config.namespace }/button`, {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Button', config.textDomain ), // Block title.
	icon: <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><Path fill="none" d="M0 0h24v24H0V0z" /><G><Path d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z" /></G></SVG>,
	category: 'bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Bootstrap Blocks', config.textDomain ),
		__( 'Bootstrap', config.textDomain ),
		__( 'Button', config.textDomain ),
	],

	attributes: {
		url: {
			type: 'string',
		},
		text: {
			type: 'string',
		},
		style: {
			type: 'string',
		},
		alignment: {
			type: 'string',
		},
	},

	getEditWrapperProps( attributes ) {
		return { 'data-alignment': attributes.alignment };
	},

	edit,

	save() {
		return null;
	},
} );
