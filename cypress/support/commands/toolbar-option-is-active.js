Cypress.Commands.add( 'toolbarOptionIsActive', ( toolbarLabel, buttonText ) => {
	cy.clickBlockToolbarButton( toolbarLabel );
	cy
		.xpath(
			`//button[contains(text(),"${ buttonText }") and contains(@class,"is-active")]`
		).should('exist')
	cy.clickBlockToolbarButton( toolbarLabel );
} )
