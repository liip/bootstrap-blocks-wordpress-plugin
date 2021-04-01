Cypress.Commands.add( 'openSidebarPanel', ( title ) => {
	cy.xpath(
		`//div[contains(@class,"edit-post-sidebar")]//button[@class="components-button components-panel__body-toggle"][contains(text(),"${ title }")]`
	).click( { force: true } )
} )
