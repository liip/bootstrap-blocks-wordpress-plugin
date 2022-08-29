/// <reference types="Cypress" />
import { testBlockTransform } from '../../support/row/transform-tests';
import { getAllBlocks } from 'cypress-wp-test-utils';

context( 'Row Block Transforms', () => {
	describe( 'Custom template enabled', () => {
		beforeEach( () => {
			cy.loginUser();
			cy.createNewPost();
		} );

		it( 'Should be possible to transform 2 blocks to row block', () => {
			cy.insertBlock( 'Heading' );
			cy.insertBlock( 'Heading' );

			testBlockTransform();
			cy.postContentMatchesSnapshot();
		} );

		it( 'Should be possible to transform 3 blocks to row block', () => {
			cy.insertBlock( 'Heading' );
			cy.insertBlock( 'Heading' );
			cy.insertBlock( 'Heading' );

			testBlockTransform();
			cy.postContentMatchesSnapshot();
		} );

		it( 'Should be possible to transform 4 blocks to row block', () => {
			cy.insertBlock( 'Heading' );
			cy.insertBlock( 'Heading' );
			cy.insertBlock( 'Heading' );
			cy.insertBlock( 'Heading' );

			testBlockTransform();
			cy.postContentMatchesSnapshot();
		} );

		it( 'Columns should not be smaller than 3', () => {
			cy.insertBlock( 'Heading' );
			cy.insertBlock( 'Heading' );
			cy.insertBlock( 'Heading' );
			cy.insertBlock( 'Heading' );
			cy.insertBlock( 'Heading' );

			testBlockTransform();
			cy.postContentMatchesSnapshot();
		} );
	} );

	describe( 'Custom template disabled', () => {
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

		it( 'Should not be possible to transform blocks if custom template is disabled', () => {
			cy.insertBlock( 'Heading' );
			cy.insertBlock( 'Heading' );

			return getAllBlocks().then( ( blocks ) => {
				const firstBlockId = blocks[ 0 ].clientId;
				const lastBlockId = blocks[ blocks.length - 1 ].clientId;

				return cy
					.window()
					.then( ( window ) => {
						return window.wp.data
							.dispatch( 'core/block-editor' )
							.multiSelect( firstBlockId, lastBlockId );
					} )
					.then( () => {
						// Transform block
						cy.clickBlockToolbarButton( 'Heading' );
						cy.get(
							'.editor-block-list-item-wp-bootstrap-blocks-row'
						).should( 'not.exist' );
					} );
			} );
		} );
	} );
} );
