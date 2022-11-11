/// <reference types="Cypress" />

describe( 'Column Block Bootstrap 4', () => {
	before( () => {
		cy.loginUser();
		cy.activatePlugin( 'wp-bootstrap-blocks-test-bootstrap-v4' );
	} );

	after( () => {
		cy.loginUser();
		cy.deactivatePlugin( 'wp-bootstrap-blocks-test-bootstrap-v4' );
	} );

	beforeEach( () => {
		cy.loginUser();
		cy.createNewPost();
	} );

	it( 'Should not display xxl breakpoint options if run with Bootstrap 4', () => {
		cy.insertRowBlock();
		cy.ensureSidebarOpened();

		// Select first column block
		cy.selectColumnBlock();
		cy.openSidebarPanelWithTitle( 'Column size' );

		// Xl column count option should exist
		cy.xpath(
			'//label[contains(@class,"components-base-control__label")][contains(text(),"Xl Column count")]'
		).should( 'exist' );

		// Xxl column count option should not exist
		cy.xpath(
			'//label[contains(@class,"components-base-control__label")][contains(text(),"Xxl Column count")]'
		).should( 'not.exist' );

		// Xl equal-width option should exist
		cy.xpath(
			'//label[contains(@class,"components-checkbox-control__label")][contains(text(),"Xl equal-width")]'
		).should( 'exist' );

		// Xxl equal-width option should not exist
		cy.xpath(
			'//label[contains(@class,"components-checkbox-control__label")][contains(text(),"Xxl equal-width")]'
		).should( 'not.exist' );
	} );
} );
