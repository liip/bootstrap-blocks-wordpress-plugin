const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

test.describe( 'Row Block - Bootstrap 4', () => {
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
	} );

	test( 'Bootstrap 5 options are not displayed if run with Bootstrap 4', async ( {
		page,
	} ) => {
		// Horizontal Gutters options should not exist
		await expect(
			page.getByLabel( 'Horizontal Gutters' )
		).not.toBeVisible();

		// Vertical Gutters options should not exist
		await expect( page.getByLabel( 'Vertical Gutters' ) ).not.toBeVisible();
	} );
} );
