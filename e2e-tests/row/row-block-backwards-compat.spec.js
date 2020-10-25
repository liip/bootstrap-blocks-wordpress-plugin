/**
 * WordPress dependencies
 */
import {
	createNewPost,
	setPostContent,
	getEditedPostContent,
} from '@wordpress/e2e-test-utils';

import rowContent100 from './row-block-content/row-1.0.0';
import rowContent110 from './row-block-content/row-1.1.0';
import rowContent140 from './row-block-content/row-1.4.0';
import rowContentBootstrap5 from './row-block-content/row-bootstrap5';
import {
	testVersion100RowFeatures,
	testVersion110RowFeatures,
	testVersion100ColumnFeatures,
	testVersion110ColumnFeatures,
	testVersion140ColumnFeatures,
} from './feature-tests';
import {
	ensureSidebarOpened,
	getInputValueByLabel,
	openSidebarPanelWithTitle,
} from '../helper';
import { selectColumnBlock } from '../column/column-helper';

describe( 'row block backwards compatibility', () => {
	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'v1.0.0 row block content should be compatible', async () => {
		await setPostContent( rowContent100 );
		await ensureSidebarOpened();

		// Row blocks should be successfully inserted
		expect(
			await page.$$(
				'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/row"]'
			)
		).toHaveLength( 2 );
		expect(
			await page.$$(
				'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/column"]'
			)
		).toHaveLength( 4 );

		expect( await getEditedPostContent() ).toMatchSnapshot();

		await testVersion100RowFeatures();
	} );

	/* eslint-disable jest/expect-expect */
	it( 'v1.0.0 column block content should be compatible', async () => {
		await setPostContent( rowContent100 );
		await ensureSidebarOpened();

		await testVersion100ColumnFeatures();
	} );
	/* eslint-enable jest/expect-expect */

	it( 'v1.1.0 row block content should be compatible', async () => {
		await setPostContent( rowContent110 );
		await ensureSidebarOpened();

		// Row blocks should be successfully inserted
		expect(
			await page.$$(
				'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/row"]'
			)
		).toHaveLength( 3 );
		expect(
			await page.$$(
				'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/column"]'
			)
		).toHaveLength( 6 );

		expect( await getEditedPostContent() ).toMatchSnapshot();

		await testVersion100RowFeatures();

		await testVersion110RowFeatures();
	} );

	/* eslint-disable jest/expect-expect */
	it( 'v1.1.0 column block content should be compatible', async () => {
		await setPostContent( rowContent110 );
		await ensureSidebarOpened();

		await testVersion100ColumnFeatures();

		await testVersion110ColumnFeatures();
	} );
	/* eslint-enable jest/expect-expect */

	/* eslint-disable jest/expect-expect */
	it( 'v1.4.0 column block content should be compatible', async () => {
		await setPostContent( rowContent140 );
		await ensureSidebarOpened();

		await testVersion100ColumnFeatures();

		await testVersion110ColumnFeatures();

		await testVersion140ColumnFeatures();
	} );
	/* eslint-enable jest/expect-expect */

	it( 'Bootstrap 4 works with Bootstrap 5 settings', async () => {
		await setPostContent( rowContentBootstrap5 );
		await ensureSidebarOpened();

		// Select 1. Column of 1. Row
		await selectColumnBlock( 0, 0 );

		// Check if row block could be inserted without error
		expect(
			await page.$(
				'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/row"]'
			)
		).not.toBeNull();
		expect(
			await page.$$(
				'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/column"]'
			)
		).toHaveLength( 2 );

		// Check if Bootstrap 4 values are set in inspector controls
		await openSidebarPanelWithTitle( 'Column size' );
		expect( await getInputValueByLabel( 'Md Column count' ) ).toMatch(
			'8'
		);
	} );
} );
