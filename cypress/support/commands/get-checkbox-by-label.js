Cypress.Commands.add( 'getCheckboxByLabel', ( label ) => {
	cy.xpath(`//label[contains(@class,"components-checkbox-control__label")][contains(text(),"${ label }")]/preceding-sibling::span[contains(@class,"components-checkbox-control__input-container")]/input`)
} )
