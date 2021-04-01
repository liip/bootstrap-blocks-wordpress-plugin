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

	it.only( 'Should be possible to change column layout', () => {
		cy.insertRowBlock();
		cy.selectRowBlock();
		cy.ensureSidebarOpened();

		// Layout options should be visible
		cy.get('.wp-bootstrap-blocks-template-selector-button').should( 'have.length', 5 );
		cy.get('.wp-bootstrap-blocks-template-selector-button > button[aria-label="2 Columns (1:1)"].is-active').should( 'not.be.null' )
		cy.get('.block-editor-block-list__block[data-type="wp-bootstrap-blocks/column"][data-size-md="6"]').should( 'have.length', 2 );

		// Template should be applied
		cy.get('.wp-bootstrap-blocks-template-selector-button > button[aria-label="3 Columns (1:1:1)"]').click()
		cy.get('.block-editor-block-list__block[data-type="wp-bootstrap-blocks/column"][data-size-md="4"]').should('have.length', 3 );
		cy.postContentMatchesSnapshot()

		cy.get('.wp-bootstrap-blocks-template-selector-button > button[aria-label="2 Columns (2:1)"]').click();
		cy.postContentMatchesSnapshot()
	} );
})
