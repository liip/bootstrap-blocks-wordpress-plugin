Cypress.Commands.add( 'selectRowBlock', ( index = 0 ) => {
	cy.selectBlockByName( 'wp-bootstrap-blocks/row', index );
} );
