/// <reference types="Cypress" />

context('Actions', () => {
	beforeEach(() => {
		cy.loginUser()
	})

	it('example test', () => {
		cy.createNewPost()
		cy.insertBlock( 'Heading' )
		// Check if block was inserted
		cy.get( '.wp-block[data-type="core/heading"]' ).should('have.length', 1);
		cy.postContentMatchesSnapshot()
	})
})
