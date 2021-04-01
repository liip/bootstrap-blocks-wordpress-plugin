/**
 * Internal dependencies
 */
import { WP_USERNAME, WP_PASSWORD } from '../shared/config';
import { createURL } from '../shared/create-url';

/**
 * Performs log in with specified username and password.
 *
 * @param {?string} username String to be used as user credential.
 * @param {?string} password String to be used as user credential.
 */
Cypress.Commands.add( 'loginUser', ( username = WP_USERNAME, password = WP_PASSWORD ) => {
	cy.visit( createURL( 'wp-login.php' ) )

	// somehow we need to wait for some time before entering the credentials
	cy.wait(500)

	cy.get( '#user_login' )
		.clear()
		.type( username )

	cy.get( '#user_pass' )
		.clear()
		.type( password )

	cy.get( '#wp-submit' )
		.click( { force: true } )
} )
