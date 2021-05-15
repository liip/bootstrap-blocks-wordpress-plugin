/// <reference types="Cypress" />

describe( 'Container Block', () => {
	beforeEach( () => {
		cy.loginUser();
		cy.createNewPost();
	} );

	it( 'Container block should be initialized with default attributes', () => {
		cy.insertContainerBlock();
		cy.selectContainerBlock();
		cy.ensureSidebarOpened();

		// Fluid option should not be checked
		cy.getCheckboxByLabel( 'Fluid' ).should( 'not.be.checked' );

		// Fluid Breakpoint select field should be disabled
		cy.xpath(
			'//select[@disabled]/parent::div/preceding-sibling::div/label[contains(text(),"Fluid Breakpoint")]'
		).should( 'exist' );

		// Margin After should be set
		cy.getSelectByLabel( 'Margin After' ).should( 'have.value', 'mb-2' );

		// Editor content should match snapshot
		cy.postContentMatchesSnapshot();
	} );

	it( 'Should be possible to enable fluid option', () => {
		cy.insertContainerBlock();
		cy.selectContainerBlock();
		cy.ensureSidebarOpened();

		// Change column size attributes
		cy.clickElementByText( 'label', 'Fluid', true );

		// Fluid checkbox should be selected
		cy.getCheckboxByLabel( 'Fluid' ).should( 'be.checked' );

		// Editor content should match snapshot
		cy.postContentMatchesSnapshot();

		// Fluid breakpoint option should be applied
		cy.getSelectByLabel( 'Fluid Breakpoint' ).select( 'lg' );

		// Editor content should match snapshot
		cy.postContentMatchesSnapshot();
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
