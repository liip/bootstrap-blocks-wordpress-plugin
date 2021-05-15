Cypress.Commands.add( 'insertContainerBlock', () => {
	cy.searchForBlock( 'Bootstrap Container' );
	cy.get(
		'button.editor-block-list-item-wp-bootstrap-blocks-container'
	).click( { force: true } );
} );
