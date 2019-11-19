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
	selectColumnBlock,
} from '../column/column-helper';
import {
	getCheckboxValueByLabel,
	getDataValuesOfElement,
	getInputValueByLabel, getSelectedValueBySelectLabel,
	openSidebarPanelWithTitle,
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

		// Align full should be selected
		expect( await toolbarOptionIsActive( 'Change alignment', 'Full Width' ) ).toBe( true );

		expect( console ).toHaveWarned();
	} );

	it( 'v1.0.0 column block content should be compatible', async () => {
		await setPostContent( rowContent100 );

		// Select 1. Column of 1. Row
		await selectColumnBlock( 0, 1 );

		// Check if default values are set in inspector controls
		await openSidebarPanelWithTitle( 'Column size' );
		expect( await getInputValueByLabel( 'Xs Column count' ) ).toMatch( '5' );
		expect( await getInputValueByLabel( 'Sm Column count' ) ).toMatch( '6' );
		expect( await getInputValueByLabel( 'Md Column count' ) ).toMatch( '7' );
		expect( await getInputValueByLabel( 'Lg Column count' ) ).toMatch( '8' );
		expect( await getInputValueByLabel( 'Xl Column count' ) ).toMatch( '9' );

		expect( console ).toHaveWarned();
	} );

	it( 'v1.1.0 row block content should be compatible', async () => {
		await setPostContent( rowContent110 );

		// Row blocks should be successfully inserted
		expect( await page.$$( '[data-type="wp-bootstrap-blocks/row"]' ) ).toHaveLength( 3 );
		expect( await page.$$( '[data-type="wp-bootstrap-blocks/column"]' ) ).toHaveLength( 6 );

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

		// Align full should be selected
		expect( await toolbarOptionIsActive( 'Change alignment', 'Full Width' ) ).toBe( true );

		// Select 3. Row
		await selectRowBlock( 2 );

		// Custom template should be selected
		expect( await rowTemplateIsSelected( 'Custom' ) ).toBe( true );
		// Column block appender should be visible
		expect( await page.$( '.wp-block-wp-bootstrap-blocks-row > .block-editor-inner-blocks > .block-editor-block-list__layout > .block-list-appender' ) ).not.toBeNull();

		expect( console ).toHaveWarned();
	} );

	it( 'v1.1.0 column block content should be compatible', async () => {
		await setPostContent( rowContent110 );

		// Select 1. Column of 1. Row
		await selectColumnBlock( 0, 1 );

		// Check if default values are set in inspector controls
		await openSidebarPanelWithTitle( 'Column size' );
		expect( await getInputValueByLabel( 'Xs Column count' ) ).toMatch( '5' );
		expect( await getInputValueByLabel( 'Sm Column count' ) ).toMatch( '6' );
		expect( await getInputValueByLabel( 'Md Column count' ) ).toMatch( '7' );
		expect( await getInputValueByLabel( 'Lg Column count' ) ).toMatch( '8' );
		expect( await getInputValueByLabel( 'Xl Column count' ) ).toMatch( '9' );

		// Background color should be selected
		await openSidebarPanelWithTitle( 'Background color' );
		// There is no way to see which color of a color palette is selected. That's why we check the data attribute value of the second column block.
		const columnData = await getDataValuesOfElement( '[data-type="wp-bootstrap-blocks/column"]', 1 );
		expect( columnData.bgColor ).toMatch( 'primary' );
		expect( await getCheckboxValueByLabel( 'Center content vertically in row' ) ).toBe( true );

		// Padding should be selected
		await openSidebarPanelWithTitle( 'Padding (inside column)' );
		expect( await getSelectedValueBySelectLabel( 'Size' ) ).toMatch( 'p-5' );

		expect( console ).toHaveWarned();
	} );

} );
