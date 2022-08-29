/// <reference types="Cypress" />

describe( 'Row Block Filters Bootstrap 5', () => {
	before( () => {
		cy.loginUser();
		cy.activatePlugin( 'wp-bootstrap-blocks-test-bootstrap-v5' );
		cy.activatePlugin( 'wp-bootstrap-blocks-test-row-filters' );
	} );

	after( () => {
		cy.loginUser();
		cy.deactivatePlugin( 'wp-bootstrap-blocks-test-bootstrap-v5' );
		cy.deactivatePlugin( 'wp-bootstrap-blocks-test-row-filters' );
	} );

	beforeEach( () => {
		cy.loginUser();
		cy.createNewPost();
	} );

	it( 'wpBootstrapBlocks.row.horizontalGuttersOptions should add horizontal gutters option', () => {
		cy.insertRowBlock();
		cy.selectRowBlock();
		cy.ensureSidebarOpened();

		// Disable No Gutters option to make Gutter options visible
		cy.clickElementByText( 'label', 'No Gutters' );

		// Additional horizontal gutters option should be available
		cy.selectOptionIsAvailable( 'Horizontal Gutters', 'gx-10' );

		// Horizontal Gutters option should be applied
		cy.getSelectByLabel( 'Horizontal Gutters' ).select( 'gx-10' );

		cy.postContentMatchesSnapshot();
	} );

	it( 'wpBootstrapBlocks.row.verticalGuttersOptions should add vertical gutters option', () => {
		cy.insertRowBlock();
		cy.selectRowBlock();
		cy.ensureSidebarOpened();

		// Disable No Gutters option to make Gutter options visible
		cy.clickElementByText( 'label', 'No Gutters' );

		// Additional vertical gutters option should be available
		cy.selectOptionIsAvailable( 'Vertical Gutters', 'gy-10' );

		// Vertical Gutters option should be applied
		cy.getSelectByLabel( 'Vertical Gutters' ).select( 'gy-10' );

		cy.postContentMatchesSnapshot();
	} );

	it( 'wp_bootstrap_blocks_row_default_attributes should override default attributes with Bootstrap 5', () => {
		cy.insertRowBlock();
		cy.selectRowBlock();
		cy.ensureSidebarOpened();

		// Disable No Gutters option to make Gutter options visible
		cy.clickElementByText( 'label', 'No Gutters' );

		// Horizontal Gutters should be selected
		cy.getSelectByLabel( 'Horizontal Gutters' ).should(
			'have.value',
			'gx-5'
		);

		// Vertical Gutters should be selected
		cy.getSelectByLabel( 'Vertical Gutters' ).should(
			'have.value',
			'gy-3'
		);

		// Check if attributes are set correctly
		cy.postContentMatchesSnapshot();
	} );
} );
