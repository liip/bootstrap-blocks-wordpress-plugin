/// <reference types="Cypress" />

describe( 'Column Block Filters Bootstrap 5', () => {
	before( () => {
		cy.loginUser();
		cy.activatePlugin( 'wp-bootstrap-blocks-test-bootstrap-v5' );
		cy.activatePlugin( 'wp-bootstrap-blocks-test-column-filters' );
	} );

	after( () => {
		cy.loginUser();
		cy.deactivatePlugin( 'wp-bootstrap-blocks-test-bootstrap-v5' );
		cy.deactivatePlugin( 'wp-bootstrap-blocks-test-column-filters' );
	} );

	beforeEach( () => {
		cy.loginUser();
		cy.createNewPost();
	} );

	it( 'wp_bootstrap_blocks_column_default_attributes should override default attributes with Bootstrap 5', () => {
		cy.insertRowBlock();
		cy.selectColumnBlock();
		cy.ensureSidebarOpened();

		// Xxl Columm size value should be set
		cy.openSidebarPanelWithTitle( 'Column size' );
		cy.getInputByLabel( 'Xxl Column count' ).should( 'have.value', '5' );

		// Check if attributes are set correctly
		cy.postContentMatchesSnapshot();
	} );
} );
