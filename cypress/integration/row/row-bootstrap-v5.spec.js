/// <reference types="Cypress" />

context( 'Row Block Bootstrap 5', () => {
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

	it( 'Should display Bootstrap v5 options', () => {
		cy.insertRowBlock();
		cy.selectRowBlock();
		cy.ensureSidebarOpened();

		// Horizontal Gutters options should exist
		cy.xpath(
			'//label[contains(@class,"components-input-control__label")][contains(text(),"Horizontal Gutters")]'
		).should( 'have.length', 1 );

		// Vertical Gutters options should exist
		cy.xpath(
			'//label[contains(@class,"components-input-control__label")][contains(text(),"Vertical Gutters")]'
		).should( 'have.length', 1 );
	} );

	it( 'Should be possible to change gutter sizes', () => {
		cy.insertRowBlock();
		cy.selectRowBlock();
		cy.ensureSidebarOpened();

		// Change horizontal gutter
		cy.getSelectByLabel( 'Horizontal Gutters' ).select( 'gx-5' );

		// Change vertical gutter
		cy.getSelectByLabel( 'Vertical Gutters' ).select( 'gy-3' );

		cy.postContentMatchesSnapshot();
	} );

	it( 'Should hide gutter options when no gutters is checked', () => {
		cy.insertRowBlock();
		cy.selectRowBlock();
		cy.ensureSidebarOpened();

		// Enable no gutters option
		cy.clickElementByText( 'label', 'No Gutters' );

		// Horizontal Gutters options should be hidden
		cy.xpath(
			'//label[contains(@class,"components-base-control__label")][contains(text(),"Horizontal Gutters")]'
		).should( 'not.exist' );

		// Vertical Gutters options should be hidden
		cy.xpath(
			'//label[contains(@class,"components-base-control__label")][contains(text(),"Vertical Gutters")]'
		).should( 'not.exist' );
	} );
} );
