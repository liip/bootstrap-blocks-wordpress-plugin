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
import {
	testVersion100RowFeatures,
	testVersion110RowFeatures,
	testVersion100ColumnFeatures,
	testVersion110ColumnFeatures,
} from './feature-tests';

describe( 'row block backwards compatibility', () => {
	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'v1.0.0 row block content should be compatible', async () => {
		await setPostContent( rowContent100 );

		// Row blocks should be successfully inserted
		expect( await page.$$( '[data-type="wp-bootstrap-blocks/row"]' ) ).toHaveLength( 2 );
		expect( await page.$$( '[data-type="wp-bootstrap-blocks/column"]' ) ).toHaveLength( 4 );

		expect( await getEditedPostContent() ).toMatchSnapshot();

		await testVersion100RowFeatures();

		expect( console ).toHaveWarned();
	} );

	it( 'v1.0.0 column block content should be compatible', async () => {
		await setPostContent( rowContent100 );

		await testVersion100ColumnFeatures();

		expect( console ).toHaveWarned();
	} );

	it( 'v1.1.0 row block content should be compatible', async () => {
		await setPostContent( rowContent110 );

		// Row blocks should be successfully inserted
		expect( await page.$$( '[data-type="wp-bootstrap-blocks/row"]' ) ).toHaveLength( 3 );
		expect( await page.$$( '[data-type="wp-bootstrap-blocks/column"]' ) ).toHaveLength( 6 );

		expect( await getEditedPostContent() ).toMatchSnapshot();

		await testVersion100RowFeatures();

		await testVersion110RowFeatures();

		expect( console ).toHaveWarned();
	} );

	it( 'v1.1.0 column block content should be compatible', async () => {
		await setPostContent( rowContent110 );

		await testVersion100ColumnFeatures();

		await testVersion110ColumnFeatures();

		expect( console ).toHaveWarned();
	} );
} );
