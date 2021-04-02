Cypress.Commands.add( 'deactivatePlugin', ( slug ) => {
	cy.visitAdminPage( 'plugins.php' );
	cy.window().then( ( window ) => {
		const deleteLink = window.document.querySelector( `tr[data-slug="${ slug }"] .delete a` )
		if ( ! deleteLink ) {
			cy.get(`tr[data-slug="${ slug }"] .deactivate a`).click()
			cy.get(`tr[data-slug="${ slug }"] .delete a`).should('exist')
		}
	})
} )
