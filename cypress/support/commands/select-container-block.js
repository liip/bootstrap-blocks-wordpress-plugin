Cypress.Commands.add( 'selectContainerBlock', ( index = 0 ) => {
	cy.selectBlockByName( 'wp-bootstrap-blocks/container', index );
} );
