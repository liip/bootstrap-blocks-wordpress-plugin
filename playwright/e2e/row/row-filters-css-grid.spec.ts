const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

test.describe( 'Row Block Filters - CSS Grid', () => {
	test.beforeAll( async ( { requestUtils } ) => {
		await requestUtils.activatePlugin(
			'wp-bootstrap-blocks-test-css-grid'
		);
		await requestUtils.activatePlugin(
			'wp-bootstrap-blocks-test-row-filters'
		);
	} );

	test.afterAll( async ( { requestUtils } ) => {
		await requestUtils.deactivatePlugin(
			'wp-bootstrap-blocks-test-css-grid'
		);
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

	test( 'wpBootstrapBlocks.row.cssGridGuttersOptions adds gutters option', async ( {
		page,
		editor,
	} ) => {
		// Disable No Gutters option to make Gutter options visible
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'No Gutters' )
			.click();

		// Custom gutters option should be applied
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'Gutters', { exact: true } )
			.selectOption( '10rem' );

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'wpBootstrapBlocks.row.cssGridGuttersOptions-adds-gutters-option.txt'
		);
	} );

	test( 'wp_bootstrap_blocks_row_default_attributes override default attributes with CSS grid', async ( {
		page,
		editor,
	} ) => {
		// Disable No Gutters option to make Gutter options visible
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'No Gutters' )
			.click();

		await expect(
			await page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Gutters', { exact: true } )
				.inputValue()
		).toBe( '1rem' );

		// Check if attributes are set correctly
		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'wp_bootstrap_blocks_row_default_attributes-override-default-attributes-with-CSS-grid.txt'
		);
	} );
} );
