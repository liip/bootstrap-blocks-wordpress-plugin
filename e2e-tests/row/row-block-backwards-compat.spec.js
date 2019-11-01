/**
 * WordPress dependencies
 */
import {
	createNewPost,
	setPostContent,
	getEditedPostContent,
} from '@wordpress/e2e-test-utils';

import rowContent100 from './row-block-content/row-1.0.0'

describe( 'row block backwards compatibility', () => {
	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'Test v1.0.0 row block content', async () => {
		await setPostContent( rowContent100 )

		expect( await page.$( '[data-type="wp-bootstrap-blocks/row"]' ) ).not.toBeNull();
		expect( await page.$$( '[data-type="wp-bootstrap-blocks/column"]' ) ).toHaveLength(2);

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
