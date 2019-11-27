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
	oldObjectStructureDeprecationWarning,
	selectRowBlock,
} from './row-helper';

describe( 'row block old template structure', () => {
	beforeAll( async () => {
		await activatePlugin( 'wp-bootstrap-blocks-test-row-old-template-structure' );
	} );

	afterAll( async () => {
		await deactivatePlugin( 'wp-bootstrap-blocks-test-row-old-template-structure' );
	} );

	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'Should warn if old template structure is used', async () => {
		expect( console ).toHaveWarnedWith( oldObjectStructureDeprecationWarning );
	} );

	it( 'Custom template defined with old object structure should be available', async () => {
		expect( console ).toHaveWarnedWith( oldObjectStructureDeprecationWarning );

		await insertRowBlock();
		expect( await getEditedPostContent() ).toMatchSnapshot();
		await selectRowBlock();

		// Custom template should be available
		expect( await page.$$( '.wp-bootstrap-blocks-template-selector-button' ) ).toHaveLength( 6 );
		expect( await page.$( '.wp-bootstrap-blocks-template-selector-button > button[aria-label="1 Column (2/3 width)"]' ) ).not.toBeNull();

		// Template should be applied
		await page.click( '.wp-bootstrap-blocks-template-selector-button > button[aria-label="1 Column (2/3 width)"]' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
