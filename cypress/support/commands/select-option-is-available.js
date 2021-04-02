Cypress.Commands.add( 'selectOptionIsAvailable', ( selectLabel, optionValue ) => {
	cy.xpath(`//label[contains(@class,"components-input-control__label") and contains(text(),"${ selectLabel }")]/parent::div/following-sibling::div/select[contains(@class,"components-select-control__input")]/option[@value="${ optionValue }"]`).should('exist')
} )
