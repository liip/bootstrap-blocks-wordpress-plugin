// WordPress dependencies
import { __ } from '@wordpress/i18n';
import { CheckboxControl, PanelBody } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import { dispatch, withDispatch, withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
//import { applyFilters } from '@wordpress/hooks';

import * as BlockEditor from '@wordpress/block-editor';
import * as Editor from '@wordpress/editor';

//import { isBootstrap5Active, isCssGridEnabled } from '../helper';

const { InnerBlocks, InspectorControls } = BlockEditor || Editor; // Fallback to deprecated '@wordpress/editor' for backwards compatibility

const ALLOWED_BLOCKS = [ 'wp-bootstrap-blocks/accordion-item' ];

class BootstrapAccordionEdit extends Component {
	render() {
		const {
			attributes,
			className,
			clientId,
			updateAlwaysOpen,
			setAttributes,
			items,
		} = this.props;
		const { alwaysOpen } = attributes;

		setAttributes( { clientId } );
		items.forEach( function ( child ) {
			dispatch( 'core/block-editor' ).updateBlockAttributes(
				child.clientId,
				{ parentClientId: clientId }
			);
		} );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __(
							'Accordion items Options',
							'wp-bootstrap-blocks'
						) }
						initialOpen={ true }
					>
						<CheckboxControl
							label={ __( 'Always open', 'wp-bootstrap-blocks' ) }
							checked={ alwaysOpen }
							onChange={ updateAlwaysOpen }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ className }>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ [
							[ 'wp-bootstrap-blocks/accordion-item', {} ],
						] }
						templateLock={ false }
						renderAppender={ InnerBlocks.ButtonBlockAppender }
					/>
				</div>
			</Fragment>
		);
	}
}

const applyWithSelect = withSelect( ( select, { clientId } ) => {
	const { getBlocksByClientId } =
		select( 'core/block-editor' ) || select( 'core/editor' ); // Fallback to 'core/editor' for backwards compatibility

	const items = getBlocksByClientId( clientId )[ 0 ]
		? getBlocksByClientId( clientId )[ 0 ].innerBlocks
		: [];

	return {
		items,
	};
} );

const applyWithDispatch = withDispatch(
	( dispatch, { setAttributes, items, clientId } ) => {
		return {
			updateAlwaysOpen( alwaysOpen ) {
				const { updateBlockAttributes } =
					dispatch( 'core/block-editor' ) ||
					dispatch( 'core/editor' ); // Fallback to 'core/editor' for backwards compatibility
				setAttributes( { alwaysOpen } );
				items.forEach( ( item ) => {
					updateBlockAttributes( item.clientId, {
						alwaysOpen,
						parentClientId: clientId,
					} );
				} );
			},
		};
	}
);

export default compose(
	applyWithSelect,
	applyWithDispatch
)( BootstrapAccordionEdit );
