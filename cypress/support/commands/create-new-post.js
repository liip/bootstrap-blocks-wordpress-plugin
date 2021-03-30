/**
 * WordPress dependencies
 */
import { addQueryArgs } from '@wordpress/url';

/**
 * Creates new post.
 *
 * @param {Object} obj Object to create new post, along with tips enabling option.
 */
Cypress.Commands.add( 'createNewPost', ( {
	postType,
	title,
	content,
	excerpt,
	showWelcomeGuide = false,
} = {} ) => {
	const query = addQueryArgs( '', {
		post_type: postType,
		post_title: title,
		content,
		excerpt,
	} ).slice( 1 );

	cy.visitAdminPage( 'post-new.php', query );

	if ( ! showWelcomeGuide ) {
		cy.closeWelcomeGuide()
	}
} )
