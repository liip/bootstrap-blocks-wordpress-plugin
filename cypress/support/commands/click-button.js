/**
 * Clicks a block toolbar button.
 *
 * @param {string} label  The text string of the button label.
 * @param {string} [type] The type of button label: 'ariaLabel' or 'content'.
 */
Cypress.Commands.add( 'clickButton', ( buttonText ) => {
	cy
		.xpath(
			`//button[contains(text(), '${ buttonText }')]`
		)
		.click()
} )
