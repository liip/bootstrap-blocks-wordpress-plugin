Cypress.Commands.add( 'getInputByLabel', ( label ) => {
	cy.get(`input[aria-label="${ label }"]`)
} )
