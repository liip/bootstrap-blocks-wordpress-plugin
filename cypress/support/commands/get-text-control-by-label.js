Cypress.Commands.add( 'getTextControlByLabel', ( label ) => {
	cy.xpath(`//label[contains(@class,"components-base-control__label")][contains(text(),"${ label }")]/following-sibling::input[contains(@class,"components-text-control__input")]`)
} )
