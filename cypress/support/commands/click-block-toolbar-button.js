/**
 * Clicks a block toolbar button.
 *
 * @param {string} label  The text string of the button label.
 * @param {string} [type] The type of button label: 'ariaLabel' or 'content'.
 */
Cypress.Commands.add( 'clickBlockToolbarButton', ( label, type = 'ariaLabel' ) => {
	const BLOCK_TOOLBAR_SELECTOR = 'block-editor-block-toolbar'
	if ( type === 'ariaLabel' ) {
		cy.get(`.${ BLOCK_TOOLBAR_SELECTOR } button[aria-label="${ label }"]`).click()
	}

	if ( type === 'content' ) {
		cy.get(`//*[@class='${ BLOCK_TOOLBAR_SELECTOR }']//button[contains(text(), '${ label }')]`).click()
	}
} )
