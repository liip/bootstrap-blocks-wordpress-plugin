const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

test.describe( 'Row Block Filters', () => {
	test.beforeAll( async ( { requestUtils } ) => {
		await requestUtils.activatePlugin(
			'wp-bootstrap-blocks-test-row-filters'
		);
	} );

	test.afterAll( async ( { requestUtils } ) => {
		await requestUtils.deactivatePlugin(
			'wp-bootstrap-blocks-test-row-filters'
		);
	} );

	test.beforeEach( async ( { admin, editor, page } ) => {
		await admin.createNewPost();
		await editor.insertBlock( {
			name: 'wp-bootstrap-blocks/row',
		} );
		await editor.openDocumentSettingsSidebar();
	} );

	test( 'wpBootstrapBlocks.row.templates adds additional template', async ( {
		page,
		editor,
	} ) => {
		// Additional template should be available
		await expect(
			await page.$$( '.wp-bootstrap-blocks-template-selector-button' )
		).toHaveLength( 5 ); // 4 default templates + 1 additional template (custom template disabled)
		await expect(
			await page.locator(
				'.wp-bootstrap-blocks-template-selector-button > button[aria-label="1 Column (2/3 width)"]'
			)
		).toBeVisible();
		await expect(
			await page.locator(
				'.wp-bootstrap-blocks-template-selector-button > button[aria-label="1 Column (2/3 width)"] > span.dashicons-yes'
			)
		).toBeVisible();

		// Template should be applied
		await page
			.locator(
				'.wp-bootstrap-blocks-template-selector-button > button[aria-label="1 Column (2/3 width)"]'
			)
			.click();

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'wpBootstrapBlocks.row.templates-adds-additional-template.txt'
		);
	} );

	test( 'wpBootstrapBlocks.row.enableCustomTemplate disables custom template', async ( {
		page,
		editor,
	} ) => {
		// Additional template should be available
		await expect(
			await page.$$( '.wp-bootstrap-blocks-template-selector-button' )
		).toHaveLength( 5 ); // 4 default templates + 1 additional template (custom template disabled)
		await expect(
			await page.locator(
				'.wp-bootstrap-blocks-template-selector-button > button[aria-label="Custom"]'
			)
		).not.toBeVisible();
	} );

	test( 'wp_bootstrap_blocks_row_default_attributes override default attributes', async ( {
		page,
		editor,
	} ) => {
		// 1:2 template should be selected
		await expect(
			await page.locator(
				'.wp-bootstrap-blocks-template-selector-button > button[aria-label="2 Columns (1:2)"].is-active'
			)
		).toBeVisible();

		// No Gutters option should be checked
		expect(
			await page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'No Gutters', { exact: true } )
				.isChecked()
		).toBeTruthy();

		// Editor stack columns option should be checked
		expect(
			await page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Editor: Display columns stacked' )
				.isChecked()
		).toBeTruthy();

		// Align columns right should be selected
		await editor.clickBlockToolbarButton(
			'Change horizontal alignment of columns'
		);
		await expect(
			await page.locator( 'button.is-active:text("Align columns right")' )
		).toBeVisible();

		// Align columns bottom should be selected
		await editor.clickBlockToolbarButton(
			'Change vertical alignment of columns'
		);
		await expect(
			await page.locator(
				'button.is-active:text("Align columns bottom")'
			)
		).toBeVisible();

		// Disable No Gutters option to make Gutter options visible
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'No Gutters', { exact: true } )
			.click();

		// Horizontal Gutters should be selected
		await expect(
			await page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Horizontal Gutters' )
				.inputValue()
		).toBe( 'gx-5' );

		// Vertical Gutters should be selected
		await expect(
			await page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Vertical Gutters' )
				.inputValue()
		).toBe( 'gy-3' );

		// Check if attributes are set correctly
		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'wp_bootstrap_blocks_row_default_attributes-override-default-attributes.txt'
		);
	} );

	// Bootstrap 5 specific filters
	test( 'wpBootstrapBlocks.row.horizontalGuttersOptions adds horizontal gutters option', async ( {
		page,
		editor,
	} ) => {
		// Disable No Gutters option to make Gutter options visible
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'No Gutters', { exact: true } )
			.click();

		// Custom horizontal gutters option should be applied
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'Horizontal Gutters' )
			.selectOption( 'gx-10' );

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'wpBootstrapBlocks.row.horizontalGuttersOptions-adds-horizontal-gutters-option.txt'
		);
	} );

	test( 'wpBootstrapBlocks.row.verticalGuttersOptions should add vertical gutters option', async ( {
		page,
		editor,
	} ) => {
		// Disable No Gutters option to make Gutter options visible
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'No Gutters', { exact: true } )
			.click();

		// Custom vertical gutters option should be applied
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'Vertical Gutters' )
			.selectOption( 'gy-10' );

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'wpBootstrapBlocks.row.verticalGuttersOptions-adds-vertical-gutters-option.txt'
		);
	} );
} );
