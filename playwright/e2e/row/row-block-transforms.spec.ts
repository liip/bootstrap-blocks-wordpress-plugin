const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

test.describe( 'Row Block Transforms - Custom template enabled', () => {
	test.beforeEach( async ( { admin, editor, page } ) => {
		await admin.createNewPost();
		await editor.openDocumentSettingsSidebar();
	} );

	test( 'Transform two blocks to row block', async ( { editor, page } ) => {
		await editor.insertBlock( {
			name: 'core/heading',
		} );
		await editor.insertBlock( {
			name: 'core/heading',
		} );

		await editor.selectBlocks(
			page.getByLabel( 'Block: Heading' ).nth( 0 ),
			page.getByLabel( 'Block: Heading' ).nth( 1 )
		);

		// Transform selected heading blocks to row
		await editor.transformBlockTo( 'wp-bootstrap-blocks/row' );

		// One row block with 2 columns of size 6 should have been created
		expect(
			await page
				.getByLabel( 'Block: Column (Bootstrap)' )
				.nth( 0 )
				.getAttribute( 'data-size-md' )
		).toBe( '6' );
		expect(
			await page
				.getByLabel( 'Block: Column (Bootstrap)' )
				.nth( 1 )
				.getAttribute( 'data-size-md' )
		).toBe( '6' );

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'transform-2-blocks-to-row-block.txt'
		);
	} );

	test( 'Transform 3 blocks to row block', async ( { editor, page } ) => {
		await editor.insertBlock( {
			name: 'core/heading',
		} );
		await editor.insertBlock( {
			name: 'core/heading',
		} );
		await editor.insertBlock( {
			name: 'core/heading',
		} );

		await editor.selectBlocks(
			page.getByLabel( 'Block: Heading' ).nth( 0 ),
			page.getByLabel( 'Block: Heading' ).nth( 2 )
		);

		// Transform selected heading blocks to row
		await editor.transformBlockTo( 'wp-bootstrap-blocks/row' );

		// One row block with 3 columns of size 4 should have been created
		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'transform-3-blocks-to-row-block.txt'
		);
	} );

	test( 'Transform 4 blocks to row block', async ( { editor, page } ) => {
		await editor.insertBlock( {
			name: 'core/heading',
		} );
		await editor.insertBlock( {
			name: 'core/heading',
		} );
		await editor.insertBlock( {
			name: 'core/heading',
		} );
		await editor.insertBlock( {
			name: 'core/heading',
		} );

		await editor.selectBlocks(
			page.getByLabel( 'Block: Heading' ).nth( 0 ),
			page.getByLabel( 'Block: Heading' ).nth( 3 )
		);

		// Transform selected heading blocks to row
		await editor.transformBlockTo( 'wp-bootstrap-blocks/row' );

		// One row block with 4 columns of size 3 should have been created
		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'transform-4-blocks-to-row-block.txt'
		);
	} );

	test( 'Columns should not be smaller than 3', async ( {
		editor,
		page,
	} ) => {
		await editor.insertBlock( {
			name: 'core/heading',
		} );
		await editor.insertBlock( {
			name: 'core/heading',
		} );
		await editor.insertBlock( {
			name: 'core/heading',
		} );
		await editor.insertBlock( {
			name: 'core/heading',
		} );
		await editor.insertBlock( {
			name: 'core/heading',
		} );

		await editor.selectBlocks(
			page.getByLabel( 'Block: Heading' ).nth( 0 ),
			page.getByLabel( 'Block: Heading' ).nth( 4 )
		);

		// Transform selected heading blocks to row
		await editor.transformBlockTo( 'wp-bootstrap-blocks/row' );

		// One row block with 4 columns of size 3 should have been created
		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'columns-should-not-be-smaller-than-3.txt'
		);
	} );
} );

test.describe( 'Row Block Transforms - Custom template disabled', () => {
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
		await editor.openDocumentSettingsSidebar();
	} );

	test( 'Not able to transform blocks if custom template is disabled', async ( {
		editor,
		page,
	} ) => {
		await editor.insertBlock( {
			name: 'core/heading',
		} );
		await editor.insertBlock( {
			name: 'core/heading',
		} );

		await editor.selectBlocks(
			page.getByLabel( 'Block: Heading' ).nth( 0 ),
			page.getByLabel( 'Block: Heading' ).nth( 1 )
		);

		// Transformation to row block should not be available
		await page.locator( '.block-editor-block-switcher__toggle' ).click();
		await expect(
			await page.locator(
				'.editor-block-list-item-wp-bootstrap-blocks-row'
			)
		).not.toBeVisible();
	} );
} );
