// WordPress dependencies
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
//import { applyFilters } from '@wordpress/hooks';

import * as BlockEditor from '@wordpress/block-editor';
import * as Editor from '@wordpress/editor';

const { InnerBlocks, RichText } = BlockEditor || Editor; // Fallback to deprecated '@wordpress/editor' for backwards compatibility

class BootstrapAccordionItemEdit extends Component {
	render() {
		const { attributes, hasSelectedBlock, clientId, setAttributes } =
			this.props;
		const { title } = attributes;

		setAttributes( { clientId } );

		return (
			<Fragment>
				<RichText
					tagName="h2"
					className="accordion-header"
					placeholder={ __( 'Write a accordion title…' ) }
					value={ title }
					onChange={ ( value ) => setAttributes( { title: value } ) }
				/>
				{ hasSelectedBlock && (
					<InnerBlocks
						templateLock={ false }
						renderAppender={ InnerBlocks.ButtonBlockAppender }
					/>
				) }
			</Fragment>
		);
	}
}

export default compose(
	withSelect( ( select, { clientId, isSelected } ) => {
		const { hasSelectedInnerBlock } =
			select( 'core/block-editor' ) || select( 'core/editor' );

		return {
			hasSelectedBlock:
				hasSelectedInnerBlock( clientId, true ) || isSelected,
		};
	} )
)( BootstrapAccordionItemEdit );
