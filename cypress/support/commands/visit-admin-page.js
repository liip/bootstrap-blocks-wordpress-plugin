/**
 * External dependencies
 */
import { join } from 'path';

/**
 * Internal dependencies
 */
import { createURL } from '../shared/create-url';

/**
 * Visits admin page; if user is not logged in then it logging in it first, then visits admin page.
 *
 * @param {string} adminPath String to be serialized as pathname.
 * @param {string} query String to be serialized as query portion of URL.
 */
Cypress.Commands.add( 'visitAdminPage', ( adminPath, query ) => {
	cy.visit( createURL( join( 'wp-admin', adminPath ), query ) )
} )
