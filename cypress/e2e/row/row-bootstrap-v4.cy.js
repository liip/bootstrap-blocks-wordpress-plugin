/// <reference types="Cypress" />

context( 'Row Block Bootstrap 4', () => {
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

	it( 'Should not display Bootstrap v5 options', () => {
		cy.insertRowBlock();
		cy.selectRowBlock();
		cy.ensureSidebarOpened();

		// Horizontal Gutters options should not exist
		cy.xpath(
			'//label[contains(@class,"components-base-control__label")][contains(text(),"Horizontal Gutters")]'
		).should( 'not.exist' );

		// Vertical Gutters options should not exist
		cy.xpath(
			'//label[contains(@class,"components-base-control__label")][contains(text(),"Vertical Gutters")]'
		).should( 'not.exist' );
	} );
} );
