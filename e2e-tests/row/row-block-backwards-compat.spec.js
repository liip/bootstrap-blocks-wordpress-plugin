/**
 * WordPress dependencies
 */
import {
	createNewPost,
	setPostContent,
	getEditedPostContent,
} from '@wordpress/e2e-test-utils';

import {
	rowTemplateIsSelected,
	selectRowBlock,
} from './row-helper';
import {
	getCheckboxValueByLabel,
	toolbarOptionIsActive,
} from '../helper';

import rowContent100 from './row-block-content/row-1.0.0';
import rowContent110 from './row-block-content/row-1.1.0';

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

		// Select 1. Row
		await selectRowBlock( 0 );

		// 2:1 template should be selected
		expect( await rowTemplateIsSelected( '2 Columns (2:1)' ) ).toBe( true );

		// No Gutters option should be checked
		expect( await getCheckboxValueByLabel( 'No Gutters' ) ).toBe( true );

		// Select 2. Row
		await selectRowBlock( 1 );

		// Align columns right should be selected
		expect( await toolbarOptionIsActive( 'Change horizontal alignment of columns', 'Align columns right' ) ).toBe( true );

		// Align columns bottom should be selected
		expect( await toolbarOptionIsActive( 'Change vertical alignment of columns', 'Align columns bottom' ) ).toBe( true );

		// TODO
		// Align full should be selected
		// expect( await toolbarOptionIsActive( 'Change alignment', 'Full width' ) ).toBe( true );

		expect( console ).toHaveWarned();
	} );

	it( 'v1.1.0 row block content should be compatible', async () => {
		expect( console ).toHaveWarned();

		await setPostContent( rowContent110 );

		// Row blocks should be successfully inserted
		expect( await page.$$( '[data-type="wp-bootstrap-blocks/row"]' ) ).toHaveLength( 3 );
		expect( await page.$$( '[data-type="wp-bootstrap-blocks/column"]' ) ).toHaveLength( 6 );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
