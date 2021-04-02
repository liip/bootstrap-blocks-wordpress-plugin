Cypress.Commands.add( 'activatePlugin', ( slug ) => {
	cy.visitAdminPage( 'plugins.php' );
	cy.window().then( ( window ) => {
		const disableLink = window.document.querySelector( `tr[data-slug="${ slug }"] .deactivate a` )
		if ( ! disableLink ) {
			cy.get(`tr[data-slug="${ slug }"] .activate a`).click()
			cy.get(`tr[data-slug="${ slug }"] .deactivate a`).should('exist')
		}
	})
} )
