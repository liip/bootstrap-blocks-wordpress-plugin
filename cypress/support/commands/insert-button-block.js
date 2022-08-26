Cypress.Commands.add( 'insertButtonBlock', () => {
	cy.searchForBlock( 'Bootstrap Button' );
	cy.get( 'button.editor-block-list-item-wp-bootstrap-blocks-button' ).click(
		{ force: true }
	);
} );
