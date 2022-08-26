/// <reference types="Cypress" />

describe( 'Container Block Filters', () => {
	before( () => {
		cy.loginUser();
		cy.activatePlugin( 'wp-bootstrap-blocks-test-container-filters' );
	} );

	after( () => {
		cy.loginUser();
		cy.deactivatePlugin( 'wp-bootstrap-blocks-test-container-filters' );
	} );

	beforeEach( () => {
		cy.loginUser();
		cy.createNewPost();
	} );

	it( 'wpBootstrapBlocks.container.marginAfterOptions should add margin option', () => {
		cy.insertContainerBlock();
		cy.selectContainerBlock();
		cy.ensureSidebarOpened();

		// Additional padding option should be available
		cy.selectOptionIsAvailable( 'Margin After', 'mb-8' );

		// Margin option should be applied
		cy.getSelectByLabel( 'Margin After' ).select( 'mb-8' );

		// Editor content should match snapshot
		cy.postContentMatchesSnapshot();
	} );

	it( 'wp_bootstrap_blocks_container_default_attributes should override default attributes', () => {
		cy.insertContainerBlock();
		cy.selectContainerBlock();
		cy.ensureSidebarOpened();

		// Fluid options should be enabled
		cy.getCheckboxByLabel( 'Fluid' ).should( 'be.checked' );

		// Fluid Breakpoint should be selected
		cy.getSelectByLabel( 'Fluid Breakpoint' ).should( 'have.value', 'md' );

		// Margin should be selected
		cy.getSelectByLabel( 'Margin After' ).should( 'have.value', 'mb-3' );

		// Check if attributes are set correctly
		cy.postContentMatchesSnapshot();
	} );
} );
