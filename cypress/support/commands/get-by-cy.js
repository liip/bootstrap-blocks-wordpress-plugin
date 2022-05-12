Cypress.Commands.add( 'getByCy', ( cyKey ) =>
	cy.get( `[data-cy="${ cyKey }"]` )
);
