/**
 * Opens the global block inserter.
 */
Cypress.Commands.add( 'openGlobalBlockInserter', () => {
	cy.get( '.edit-post-header [aria-label="Add block"]' ).click()
} )
