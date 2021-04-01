/**
 * Clicks an element by its containing text.
 *
 * @param {string} label  The text string of the button label.
 */
Cypress.Commands.add( 'clickElementByText', ( elementExpression, text ) => {
	cy.xpath(`//${ elementExpression }[contains(text(),"${ text }")]`).click( { force: true } )
} )
