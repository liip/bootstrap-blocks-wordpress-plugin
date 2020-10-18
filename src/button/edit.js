// WordPress dependencies
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import {
	Dashicon,
	IconButton,
	SelectControl,
	PanelBody,
} from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import * as BlockEditor from '@wordpress/block-editor';
import * as Editor from '@wordpress/editor';

const {
	RichText,
	URLInput,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
} = BlockEditor || Editor; // Fallback to deprecated '@wordpress/editor' for backwards compatibility

class BootstrapButtonEdit extends Component {
	render() {
		const { attributes, className, setAttributes, isSelected } = this.props;
		const { url, text, style, alignment } = attributes;

		let styleOptions = [
			{ label: __( 'Primary', 'wp-bootstrap-blocks' ), value: 'primary' },
			{
				label: __( 'Secondary', 'wp-bootstrap-blocks' ),
				value: 'secondary',
			},
		];
		styleOptions = applyFilters(
			'wpBootstrapBlocks.button.styleOptions',
			styleOptions
		);

		return (
			<Fragment>
				<div className={ className } data-alignment={ alignment }>
					<RichText
						// eslint-disable-next-line @wordpress/i18n-ellipsis
						placeholder={ __(
							'Add text...',
							'wp-bootstrap-blocks'
						) }
						value={ text }
						onChange={ ( value ) =>
							setAttributes( { text: value } )
						}
						formattingControls={ [] }
						keepPlaceholderOnFocus
					/>
					<InspectorControls>
						<PanelBody>
							<SelectControl
								label={ __( 'Style', 'wp-bootstrap-blocks' ) }
								value={ style }
								options={ styleOptions }
								onChange={ ( selectedStyle ) => {
									setAttributes( { style: selectedStyle } );
								} }
							/>
						</PanelBody>
					</InspectorControls>
					<BlockControls>
						<AlignmentToolbar
							value={ alignment }
							label={ __(
								'Change button alignment',
								'wp-bootstrap-blocks'
							) }
							onChange={ ( newAlignment ) =>
								setAttributes( { alignment: newAlignment } )
							}
						/>
					</BlockControls>
				</div>
				{ isSelected && (
					<form
						className="wp-block-wp-bootstrap-blocks-button-link"
						onSubmit={ ( event ) => event.preventDefault() }
					>
						<Dashicon icon="admin-links" />
						<URLInput
							value={ url }
							onChange={ ( value ) =>
								setAttributes( { url: value } )
							}
						/>
						<IconButton
							icon="editor-break"
							label={ __( 'Apply', 'wp-bootstrap-blocks' ) }
							type="submit"
						/>
					</form>
				) }
			</Fragment>
		);
	}
}

export default BootstrapButtonEdit;
