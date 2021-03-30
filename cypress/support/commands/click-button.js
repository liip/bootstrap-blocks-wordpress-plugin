/**
 * Clicks a button.
 *
 * @param {string} label  The text string of the button label.
 */
Cypress.Commands.add( 'clickButton', ( buttonText ) => {
	cy
		.xpath(
			`//button[contains(text(), '${ buttonText }')]`
		)
		.click()
} )
