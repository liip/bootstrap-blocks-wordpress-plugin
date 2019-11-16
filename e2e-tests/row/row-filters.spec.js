/**
 * WordPress dependencies
 */
import {
	activatePlugin,
	deactivatePlugin,
	createNewPost,
	searchForBlock,
	getAllBlocks,
	selectBlockByClientId,
	getEditedPostContent,
} from '@wordpress/e2e-test-utils'

describe( 'row block filters', () => {
	beforeAll( async () => {
		await activatePlugin( 'wp-bootstrap-blocks-test-row-filters' );
	} );

	afterAll( async () => {
		await deactivatePlugin( 'wp-bootstrap-blocks-test-row-filters' );
	} );

	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'Should have custom templates', async () => {
		// Insert row block
		await searchForBlock( 'Bootstrap Row' )
		await page.click( 'button.editor-block-list-item-wp-bootstrap-blocks-row' )

		expect( await page.$( '[data-type="wp-bootstrap-blocks/row"]' ) ).not.toBeNull();
		expect( await page.$$( '[data-type="wp-bootstrap-blocks/column"]' ) ).toHaveLength(2);

		expect( await getEditedPostContent() ).toMatchSnapshot();

		// Select row block
		await selectBlockByClientId(
			( await getAllBlocks() )[ 0 ].clientId
		);

		// Custom template should be available
		expect( await page.$$( '.wp-bootstrap-blocks-template-selector-button' ) ).toHaveLength(6);
		expect( await page.$( '.wp-bootstrap-blocks-template-selector-button > button[aria-label="1 Column (1/3 width)"]' ) ).not.toBeNull();

		// Template should be applied
		await page.click( '.wp-bootstrap-blocks-template-selector-button > button[aria-label="1 Column (1/3 width)"]' );

		expect( await getEditedPostContent() ).toMatchSnapshot();

		expect( console ).toHaveWarned();
	} );
} );
