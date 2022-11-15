/// <reference types="Cypress" />

describe( 'Button Block Filters', () => {
	before( () => {
		cy.loginUser();
		cy.activatePlugin( 'wp-bootstrap-blocks-test-button-filters' );
	} );

	after( () => {
		cy.loginUser();
		cy.deactivatePlugin( 'wp-bootstrap-blocks-test-button-filters' );
	} );

	beforeEach( () => {
		cy.loginUser();
		cy.createNewPost();
	} );

	it( 'wpBootstrapBlocks.button.styleOptions should add style option', () => {
		cy.insertButtonBlock();
		cy.selectButtonBlock();
		cy.ensureSidebarOpened();

		// Additional style option should be available
		cy.selectOptionIsAvailable( 'Style', 'brand' );

		// Style option should be applied
		cy.getSelectByLabel( 'Style' ).select( 'brand' );

		// Style should be visible in UI
		cy.get( '.wp-block-wp-bootstrap-blocks-button' ).should(
			'have.attr',
			'style',
			'background-color: rgb(255, 0, 0); color: rgb(255, 255, 255);'
		);

		// Editor content should match snapshot
		cy.postContentMatchesSnapshot();
	} );

	it( 'Deprecated color attribute should be visible in UI', () => {
		cy.insertButtonBlock();
		cy.selectButtonBlock();
		cy.ensureSidebarOpened();

		cy.getSelectByLabel( 'Style' ).select( 'brand-deprecated-color' );

		// Style should be visible in UI
		cy.get( '.wp-block-wp-bootstrap-blocks-button' ).should(
			'have.attr',
			'style',
			'background-color: rgb(255, 0, 0); color: rgb(255, 255, 255);'
		);

		// Editor content should match snapshot
		cy.postContentMatchesSnapshot();
	} );

	it( 'Use default colors if textColor or bgColor attributes are missing in styleOption', () => {
		cy.insertButtonBlock();
		cy.selectButtonBlock();
		cy.ensureSidebarOpened();

		cy.getSelectByLabel( 'Style' ).select( 'missing-colors' );

		// Style should be visible in UI
		cy.get( '.wp-block-wp-bootstrap-blocks-button' ).should(
			'have.attr',
			'style',
			'background-color: rgb(0, 123, 255); color: rgb(255, 255, 255);'
		);

		// Editor content should match snapshot
		cy.postContentMatchesSnapshot();
	} );

	it( 'wp_bootstrap_blocks_button_default_attributes should override default attributes', () => {
		cy.insertButtonBlock();
		cy.selectButtonBlock();
		cy.ensureSidebarOpened();

		// Alignment should be selected
		cy.toolbarOptionIsActive(
			'Change button alignment',
			'Align text center'
		);

		// Style should be selected
		cy.getSelectByLabel( 'Style' ).should( 'have.value', 'secondary' );

		// Text should be set
		cy.get(
			'[aria-label="Add text..."].block-editor-rich-text__editable'
		).should( 'have.text', 'Liip' );

		// URL should be set
		cy.getInputByLabel( 'URL' ).should( 'have.value', 'https://liip.ch' );

		// Open in new tab is enabled
		cy.getToggleByLabel( 'Open in new tab' ).should( 'be.checked' );

		// Rel should be set
		cy.getTextControlByLabel( 'Link rel' ).should(
			'have.value',
			'custom rel'
		);

		// Check if attributes are set correctly
		cy.postContentMatchesSnapshot();
	} );
} );
