/// <reference types="Cypress" />

describe( 'Column Block Bootstrap 5', () => {
	before( () => {
		cy.loginUser();
		cy.activatePlugin( 'wp-bootstrap-blocks-test-bootstrap-v5' );
	} );

	after( () => {
		cy.loginUser();
		cy.deactivatePlugin( 'wp-bootstrap-blocks-test-bootstrap-v5' );
	} );

	beforeEach( () => {
		cy.loginUser();
		cy.createNewPost();
	} );

	it( 'Should display xxl breakpoint options', () => {
		cy.insertRowBlock();
		cy.ensureSidebarOpened();

		// Select first column block
		cy.selectColumnBlock();
		cy.openSidebarPanelWithTitle( 'Column size' );

		// Xxl column count option should exist
		cy.xpath(
			'//label[contains(@class,"components-base-control__label")][contains(text(),"Xxl Column count")]'
		).should( 'exist' );

		// Xxl equal-width option should exist
		cy.xpath(
			'//label[contains(@class,"components-checkbox-control__label")][contains(text(),"Xxl equal-width")]'
		).should( 'exist' );
	} );

	it( 'Should be possible to select column size for xxl breakpoint', () => {
		cy.insertRowBlock();
		cy.ensureSidebarOpened();

		// Select first column block
		cy.selectColumnBlock();
		cy.openSidebarPanelWithTitle( 'Column size' );

		// Change column count
		cy.get(
			'input.components-input-control__input[aria-label="Xxl Column count"]'
		).type( '2' );
		cy.get( '[data-type="wp-bootstrap-blocks/column"]' )
			.first()
			.should( 'have.attr', 'data-size-xxl', '2' );

		// Enable column equal-width
		cy.clickElementByText( 'label', 'Xxl equal-width' );

		cy.postContentMatchesSnapshot();
	} );
} );
