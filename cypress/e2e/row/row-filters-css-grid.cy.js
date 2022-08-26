/// <reference types="Cypress" />

describe( 'Row Block Filters CSS grid', () => {
	before( () => {
		cy.loginUser();
		cy.activatePlugin( 'wp-bootstrap-blocks-test-css-grid' );
		cy.activatePlugin( 'wp-bootstrap-blocks-test-row-filters' );
	} );

	after( () => {
		cy.loginUser();
		cy.deactivatePlugin( 'wp-bootstrap-blocks-test-css-grid' );
		cy.deactivatePlugin( 'wp-bootstrap-blocks-test-row-filters' );
	} );

	beforeEach( () => {
		cy.loginUser();
		cy.createNewPost();
	} );

	it( 'wpBootstrapBlocks.row.cssGridGuttersOptions should add gutters option', () => {
		cy.insertRowBlock();
		cy.selectRowBlock();
		cy.ensureSidebarOpened();

		// Disable No Gutters option to make Gutter options visible
		cy.clickElementByText( 'label', 'No Gutters' );

		// Additional gutters option should be available
		cy.selectOptionIsAvailable( 'Gutters', '10rem' );

		// Gutters option should be applied
		cy.getSelectByLabel( 'Gutters' ).select( '10rem' );

		cy.postContentMatchesSnapshot();
	} );

	it( 'wp_bootstrap_blocks_row_default_attributes should override default attributes with CSS grid', () => {
		cy.insertRowBlock();
		cy.selectRowBlock();
		cy.ensureSidebarOpened();

		// Disable No Gutters option to make Gutter options visible
		cy.clickElementByText( 'label', 'No Gutters' );

		// Horizontal Gutters should be selected
		cy.getSelectByLabel( 'Gutters' ).should( 'have.value', '1rem' );

		// Check if attributes are set correctly
		cy.postContentMatchesSnapshot();
	} );
} );
