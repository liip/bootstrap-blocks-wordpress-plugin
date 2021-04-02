Cypress.Commands.add( 'setPostContent', ( content ) => {
	// TODO: We have to insert at least one block before setting the post content
	cy.insertBlock('Paragraph')
	cy.window().then( ( window ) => {
		const blocks = window.wp.blocks.parse( content )
		window.wp.data.dispatch( 'core/block-editor' ).resetBlocks( blocks )
	} )
} )
