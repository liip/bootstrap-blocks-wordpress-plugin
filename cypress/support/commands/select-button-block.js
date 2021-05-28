Cypress.Commands.add( 'selectButtonBlock', ( index = 0 ) => {
	cy.selectBlockByName( 'wp-bootstrap-blocks/button', index );
} );
