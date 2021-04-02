Cypress.Commands.add( 'openSidebarPanelWithTitle', ( title ) => {
	cy.ensureSidebarOpened()

	// Check if sidebar panel exists
	cy.xpath(`//div[contains(@class,"edit-post-sidebar")]//button[@class="components-button components-panel__body-toggle"][contains(text(),"${ title }")]`).should('exist')

	// Only open panel if it's not expanded already (aria-expanded check)
	cy.window().then( ( window ) => {
		const panelClosed = window.document.evaluate( `//div[contains(@class,"edit-post-sidebar")]//button[@class="components-button components-panel__body-toggle"][@aria-expanded="false"][contains(text(),"${ title }")]`, window.document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue
		if ( panelClosed ) {
			cy.wrap( panelClosed ).click( { force: true } )
		}
	})
} )
