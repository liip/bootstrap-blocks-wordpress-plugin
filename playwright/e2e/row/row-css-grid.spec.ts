const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

test.describe( 'Row Block - CSS Grid', () => {
	test.beforeAll( async ( { requestUtils } ) => {
		await requestUtils.activatePlugin(
			'wp-bootstrap-blocks-test-css-grid'
		);
	} );

	test.afterAll( async ( { requestUtils } ) => {
		await requestUtils.deactivatePlugin(
			'wp-bootstrap-blocks-test-css-grid'
		);
	} );

	test.beforeEach( async ( { admin, editor, page } ) => {
		await admin.createNewPost();
		await editor.insertBlock( {
			name: 'wp-bootstrap-blocks/row',
		} );
		await editor.openDocumentSettingsSidebar();
	} );

	test( 'CSS Grid options are shown', async ( { page } ) => {
		// Gutters options should exist
		await expect(
			page.getByLabel( 'Gutters', { exact: true } )
		).toBeVisible();
	} );

	test( 'Change gutter size', async ( { page, editor } ) => {
		// Change gutters
		await page
			.getByLabel( 'Gutters', { exact: true } )
			.selectOption( '2rem' );

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'change-gutter-size.txt'
		);
	} );

	test( 'Hide gutter options when no gutters is checked', async ( {
		page,
		editor,
	} ) => {
		// Enable no gutters option
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'No Gutters' )
			.click();

		// Gutters options should exist
		await expect(
			page.getByLabel( 'Gutters', { exact: true } )
		).not.toBeVisible();
	} );
} );
