const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

test.describe( 'Row Block', () => {
	test.beforeEach( async ( { admin, editor, page } ) => {
		await admin.createNewPost();
		await editor.insertBlock( {
			name: 'wp-bootstrap-blocks/row',
		} );
		await editor.openDocumentSettingsSidebar();
	} );

	test( 'Row block is inserted', async ( { editor, page } ) => {
		// Check if row block was inserted
		await expect(
			await page.$$( '[data-type="wp-bootstrap-blocks/row"]' )
		).toHaveLength( 1 );

		await expect(
			await page.$$( '[data-type="wp-bootstrap-blocks/column"]' )
		).toHaveLength( 2 );

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'row-block-is-inserted.txt'
		);
	} );

	test( 'Change alignment', async ( { editor, page } ) => {
		// Change horizontal alignment
		await editor.clickBlockToolbarButton(
			'Change horizontal alignment of columns'
		);
		await page.locator( 'button:text("Align columns right")' ).click();

		await expect(
			await page.locator(
				'[data-type="wp-bootstrap-blocks/row"][data-alignment="right"]'
			)
		).toBeVisible();

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'change-alignment-1.txt'
		);

		await editor.clickBlockToolbarButton(
			'Change vertical alignment of columns'
		);
		await page.locator( 'button:text("Align columns bottom")' ).click();

		await expect(
			await page.locator(
				'[data-type="wp-bootstrap-blocks/row"][data-vertical-alignment="bottom"]'
			)
		).toBeVisible();

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'change-alignment-2.txt'
		);
	} );

	test( 'Change layout', async ( { editor, page } ) => {
		await editor.openDocumentSettingsSidebar();

		// Layout options should be visible
		expect(
			await page.$$( '.wp-bootstrap-blocks-template-selector-button' )
		).toHaveLength( 5 );

		await expect(
			await page.locator(
				'.wp-bootstrap-blocks-template-selector-button > button[aria-label="2 Columns (1:1)"].is-active'
			)
		).toBeVisible();

		expect(
			await page.$$(
				'[data-type="wp-bootstrap-blocks/column"][data-size-md="6"]'
			)
		).toHaveLength( 2 );

		// Template should be applied
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByRole( 'button', { name: '3 Columns (1:1:1)' } )
			.click();

		expect(
			await page.$$(
				'[data-type="wp-bootstrap-blocks/column"][data-size-md="4"]'
			)
		).toHaveLength( 3 );

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'change-layout-1.txt'
		);

		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByRole( 'button', { name: '2 Columns (2:1)' } )
			.click();

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'change-layout-2.txt'
		);
	} );

	test( 'Select custom layout', async ( { editor, page } ) => {
		await editor.openDocumentSettingsSidebar();

		// Custom template should add block list appender (shouldn't change current layout)
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByRole( 'button', { name: 'Custom' } )
			.click();

		await expect(
			await page.locator(
				'.wp-block-wp-bootstrap-blocks-row > .block-editor-inner-blocks > .block-editor-block-list__layout > .block-list-appender'
			)
		).toBeVisible();

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'select-custom-layout.txt'
		);
	} );

	test( 'Add column in custom layout', async ( { editor, page } ) => {
		await editor.openDocumentSettingsSidebar();

		// Select custom template
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByRole( 'button', { name: 'Custom' } )
			.click();

		// Add column block by clicking the block list appender
		await page
			.locator(
				'.wp-block-wp-bootstrap-blocks-row > .block-editor-inner-blocks > .block-editor-block-list__layout > .block-list-appender > button'
			)
			.click();

		expect(
			await page.$$( '[data-type="wp-bootstrap-blocks/column"]' )
		).toHaveLength( 3 );
	} );

	test( 'Apply row options', async ( { editor, page } ) => {
		await editor.openDocumentSettingsSidebar();

		// Enable no gutters option
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'No Gutters' )
			.click();

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'apply-row-options.txt'
		);
	} );

	test( 'Enable column layout in editor', async ( { editor, page } ) => {
		await editor.openDocumentSettingsSidebar();

		// Enable no gutters option
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'Editor: Display columns stacked' )
			.click();

		await expect(
			await page.locator(
				'[data-type="wp-bootstrap-blocks/row"][data-editor-stack-columns="true"]'
			)
		).toBeVisible();

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'enable-column-layout-in-editor.txt'
		);
	} );

	// Bootstrap 5 specific options
	test( 'Bootstrap v5 options are displayed', async ( { editor, page } ) => {
		await editor.openDocumentSettingsSidebar();

		// Horizontal Gutters options should exist
		await expect(
			await page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Horizontal Gutters' )
		).toBeVisible();

		// Vertical Gutters options should exist
		await expect(
			await page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Vertical Gutters' )
		).toBeVisible();
	} );

	test( 'Change gutter sizes', async ( { editor, page } ) => {
		await editor.openDocumentSettingsSidebar();

		// Change horizontal gutter
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'Horizontal Gutters' )
			.selectOption( 'gx-5' );

		// Vertical Gutters options should exist
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'Vertical Gutters' )
			.selectOption( 'gy-3' );

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'change-gutter-sizes.txt'
		);
	} );

	test( 'Gutter options are hidden when no gutters is checked', async ( {
		editor,
		page,
	} ) => {
		await editor.openDocumentSettingsSidebar();

		// Enable no gutters option
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'No Gutters' )
			.click();

		// Horizontal Gutters options should be hidden
		await expect(
			await page.locator( 'label:text("Horizontal Gutters")' )
		).not.toBeVisible();

		// Vertical Gutters options should be hidden
		await expect(
			await page.locator( 'label:text("Vertical Gutters")' )
		).not.toBeVisible();
	} );
} );
