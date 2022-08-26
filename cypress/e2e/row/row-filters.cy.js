/// <reference types="Cypress" />

describe( 'Row Block Filters', () => {
	before( () => {
		cy.loginUser();
		cy.activatePlugin( 'wp-bootstrap-blocks-test-row-filters' );
	} );

	after( () => {
		cy.loginUser();
		cy.deactivatePlugin( 'wp-bootstrap-blocks-test-row-filters' );
	} );

	beforeEach( () => {
		cy.loginUser();
		cy.createNewPost();
	} );

	it( 'wpBootstrapBlocks.row.templates should add additional template', () => {
		cy.insertRowBlock();
		cy.selectRowBlock();
		cy.ensureSidebarOpened();

		// Additional template should be available
		cy.get( '.wp-bootstrap-blocks-template-selector-button' ).should(
			'have.length',
			5
		); // 4 default templates + 1 additional template (custom template disabled)
		cy.get(
			'.wp-bootstrap-blocks-template-selector-button > button[aria-label="1 Column (2/3 width)"]'
		).should( 'exist' );
		cy.get(
			'.wp-bootstrap-blocks-template-selector-button > button[aria-label="1 Column (2/3 width)"] > span.dashicons-yes'
		).should( 'exist' );

		// Template should be applied
		cy.get(
			'.wp-bootstrap-blocks-template-selector-button > button[aria-label="1 Column (2/3 width)"]'
		).click();

		cy.postContentMatchesSnapshot();
	} );

	it( 'wpBootstrapBlocks.row.enableCustomTemplate should disable custom template', () => {
		cy.insertRowBlock();
		cy.selectRowBlock();
		cy.ensureSidebarOpened();

		// Custom template shouldn't be available
		cy.get( '.wp-bootstrap-blocks-template-selector-button' ).should(
			'have.length',
			5
		); // 4 default templates + 1 additional template (custom template disabled)
		cy.get(
			'.wp-bootstrap-blocks-template-selector-button > button[aria-label="Custom"]'
		).should( 'not.exist' );
	} );

	it( 'wp_bootstrap_blocks_row_default_attributes should override default attributes', () => {
		cy.insertRowBlock();
		cy.selectRowBlock();
		cy.ensureSidebarOpened();

		// 1:2 template should be selected
		cy.get(
			'.wp-bootstrap-blocks-template-selector-button > button[aria-label="2 Columns (1:2)"].is-active'
		).should( 'exist' );

		// No Gutters option should be checked
		cy.getCheckboxByLabel( 'No Gutters' ).should( 'be.checked' );

		// Editor stack columns option should be checked
		cy.getCheckboxByLabel( 'Editor: Display columns stacked' ).should(
			'be.checked'
		);

		// Align columns right should be selected
		cy.toolbarOptionIsActive(
			'Change horizontal alignment of columns',
			'Align columns right'
		);

		// Align columns bottom should be selected
		cy.toolbarOptionIsActive(
			'Change vertical alignment of columns',
			'Align columns bottom'
		);

		// Check if attributes are set correctly
		cy.postContentMatchesSnapshot();
	} );
} );
