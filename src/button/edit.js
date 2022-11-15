// WordPress dependencies
import { __ } from '@wordpress/i18n';
import {
	Dashicon,
	Button,
	SelectControl,
	PanelBody,
	ToggleControl,
	TextControl,
} from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import {
	RichText,
	URLInput,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';
import { bgColors, colors } from '../constants';

let styleOptions = [
	{
		label: __( 'Primary', 'wp-bootstrap-blocks' ),
		value: 'primary',
		bgColor: bgColors.primary,
		textColor: colors.white,
	},
	{
		label: __( 'Secondary', 'wp-bootstrap-blocks' ),
		value: 'secondary',
		bgColor: bgColors.secondary,
		textColor: colors.white,
	},
];
styleOptions = applyFilters(
	'wpBootstrapBlocks.button.styleOptions',
	styleOptions
);

const DEFAULT_BG_COLOR = bgColors.primary;
const DEFAULT_TEXT_COLOR = colors.white;
const NEW_TAB_REL_DEFAULT_VALUE = 'noreferrer noopener';

const BootstrapButtonEdit = ( {
	attributes,
	className,
	isSelected,
	setAttributes,
} ) => {
	const { url, linkTarget, rel, text, style, alignment } = attributes;

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

	// Fill empty color values with default values and check for usage of deprecated color attribute in styleOptions
	let hasDeprecatedColorAttributes = false;
	const styleOptionsWithDefault = styleOptions.map( ( styleOption ) => {
		if ( styleOption.color ) {
			hasDeprecatedColorAttributes = true;
		}
		return {
			...styleOption,
			textColor: styleOption.textColor || DEFAULT_TEXT_COLOR,
			bgColor:
				styleOption.bgColor || styleOption.color || DEFAULT_BG_COLOR, // Fallback to deprecated color attribute
		};
	} );

	if ( hasDeprecatedColorAttributes ) {
		// eslint-disable-next-line no-console
		console.warn(
			'[wpBootstrapBlocks.button.styleOptions filter] The color attribute in styleOptions is deprecated. Please us bgColor and textColor instead.'
		);
	}

	// Prepare CSS rules for selected button style
	let inlineStyle = {
		backgroundColor:
			styleOptionsWithDefault.length > 0
				? styleOptionsWithDefault[ 0 ].bgColor
				: DEFAULT_BG_COLOR,
		color:
			styleOptionsWithDefault.length > 0
				? styleOptionsWithDefault[ 0 ].textColor
				: DEFAULT_TEXT_COLOR,
	};

	if ( style ) {
		const selectedButtonColor = styleOptionsWithDefault.find(
			( styleOption ) => styleOption.value === style
		);
		if ( selectedButtonColor?.bgColor && selectedButtonColor?.textColor ) {
			inlineStyle = {
				backgroundColor: selectedButtonColor.bgColor,
				color: selectedButtonColor.textColor,
			};
		}
	}

	return (
		<>
			<div
				className={ className }
				data-alignment={ alignment }
				style={ inlineStyle }
			>
				<RichText
					// eslint-disable-next-line @wordpress/i18n-ellipsis
					placeholder={ __( 'Add text...', 'wp-bootstrap-blocks' ) }
					value={ text }
					onChange={ ( value ) => setAttributes( { text: value } ) }
					allowedFormats={ [] }
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
						title={ __( 'Link settings', 'wp-bootstrap-blocks' ) }
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
							label={ __( 'Link rel', 'wp-bootstrap-blocks' ) }
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
					<Button
						icon="editor-break"
						label={ __( 'Apply', 'wp-bootstrap-blocks' ) }
						type="submit"
					/>
				</form>
			) }
		</>
	);
};

export default BootstrapButtonEdit;
