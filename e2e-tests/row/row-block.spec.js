/**
 * WordPress dependencies
 */
import {
	createNewPost,
	getEditedPostContent,
	clickBlockToolbarButton,
	clickButton,
} from '@wordpress/e2e-test-utils';
import { insertRowBlock, selectRowBlock } from './row-helper';
import { clickElementByText, ensureSidebarOpened } from '../helper';

describe( 'row block', () => {
	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'Row block should be available', async () => {
		await insertRowBlock();

		// Check if row block was inserted
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

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	// TODO fix broken test
	it.skip( 'Should be possible to change alignment', async () => {
		await insertRowBlock();
		await selectRowBlock();

		// Change horizontal alignment
		await clickBlockToolbarButton(
			'Change horizontal alignment of columns'
		);
		await clickButton( 'Align columns right' );
		expect(
			await page.$(
				'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/row"][data-alignment="right"]'
			)
		).not.toBeNull();
		expect( await getEditedPostContent() ).toMatchSnapshot();

		// Change vertical alignment
		await clickBlockToolbarButton( 'Change vertical alignment of columns' );
		await clickButton( 'Align columns bottom' );
		expect(
			await page.$(
				'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/row"][data-vertical-alignment="bottom"]'
			)
		).not.toBeNull();
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'Should be possible to change column layout', async () => {
		await insertRowBlock();
		await selectRowBlock();
		await ensureSidebarOpened();

		// Layout options should be visible
		expect(
			await page.$$( '.wp-bootstrap-blocks-template-selector-button' )
		).toHaveLength( 5 );
		expect(
			await page.$(
				'.wp-bootstrap-blocks-template-selector-button > button[aria-label="2 Columns (1:1)"].is-active'
			)
		).not.toBeNull();
		expect(
			await page.$$(
				'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/column"][data-size-md="6"]'
			)
		).toHaveLength( 2 );

		// Template should be applied
		await page.click(
			'.wp-bootstrap-blocks-template-selector-button > button[aria-label="3 Columns (1:1:1)"]'
		);
		await page.waitFor( 1000 );
		expect(
			await page.$$(
				'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/column"][data-size-md="4"]'
			)
		).toHaveLength( 3 );
		expect( await getEditedPostContent() ).toMatchSnapshot();
		await page.click(
			'.wp-bootstrap-blocks-template-selector-button > button[aria-label="2 Columns (2:1)"]'
		);
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'Should be possible to select custom template', async () => {
		await insertRowBlock();
		await selectRowBlock();
		await ensureSidebarOpened();

		// Custom template should add block list appender (shouldn't change current layout)
		await page.click(
			'.wp-bootstrap-blocks-template-selector-button > button[aria-label="Custom"]'
		);
		expect(
			await page.$(
				'.wp-block-wp-bootstrap-blocks-row > .block-editor-inner-blocks > .block-editor-block-list__layout > .block-list-appender'
			)
		).not.toBeNull();
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'Should only be possible to add column in custom layout', async () => {
		await insertRowBlock();
		await selectRowBlock();
		await ensureSidebarOpened();

		// Select custom template
		await page.click(
			'.wp-bootstrap-blocks-template-selector-button > button[aria-label="Custom"]'
		);
		expect(
			await page.$(
				'.wp-block-wp-bootstrap-blocks-row > .block-editor-inner-blocks > .block-editor-block-list__layout > .block-list-appender'
			)
		).not.toBeNull();

		// Add column block by clicking the block list appender
		await page.click(
			'.wp-block-wp-bootstrap-blocks-row > .block-editor-inner-blocks > .block-editor-block-list__layout > .block-list-appender'
		);
		const numberOfColumnBlocks = (
			await page.$$(
				'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/column"]'
			)
		 ).length;
		expect( numberOfColumnBlocks ).toEqual( 3 );
	} );

	it( 'Should be possible to apply row options', async () => {
		await insertRowBlock();
		await selectRowBlock();
		await ensureSidebarOpened();

		// Enable no gutters option
		await clickElementByText( 'label', 'No Gutters' );
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'Should be possible to enable column layout in editor', async () => {
		await insertRowBlock();
		await selectRowBlock();
		await ensureSidebarOpened();

		// Enable editor stack columns
		await clickElementByText( 'label', 'Editor: Display columns stacked' );
		expect(
			await page.$$(
				'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/row"][data-editor-stack-columns="true"]'
			)
		).toHaveLength( 1 );
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'Should not display Bootstrap v5 options', async () => {
		await insertRowBlock();
		await selectRowBlock();
		await ensureSidebarOpened();

		// Horizontal Gutters options should not exist
		expect(
			await page.$x(
				'//label[@class="components-base-control__label"][contains(text(),"Horizontal Gutters")]'
			)
		).toHaveLength( 0 );

		// Vertical Gutters options should not exist
		expect(
			await page.$x(
				'//label[@class="components-base-control__label"][contains(text(),"Vertical Gutters")]'
			)
		).toHaveLength( 0 );
	} );
} );
