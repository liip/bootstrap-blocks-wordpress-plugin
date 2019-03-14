/**
 * BLOCK: bootstrap-blocks/button
 */

import './editor.scss';
import config from '../config';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, URLInput, InspectorControls } = wp.editor;
const { Dashicon, IconButton, G, Path, SVG, SelectControl, PanelBody } = wp.components;
const { Fragment } = wp.element;
const { applyFilters } = wp.hooks;

let styleOptions = [
	{ label: __( 'Primary', config.textDomain ), value: 'primary' },
	{ label: __( 'Secondary', config.textDomain ), value: 'secondary' },
];
styleOptions = applyFilters( 'bootstrapBlocks.buttonStyleOptions', styleOptions );

registerBlockType( `${ config.namespace }/button`, {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Bootstrap Blocks Button', config.textDomain ), // Block title.
	icon: <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><Path fill="none" d="M0 0h24v24H0V0z" /><G><Path d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z" /></G></SVG>,
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
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
	},

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { url, text, style } = attributes;

		return (
			<Fragment>
				<div className={ className }>
					<RichText
						placeholder={ __( 'Add text…' ) }
						value={ text }
						onChange={ ( value ) => setAttributes( { text: value } ) }
						formattingControls={ [] }
						keepPlaceholderOnFocus
					/>
					<InspectorControls>
						<PanelBody>
							<SelectControl
								label={ __( 'Style', config.textDomain ) }
								value={ style }
								options={ styleOptions }
								onChange={ ( selectedStyle ) => {
									setAttributes( { style: selectedStyle } );
								} }
							/>
						</PanelBody>
					</InspectorControls>
				</div>
				{ isSelected && (
					<form
						className="wp-block-bootstrap-blocks-button-link"
						onSubmit={ ( event ) => event.preventDefault() }>
						<Dashicon icon="admin-links" />
						<URLInput
							value={ url }
							onChange={ ( value ) => setAttributes( { url: value } ) }
						/>
						<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
					</form>
				) }
			</Fragment>
		);
	},

	save() {
		return null;
	},
} );
