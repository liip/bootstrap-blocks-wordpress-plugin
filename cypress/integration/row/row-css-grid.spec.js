/// <reference types="Cypress" />

context( 'Row Block CSS grid', () => {
	before( () => {
		cy.loginUser();
		cy.activatePlugin( 'wp-bootstrap-blocks-test-css-grid' );
	} );

	after( () => {
		cy.loginUser();
		cy.deactivatePlugin( 'wp-bootstrap-blocks-test-css-grid' );
	} );

	beforeEach( () => {
		cy.loginUser();
		cy.createNewPost();
	} );

	it( 'Should display CSS grid options', () => {
		cy.insertRowBlock();
		cy.selectRowBlock();
		cy.ensureSidebarOpened();

		// Gutters options should exist
		cy.xpath(
			'//label[contains(@class,"components-input-control__label")][contains(text(),"Gutters")]'
		).should( 'have.length', 1 );
	} );

	it( 'Should be possible to change gutters size', () => {
		cy.insertRowBlock();
		cy.selectRowBlock();
		cy.ensureSidebarOpened();

		// Change gutters
		cy.getSelectByLabel( 'Gutters' ).select( '2rem' );

		cy.postContentMatchesSnapshot();
	} );

	it( 'Should hide gutter options when no gutters is checked', () => {
		cy.insertRowBlock();
		cy.selectRowBlock();
		cy.ensureSidebarOpened();

		// Enable no gutters option
		cy.clickElementByText( 'label', 'No Gutters' );

		// Gutters options should be hidden
		cy.xpath(
			'//label[contains(@class,"components-base-control__label")][contains(text(),"Gutters")]'
		).should( 'not.exist' );
	} );
} );
