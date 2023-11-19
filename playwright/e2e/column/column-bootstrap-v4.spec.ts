const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

test.describe( 'Column Block - Bootstrap 4', () => {
	test.beforeAll( async ( { requestUtils } ) => {
		await requestUtils.activatePlugin(
			'wp-bootstrap-blocks-test-bootstrap-v4'
		);
	} );

	test.afterAll( async ( { requestUtils } ) => {
		await requestUtils.deactivatePlugin(
			'wp-bootstrap-blocks-test-bootstrap-v4'
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

	test( 'Xxl breakpoint options are not displayed if run with Bootstrap 4', async ( {
		editor,
		page,
	} ) => {
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByRole( 'button', { name: 'Column size' } )
			.click();

		// Xl column count option should exist
		await expect(
			page.getByRole( 'spinbutton', {
				name: 'Xl Column count',
				exact: true,
			} )
		).toBeVisible();

		// Xxl column count option should not exist
		await expect(
			page.getByRole( 'spinbutton', {
				name: 'Xxl Column count',
				exact: true,
			} )
		).not.toBeVisible();

		// Xl equal-width option should exist
		await expect( page.getByLabel( 'Xl equal-width' ) ).toBeVisible();

		// Xxl equal-width option should not exist
		await expect( page.getByLabel( 'Xxl equal-width' ) ).not.toBeVisible();
	} );
} );
