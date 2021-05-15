Cypress.Commands.add( 'rowTemplateIsSelected', ( label ) => {
	cy.get(
		`.wp-bootstrap-blocks-template-selector-button > button[aria-label="${ label }"].is-active`
	).should( 'exist' );
} );
