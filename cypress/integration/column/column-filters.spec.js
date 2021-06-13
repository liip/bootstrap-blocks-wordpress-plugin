/// <reference types="Cypress" />

describe( 'Column Block Filters', () => {
	before( () => {
		cy.loginUser();
		cy.activatePlugin( 'wp-bootstrap-blocks-test-column-filters' );
	} );

	after( () => {
		cy.loginUser();
		cy.deactivatePlugin( 'wp-bootstrap-blocks-test-column-filters' );
	} );

	beforeEach( () => {
		cy.loginUser();
		cy.createNewPost();
	} );

	it( 'wpBootstrapBlocks.column.bgColorOptions should add background color', () => {
		cy.insertRowBlock();
		cy.selectColumnBlock();
		cy.ensureSidebarOpened();

		cy.openSidebarPanelWithTitle( 'Background color' );

		// Additional background color should be available
		cy.get(
			'.components-circular-option-picker__option[aria-label="Color: brand"]'
		).should( 'exist' );

		// Background color should be applied
		cy.get(
			'.components-circular-option-picker__option[aria-label="Color: brand"]'
		).click();

		cy.postContentMatchesSnapshot();
	} );

	it( 'wpBootstrapBlocks.column.paddingOptions should add padding option', () => {
		cy.insertRowBlock();
		cy.selectColumnBlock();
		cy.ensureSidebarOpened();

		cy.openSidebarPanelWithTitle( 'Padding (inside column)' );

		// Additional padding option should be available
		cy.selectOptionIsAvailable( 'Size', 'p-8' );

		// Padding option should be applied
		cy.getSelectByLabel( 'Size' ).select( 'p-8' );

		cy.postContentMatchesSnapshot();
	} );

	it( 'wp_bootstrap_blocks_column_default_attributes should override default attributes', () => {
		cy.insertRowBlock();
		cy.selectColumnBlock();
		cy.ensureSidebarOpened();

		// Columm size values should be set
		cy.openSidebarPanelWithTitle( 'Column size' );
		cy.getInputByLabel( 'Xs Column count' ).should( 'have.value', '4' );
		cy.getInputByLabel( 'Sm Column count' ).should( 'have.value', '6' );
		// For the md column count we would expect a value of 8 but it gets overwritten by the default layout which has a value of 6.
		cy.getInputByLabel( 'Md Column count' ).should( 'have.value', '6' );
		cy.getInputByLabel( 'Lg Column count' ).should( 'have.value', '10' );
		cy.getInputByLabel( 'Xl Column count' ).should( 'have.value', '0' );

		// Columm equal-width checkboxes should be checked
		cy.getCheckboxByLabel( 'Xl equal-width' ).should( 'be.checked' );

		// Background color should be selected
		cy.openSidebarPanelWithTitle( 'Background color' );
		// There is no way to see which color of a color palette is selected. That's why we check the data attribute value.
		cy.get(
			'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/column"]'
		)
			.first()
			.should( 'have.attr', 'data-bg-color', 'primary' );

		// Padding should be selected
		cy.openSidebarPanelWithTitle( 'Padding (inside column)' );
		cy.getSelectByLabel( 'Size' ).should( 'have.value', 'p-3' );

		// Content vertical alignment bottom should be selected
		cy.toolbarOptionIsActive(
			'Change vertical alignment of content',
			'Align content bottom'
		);

		// Check if attributes are set correctly
		cy.postContentMatchesSnapshot();
	} );
} );
