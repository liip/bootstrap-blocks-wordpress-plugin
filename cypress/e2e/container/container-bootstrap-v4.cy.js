/// <reference types="Cypress" />

describe( 'Container Block Bootstrap 4', () => {
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
		cy.insertContainerBlock();
		cy.selectContainerBlock();
		cy.ensureSidebarOpened();

		cy.xpath(
			`//label[contains(@class,"components-input-control__label")][contains(text(),"Fluid Breakpoint")]/parent::div/following-sibling::div/select[contains(@class,"components-select-control__input")]/option`
		).should( 'have.length', 5 );

		// xxl option should not exist
		cy.xpath(
			`//label[contains(@class,"components-input-control__label")][contains(text(),"Fluid Breakpoint")]/parent::div/following-sibling::div/select[contains(@class,"components-select-control__input")]/option[@value='xxl']`
		).should( 'not.exist' );
	} );
} );
