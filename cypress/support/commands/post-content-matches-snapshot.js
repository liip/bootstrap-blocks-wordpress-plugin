Cypress.Commands.add( 'postContentMatchesSnapshot', () => {
	cy.window().then( ( window ) => {
		cy.wrap(
			window.wp.data.select( 'core/editor' ).getEditedPostContent()
		).snapshot();
	} );
} );
