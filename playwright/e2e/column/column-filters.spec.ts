import { openSidebarPanelWithTitle } from '../../commands/open-sidebar-panel-with-title';

const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

test.describe( 'Column Block - Filters', () => {
	test.beforeAll( async ( { requestUtils } ) => {
		await requestUtils.activatePlugin(
			'wp-bootstrap-blocks-test-column-filters'
		);
	} );

	test.afterAll( async ( { requestUtils } ) => {
		await requestUtils.deactivatePlugin(
			'wp-bootstrap-blocks-test-column-filters'
		);
	} );

	test.beforeEach( async ( { admin, editor, page } ) => {
		await admin.createNewPost();
		await editor.insertBlock( {
			name: 'wp-bootstrap-blocks/row',
		} );
		await editor.openDocumentSettingsSidebar();

		// Select column block
		await editor.selectBlocks(
			page
				.locator( 'role=document[name="Block: Column (Bootstrap)"i]' )
				.first()
		);
	} );

	test( 'wpBootstrapBlocks.column.bgColorOptions adds background color', async ( {
		editor,
		page,
	} ) => {
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByRole( 'button', { name: 'Background color' } )
			.click();

		// Additional background color should be available
		await expect(
			page.locator(
				'.components-circular-option-picker__option[aria-label="Color: brand"]'
			)
		).toBeVisible();

		// Background color should be applied
		await page
			.locator(
				'.components-circular-option-picker__option[aria-label="Color: brand"]'
			)
			.click();

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'wpBootstrapBlocks.column.bgColorOptions-adds-background-color.txt'
		);
	} );

	test( 'wpBootstrapBlocks.column.paddingOptions adds padding option', async ( {
		editor,
		page,
	} ) => {
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByRole( 'button', { name: 'Padding (inside column)' } )
			.click();

		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'Size' )
			.selectOption( 'p-8' );

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'wpBootstrapBlocks.column.paddingOptions-adds-padding-option.txt'
		);
	} );

	test( 'wp_bootstrap_blocks_column_default_attributes override default attributes', async ( {
		editor,
		page,
	} ) => {
		await openSidebarPanelWithTitle( editor, page, 'Column size' );

		// Columm size values should be set
		expect(
			await page
				.getByRole( 'spinbutton', { name: 'Xs Column count' } )
				.inputValue()
		).toBe( '4' );
		expect(
			await page
				.getByRole( 'spinbutton', { name: 'Sm Column count' } )
				.inputValue()
		).toBe( '6' );
		// For the md column count we would expect a value of 8, but it gets overwritten by the default layout which has a value of 6.
		expect(
			await page
				.getByRole( 'spinbutton', { name: 'Md Column count' } )
				.inputValue()
		).toBe( '6' );
		expect(
			await page
				.getByRole( 'spinbutton', { name: 'Lg Column count' } )
				.inputValue()
		).toBe( '10' );
		expect(
			await page
				.getByRole( 'spinbutton', {
					name: 'Xl Column count',
					exact: true,
				} )
				.inputValue()
		).toBe( '0' );
		expect(
			await page
				.getByRole( 'spinbutton', {
					name: 'Xxl Column count',
					exact: true,
				} )
				.inputValue()
		).toBe( '5' );

		// Columm equal-width checkboxes should be checked
		expect(
			await page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Xl equal-width', { exact: true } )
				.isChecked()
		).toBeTruthy();

		// Background color should be selected
		await openSidebarPanelWithTitle( editor, page, 'Background color' );
		// There is no way to see which color of a color palette is selected. That's why we check the data attribute value.
		const firstColumnBlock = await page
			.locator( '[data-type="wp-bootstrap-blocks/column"]' )
			.first();

		expect( await firstColumnBlock.getAttribute( 'data-bg-color' ) ).toBe(
			'primary'
		);

		// Padding should be selected
		await openSidebarPanelWithTitle(
			editor,
			page,
			'Padding (inside column)'
		);
		expect(
			await page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Size' )
				.inputValue()
		).toBe( 'p-3' );

		// Content vertical alignment bottom should be selected
		await editor.clickBlockToolbarButton(
			'Change vertical alignment of content'
		);
		await expect(
			await page.locator(
				'button.is-active:text("Align content bottom")'
			)
		).toBeVisible();

		// Check if attributes are set correctly
		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'wp_bootstrap_blocks_column_default_attributes-override-default-attributes.txt'
		);
	} );
} );
