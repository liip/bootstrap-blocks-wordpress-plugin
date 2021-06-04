import { getAllBlocks } from 'cypress-wp-test-utils';

export const testBlockTransform = () => {
	return getAllBlocks().then( ( blocks ) => {
		const blockCount = blocks.length;
		const firstBlockId = blocks[ 0 ].clientId;
		const lastBlockId = blocks[ blocks.length - 1 ].clientId;
		const expectedColumnSize = Math.max( Math.round( 12 / blockCount ), 3 );

		return cy
			.window()
			.then( ( window ) => {
				return window.wp.data
					.dispatch( 'core/block-editor' )
					.multiSelect( firstBlockId, lastBlockId );
			} )
			.then( () => {
				// Transform block
				cy.clickBlockToolbarButton( 'Heading' );
				cy.get(
					'.editor-block-list-item-wp-bootstrap-blocks-row'
				).click();

				cy.get(
					`[data-type="wp-bootstrap-blocks/column"][data-size-md="${ expectedColumnSize }"]`
				).should( 'have.length', blockCount );
			} );
	} );
};
