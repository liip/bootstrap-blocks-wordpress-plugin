/// <reference types="Cypress" />

describe( 'Container Block Bootstrap 5', () => {
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

	it( 'Should display xxl breakpoint', () => {
		cy.insertContainerBlock();
		cy.selectContainerBlock();
		cy.ensureSidebarOpened();

		cy.xpath(
			`//label[contains(@class,"components-input-control__label")][contains(text(),"Fluid Breakpoint")]/parent::div/following-sibling::div/select[contains(@class,"components-select-control__input")]/option`
		).should( 'have.length', 6 );

		// xxl option should exist
		cy.xpath(
			`//label[contains(@class,"components-input-control__label")][contains(text(),"Fluid Breakpoint")]/parent::div/following-sibling::div/select[contains(@class,"components-select-control__input")]/option[@value='xxl']`
		).should( 'have.length', 1 );
	} );
} );
