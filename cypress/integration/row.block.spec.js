/// <reference types="Cypress" />

context('Row Block', () => {
	beforeEach(() => {
		cy.loginUser()
		cy.createNewPost()
	})

	it('Row block should be available', () => {
		cy.insertBlock( 'Bootstrap Row', 'Row' );

		// Check if row block was inserted
		cy.get(
			'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/row"]'
		).should('exist')
		cy.get(
			'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/column"]'
		).should( 'have.length', 2 )

		cy.postContentMatchesSnapshot()
	})

	it( 'Should be possible to change alignment', () => {
		cy.insertBlock( 'Bootstrap Row', 'Row' );
		cy.selectBlockByName( 'wp-bootstrap-blocks/row' );

		// Change horizontal alignment
		cy.clickBlockToolbarButton(
			'Change horizontal alignment of columns'
		);
		cy.clickButton(
			'Align columns right'
		);
		cy.get(
			'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/row"][data-alignment="right"]'
		).should('exist')
		cy.postContentMatchesSnapshot()

		// Change vertical alignment
		cy.clickBlockToolbarButton(
			'Change vertical alignment of columns'
		);
		cy.clickButton(
			'Align columns bottom'
		);
		cy.get(
			'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/row"][data-vertical-alignment="bottom"]'
		).should('exist')
		cy.postContentMatchesSnapshot()
	} );
})
