/**
 * WordPress dependencies
 */
import {
	activatePlugin,
	deactivatePlugin,
	createNewPost,
	getEditedPostContent,
} from '@wordpress/e2e-test-utils';
import {
	insertRowBlock,
	selectRowBlock,
} from './row-helper';

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

	it( 'Should have additional defined templates', async () => {
		await insertRowBlock();
		await selectRowBlock();

		// Additional template should be available
		expect( await page.$$( '.wp-bootstrap-blocks-template-selector-button' ) ).toHaveLength( 5 ); // 4 default templates + 1 additional template (custom template disabled)
		expect( await page.$( '.wp-bootstrap-blocks-template-selector-button > button[aria-label="1 Column (2/3 width)"]' ) ).not.toBeNull();
		expect( await page.$( '.wp-bootstrap-blocks-template-selector-button > button[aria-label="1 Column (2/3 width)"] > svg.dashicons-yes' ) ).not.toBeNull();

		// Template should be applied
		await page.click( '.wp-bootstrap-blocks-template-selector-button > button[aria-label="1 Column (2/3 width)"]' );

		expect( await getEditedPostContent() ).toMatchSnapshot();

		expect( console ).toHaveWarned();
	} );

	it( 'Should not have custom template', async () => {
		await insertRowBlock();
		await selectRowBlock();

		// Custom template shouldn't be available
		expect( await page.$$( '.wp-bootstrap-blocks-template-selector-button' ) ).toHaveLength( 5 ); // 4 default templates + 1 additional template (custom template disabled)
		expect( await page.$( '.wp-bootstrap-blocks-template-selector-button > button[aria-label="Custom"]' ) ).toBeNull();

		expect( console ).toHaveWarned();
	} );
} );
