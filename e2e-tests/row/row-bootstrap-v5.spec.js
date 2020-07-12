/**
 * WordPress dependencies
 */
import {
	activatePlugin,
	deactivatePlugin,
	createNewPost,
	getEditedPostContent,
} from '@wordpress/e2e-test-utils';
import { insertRowBlock, selectRowBlock } from './row-helper';
import { clickElementByText, selectOption } from '../helper';

describe( 'row block Bootstrap 5', () => {
	beforeAll( async () => {
		await activatePlugin( 'wp-bootstrap-blocks-test-bootstrap-v5' );
	} );

	afterAll( async () => {
		await deactivatePlugin( 'wp-bootstrap-blocks-test-bootstrap-v5' );
	} );

	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'Should display Bootstrap v5 options', async () => {
		await insertRowBlock();
		await selectRowBlock();

		// Horizontal Gutters options should exist
		expect(
			await page.$x(
				'//label[@class="components-base-control__label"][contains(text(),"Horizontal Gutters")]'
			)
		).toHaveLength( 1 );

		// Vertical Gutters options should exist
		expect(
			await page.$x(
				'//label[@class="components-base-control__label"][contains(text(),"Vertical Gutters")]'
			)
		).toHaveLength( 1 );
	} );

	it( 'Should be possible to change gutter sizes', async () => {
		await insertRowBlock();
		await selectRowBlock();

		// Change horizontal gutter
		await selectOption( 'Horizontal Gutters', 'gx-5' );

		// Change vertical gutter
		await selectOption( 'Vertical Gutters', 'gy-3' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'Should hide gutter options when no gutters is checked', async () => {
		await insertRowBlock();
		await selectRowBlock();

		// Enable no gutters option
		await clickElementByText( 'label', 'No Gutters' );

		// Horizontal Gutters options should be hidden
		expect(
			await page.$x(
				'//label[@class="components-base-control__label"][contains(text(),"Horizontal Gutters")]'
			)
		).toHaveLength( 0 );

		// Vertical Gutters options should be hidden
		expect(
			await page.$x(
				'//label[@class="components-base-control__label"][contains(text(),"Vertical Gutters")]'
			)
		).toHaveLength( 0 );
	} );
} );
