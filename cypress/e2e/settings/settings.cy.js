/// <reference types="Cypress" />

describe( 'Settings page', () => {
	beforeEach( () => {
		cy.loginUser();
	} );

	it( 'Default values should be selected', () => {
		cy.visitAdminPage(
			'options-general.php?page=wp-bootstrap-blocks_settings'
		);

		cy.get(
			'#wp-bootstrap-blocks_bootstrap_version option:selected'
		).should( 'have.value', '4' );

		cy.get( '#wp-bootstrap-blocks_enable_css_grid' )
			.should( 'not.be.checked' )
			.and( 'be.disabled' );
	} );

	it( 'Should respect constants', () => {
		cy.activatePlugin( 'wp-bootstrap-blocks-test-css-grid' );
		cy.visitAdminPage(
			'options-general.php?page=wp-bootstrap-blocks_settings'
		);

		cy.get( '#wp-bootstrap-blocks_bootstrap_version' ).should(
			'be.disabled'
		);
		cy.get(
			'#wp-bootstrap-blocks_bootstrap_version option:selected'
		).should( 'have.value', '5' );

		cy.get( '#wp-bootstrap-blocks_enable_css_grid' )
			.should( 'be.checked' )
			.and( 'be.disabled' );

		cy.deactivatePlugin( 'wp-bootstrap-blocks-test-css-grid' );
	} );
} );
