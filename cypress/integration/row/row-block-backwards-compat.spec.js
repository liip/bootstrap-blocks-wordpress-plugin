/// <reference types="Cypress" />

import rowContent100 from './row-block-content/row-1.0.0';
import rowContent110 from './row-block-content/row-1.1.0';
import rowContent140 from './row-block-content/row-1.4.0';
import rowContentBootstrap5 from './row-block-content/row-bootstrap5';
import {
	testVersion100RowFeatures,
	testVersion100ColumnFeatures,
	testVersion110RowFeatures,
	testVersion110ColumnFeatures,
	testVersion140ColumnFeatures,
} from './feature-tests';

context('Row Block Backwards Compatibility', () => {
	beforeEach(() => {
		cy.loginUser()
		cy.createNewPost()
	})

	it('v1.0.0 row block content should be compatible', () => {
		cy.setPostContent( rowContent100 );

		cy.ensureSidebarOpened();

		// Row blocks should be successfully inserted
		cy.get('.block-editor-block-list__block[data-type="wp-bootstrap-blocks/row"]').should('have.length', 2 );
		cy.get('.block-editor-block-list__block[data-type="wp-bootstrap-blocks/column"]').should('have.length', 4 );

		cy.postContentMatchesSnapshot()

		testVersion100RowFeatures()
	})

	it( 'v1.0.0 column block content should be compatible', () => {
		cy.setPostContent( rowContent100 );
		cy.ensureSidebarOpened();

		testVersion100ColumnFeatures();
	} );

	it( 'v1.1.0 row block content should be compatible', () => {
		cy.setPostContent( rowContent110 );
		cy.ensureSidebarOpened();

		// Row blocks should be successfully inserted
		cy.get('.block-editor-block-list__block[data-type="wp-bootstrap-blocks/row"]').should('have.length', 3 );
		cy.get('.block-editor-block-list__block[data-type="wp-bootstrap-blocks/column"]').should('have.length', 6 );

		cy.postContentMatchesSnapshot()

		testVersion100RowFeatures();

		testVersion110RowFeatures();
	} );

	it( 'v1.1.0 column block content should be compatible', () => {
		cy.setPostContent( rowContent110 );
		cy.ensureSidebarOpened();

		testVersion100ColumnFeatures();

		testVersion110ColumnFeatures();
	} );

	it( 'v1.4.0 column block content should be compatible', () => {
		cy.setPostContent( rowContent140 );
		cy.ensureSidebarOpened();

		testVersion100ColumnFeatures();

		testVersion110ColumnFeatures();

		testVersion140ColumnFeatures();
	} );

	it( 'Bootstrap 4 works with Bootstrap 5 settings', () => {
		cy.setPostContent( rowContentBootstrap5 );
		cy.ensureSidebarOpened();

		// Select 1. Column of 1. Row
		cy.selectColumnBlock( 0, 0 );

		// Check if row block could be inserted without error
		cy.get('.block-editor-block-list__block[data-type="wp-bootstrap-blocks/row"]').should('exist')
		cy.get('.block-editor-block-list__block[data-type="wp-bootstrap-blocks/column"]').should('have.length', 2)

		// Check if Bootstrap 4 values are set in inspector controls
		cy.openSidebarPanelWithTitle( 'Column size' );
		cy.getInputByLabel( 'Md Column count' ).should('have.value', '8')
	} );
})