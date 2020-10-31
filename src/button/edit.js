// WordPress dependencies
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import {
	Dashicon,
	IconButton,
	SelectControl,
	PanelBody,
	ToggleControl,
	TextControl,
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

const NEW_TAB_REL_DEFAULT_VALUE = 'noreferrer noopener';

class BootstrapButtonEdit extends Component {
	render() {
		const { attributes, className, setAttributes, isSelected } = this.props;
		const { url, linkTarget, rel, text, style, alignment } = attributes;

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

		// Open in new tab behavior from core/button (source: https://github.com/WordPress/gutenberg/blob/master/packages/block-library/src/button/edit.js)
		const onToggleOpenInNewTab = ( value ) => {
			const newLinkTarget = value ? '_blank' : undefined;

			let updatedRel = rel;
			if ( newLinkTarget && ! rel ) {
				updatedRel = NEW_TAB_REL_DEFAULT_VALUE;
			} else if ( ! newLinkTarget && rel === NEW_TAB_REL_DEFAULT_VALUE ) {
				updatedRel = undefined;
			}

			setAttributes( {
				linkTarget: newLinkTarget,
				rel: updatedRel,
			} );
		};

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
						<PanelBody
							title={ __(
								'Link settings',
								'wp-bootstrap-blocks'
							) }
						>
							<ToggleControl
								label={ __(
									'Open in new tab',
									'wp-bootstrap-blocks'
								) }
								onChange={ onToggleOpenInNewTab }
								checked={ linkTarget === '_blank' }
							/>
							<TextControl
								label={ __(
									'Link rel',
									'wp-bootstrap-blocks'
								) }
								value={ rel || '' }
								onChange={ ( newRel ) => {
									setAttributes( { rel: newRel } );
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
