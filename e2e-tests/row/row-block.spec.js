/**
 * WordPress dependencies
 */
import {
	createNewPost,
	getEditedPostContent,
	clickBlockToolbarButton,
} from '@wordpress/e2e-test-utils';
import {
	insertRowBlock,
	selectRowBlock,
} from './row-helper';

describe( 'row block', () => {
	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'Row block should be available', async () => {
		await insertRowBlock();

		// Check if row block was inserted
		expect( await page.$( '[data-type="wp-bootstrap-blocks/row"]' ) ).not.toBeNull();
		expect( await page.$$( '[data-type="wp-bootstrap-blocks/column"]' ) ).toHaveLength( 2 );

		expect( await getEditedPostContent() ).toMatchSnapshot();

		expect( console ).toHaveWarned();
	} );

	it( 'Should be possible to change alignment', async () => {
		expect( console ).toHaveWarned();

		await insertRowBlock();
		await selectRowBlock();

		// Change horizontal alignment
		await clickBlockToolbarButton( 'Change horizontal alignment of columns' );
		const [ alignmentRightButton ] = await page.$x( "//button[contains(., 'Align columns right')]" );
		await alignmentRightButton.click();
		expect( await page.$( '[data-type="wp-bootstrap-blocks/row"][data-alignment="right"]' ) ).not.toBeNull();
		expect( await getEditedPostContent() ).toMatchSnapshot();

		// Change vertical alignment
		await clickBlockToolbarButton( 'Change vertical alignment of columns' );
		const [ alignmentBottomButton ] = await page.$x( "//button[contains(., 'Align columns bottom')]" );
		await alignmentBottomButton.click();
		expect( await page.$( '[data-type="wp-bootstrap-blocks/row"][data-vertical-alignment="bottom"]' ) ).not.toBeNull();
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'Should be possible to change column layout', async () => {
		expect( console ).toHaveWarned();

		await insertRowBlock();
		await selectRowBlock();

		// Layout options should be visible
		expect( await page.$$( '.wp-bootstrap-blocks-template-selector-button' ) ).toHaveLength( 5 );
		expect( await page.$( '.wp-bootstrap-blocks-template-selector-button > button[aria-label="2 Columns (1:1)"].is-active' ) ).not.toBeNull();
		expect( await page.$$( '[data-type="wp-bootstrap-blocks/column"][data-size-md="6"]' ) ).toHaveLength( 2 );

		// Template should be applied
		await page.click( '.wp-bootstrap-blocks-template-selector-button > button[aria-label="3 Columns (1:1:1)"]' );
		await page.waitFor( 1000 );
		expect( await page.$$( '[data-type="wp-bootstrap-blocks/column"][data-size-md="4"]' ) ).toHaveLength( 3 );
		expect( await getEditedPostContent() ).toMatchSnapshot();
		await page.click( '.wp-bootstrap-blocks-template-selector-button > button[aria-label="2 Columns (2:1)"]' );
		expect( await getEditedPostContent() ).toMatchSnapshot();

		// Custom template should add block list appender (shouldn't change current layout)
		await page.click( '.wp-bootstrap-blocks-template-selector-button > button[aria-label="Custom"]' );
		expect( await page.$( '.wp-block-wp-bootstrap-blocks-row > .block-editor-inner-blocks > .block-editor-block-list__layout > .block-list-appender' ) ).not.toBeNull();
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'Should be possible to apply row options', async () => {
		expect( console ).toHaveWarned();

		await insertRowBlock();
		await selectRowBlock();

		// Enable no gutters option
		const [ noGuttersCheckboxLabel ] = await page.$x( "//label[contains(., 'No Gutters')]" );
		await noGuttersCheckboxLabel.click();
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
