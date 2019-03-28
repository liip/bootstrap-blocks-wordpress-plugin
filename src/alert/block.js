/**
 * BLOCK: ALERT
 *
 * Renders a bootstrap alert
 */
//  Import CSS.
import './editor.scss';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, BlockControls, AlignmentToolbar } = wp.editor;
const { SelectControl, PanelBody, ToggleControl } = wp.components;
const { __ } = wp.i18n;

registerBlockType( 'bootstrap-blocks/alert', {
	title: __( 'Alert' ),
	icon: 'info',
	category: 'bootstrap-blocks',
	keywords: [
		__( 'Alert' ),
		__( 'Notice' ),
		__( 'Warning' ),
	],
	attributes: {
		text: {
			type: 'string',
		},
		style: {
			type: 'string',
		},
		dismissible: {
			type: 'boolean',
		},
		alignment: {
			type: 'string',
		},
	},

	getEditWrapperProps( attributes ) {
		return { 'data-alignment': attributes.alignment };
	},

	edit: function( { attributes, setAttributes } ) {
		const { alignment, dismissible, style, text } = attributes;
		const styleOptions = [
			{ label: __( 'Primary' ), value: 'primary' },
			{ label: __( 'Secondary' ), value: 'secondary' },
			{ label: __( 'Success' ), value: 'success' },
			{ label: __( 'Warning' ), value: 'warning ' },
			{ label: __( 'Danger' ), value: 'danger' },
			{ label: __( 'Info' ), value: 'info' },
			{ label: __( 'Light' ), value: 'light' },
			{ label: __( 'Dark' ), value: 'dark' },
		];

		return (
			<div>
				<div className={ `alert alert-${ style ? style : 'primary' }${ dismissible ? ' alert-dismissible' : '' }` }>
					<RichText
						placeholder={ __( 'Add them text…' ) }
						value={ text }
						onChange={ ( value ) => setAttributes( { text: value } ) }
						formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
						keepPlaceholderOnFocus
					/>
					{ dismissible &&
					<button type={ 'button' } className={ 'close alert__close--editor' }>
						<span aria-hidden="true">&times;</span>
					</button>
					}
				</div>
				<BlockControls>
					<AlignmentToolbar
						value={ alignment }
						onChange={ ( newAlignment ) => ( setAttributes( { alignment: newAlignment } ) ) }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __( 'Optionen' ) }>
						<SelectControl
							label={ __( 'Kontext' ) }
							value={ style }
							options={ styleOptions }
							onChange={ ( selectedStyle ) => setAttributes( { style: selectedStyle } ) } />
						<ToggleControl
							label={ __( 'Ausblendbar' ) }
							help={ dismissible ? 'Alert kann via Klick auf x ausgeblendet werden' : 'Alert kann nicht ausgeblendet werden' }
							checked={ dismissible }
							onChange={ ( checked ) => setAttributes( { dismissible: checked } ) } />
					</PanelBody>
				</InspectorControls>
			</div>
		);
	},

	// Dynamic components return null here
	save: function() {
		return null;
	},
} );

