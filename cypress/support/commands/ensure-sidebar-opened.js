Cypress.Commands.add( 'ensureSidebarOpened', () => {
	cy
		.window().then( ( window ) => {
			if ( ! window.document.querySelector( '.edit-post-sidebar' ) ) {
				cy.get( '.edit-post-header__settings [aria-label="Settings"]' ).click( { force: true } )
			}
		})
} )
