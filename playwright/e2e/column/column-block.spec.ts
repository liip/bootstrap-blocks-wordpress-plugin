const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

test.describe( 'Column Block', () => {
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

	test( 'Column block is initialized with default attributes', async ( {
		editor,
		page,
	} ) => {
		// Check if default values are set in data attributes
		const firstColumnBlock = await page
			.locator( '[data-type="wp-bootstrap-blocks/column"]' )
			.first();

		expect( await firstColumnBlock.getAttribute( 'data-size-xs' ) ).toEqual(
			'12'
		);
		expect( await firstColumnBlock.getAttribute( 'data-size-sm' ) ).toEqual(
			'0'
		);
		expect( await firstColumnBlock.getAttribute( 'data-size-md' ) ).toEqual(
			'6'
		);
		expect( await firstColumnBlock.getAttribute( 'data-size-lg' ) ).toEqual(
			'0'
		);
		expect( await firstColumnBlock.getAttribute( 'data-size-xl' ) ).toEqual(
			'0'
		);

		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByRole( 'button', { name: 'Column size' } )
			.click();

		expect(
			await page
				.getByRole( 'spinbutton', { name: 'Xs Column count' } )
				.inputValue()
		).toBe( '12' );
		expect(
			await page
				.getByRole( 'spinbutton', { name: 'Sm Column count' } )
				.inputValue()
		).toBe( '0' );
		expect(
			await page
				.getByRole( 'spinbutton', { name: 'Md Column count' } )
				.inputValue()
		).toBe( '6' );
		expect(
			await page
				.getByRole( 'spinbutton', { name: 'Lg Column count' } )
				.inputValue()
		).toBe( '0' );
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
		).toBe( '0' );

		expect(
			await page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Xs equal-width' )
				.isChecked()
		).toBeFalsy();
		expect(
			await page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Sm equal-width' )
				.isChecked()
		).toBeFalsy();
		expect(
			await page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Md equal-width' )
				.isChecked()
		).toBeFalsy();
		expect(
			await page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Lg equal-width' )
				.isChecked()
		).toBeFalsy();
		expect(
			await page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Xl equal-width', { exact: true } )
				.isChecked()
		).toBeFalsy();
		expect(
			await page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Xxl equal-width' )
				.isChecked()
		).toBeFalsy();
	} );

	test( 'Change column size', async ( { editor, page } ) => {
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByRole( 'button', { name: 'Column size' } )
			.click();

		await page.getByLabel( 'Lg equal-width' ).click();

		// Check if default values are set in data attributes
		const firstColumnBlock = await page
			.locator( '[data-type="wp-bootstrap-blocks/column"]' )
			.first();

		expect( await firstColumnBlock.getAttribute( 'data-size-xs' ) ).toBe(
			'0'
		);
		expect( await firstColumnBlock.getAttribute( 'data-size-sm' ) ).toBe(
			'0'
		);
		expect( await firstColumnBlock.getAttribute( 'data-size-md' ) ).toBe(
			'0'
		);
		expect( await firstColumnBlock.getAttribute( 'data-size-lg' ) ).toBe(
			'0'
		);
		expect( await firstColumnBlock.getAttribute( 'data-size-xl' ) ).toBe(
			'0'
		);

		expect(
			await page.getByLabel( 'Lg equal-width' ).inputValue()
		).toBeTruthy();

		// Column size should be disabled if equal-width checkbox is checked
		await expect(
			page
				.locator( 'input[aria-label="Lg Column count"][disabled]' )
				.first()
		).toBeVisible();

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'change-column-size-1.txt'
		);

		await page
			.locator(
				'input.components-input-control__input[aria-label="Xl Column count"]'
			)
			.fill( '2' );

		expect( await firstColumnBlock.getAttribute( 'data-size-xl' ) ).toBe(
			'2'
		);

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'change-column-size-2.txt'
		);
	} );

	test( 'Change background color', async ( { editor, page } ) => {
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByRole( 'button', { name: 'Background color' } )
			.click();

		await page.locator( 'button[aria-label="Color: secondary"]' ).click();

		// Check if selected background is set in data attribute
		const firstColumnBlock = await page
			.locator( '[data-type="wp-bootstrap-blocks/column"]' )
			.first();

		expect( await firstColumnBlock.getAttribute( 'data-bg-color' ) ).toBe(
			'secondary'
		);

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'change-background-color.txt'
		);
	} );

	test( 'Select padding', async ( { editor, page } ) => {
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
			.selectOption( 'p-2' );

		// Check if selected background is set in data attribute
		const firstColumnBlock = await page
			.locator( '[data-type="wp-bootstrap-blocks/column"]' )
			.first();

		expect( await firstColumnBlock.getAttribute( 'data-padding' ) ).toBe(
			'p-2'
		);

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'select-padding.txt'
		);
	} );

	test( 'Change content vertical alignment', async ( { editor, page } ) => {
		await editor.clickBlockToolbarButton(
			'Change vertical alignment of content'
		);
		await page.locator( 'button:text("Align content bottom")' ).click();

		await expect(
			page.locator(
				'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/column"][data-content-vertical-alignment="bottom"]'
			)
		).toBeVisible();

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'select-content-vertical-alignment.txt'
		);
	} );
} );

test.describe( 'Column Block - Block inserter', () => {
	test.beforeEach( async ( { admin, editor } ) => {
		await admin.createNewPost();
	} );

	test( 'Column block is not available in block inserter', async ( {
		page,
	} ) => {
		// Intercept block directory request
		await page.route(
			'**/index.php?rest_route=%2Fwp%2Fv2%2Fblock-directory%2Fsearch&term=*',
			( route ) =>
				route.fulfill( {
					status: 200,
					body: [],
				} )
		);

		// Toggle Block inserter
		await page
			.locator( 'role=button[name="Toggle block inserter"i]' )
			.click();

		// Expect to see the block inserter.
		await expect(
			page.getByRole( 'searchbox', {
				name: 'Search for blocks and patterns',
			} )
		).toBeFocused();

		// Search for the block.
		await page.keyboard.type( 'Bootstrap Column' );

		// Results should be empty
		await expect(
			await page.locator(
				'.block-directory-downloadable-blocks-panel__no-local'
			)
		).toBeVisible();
	} );
} );

test.describe( 'Column Block - Bootstrap 5', () => {
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

	test( 'Xxl breakpoint options are available', async ( { page } ) => {
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByRole( 'button', { name: 'Column size' } )
			.click();

		// Xxl column count option should exist
		await expect(
			page.getByLabel( 'Xxl Column count' ).first()
		).toBeVisible();

		// Xxl equal-width option should exist
		await expect( page.getByLabel( 'Xxl equal-width' ) ).toBeVisible();
	} );
	test( 'Select column size for xxl breakpoint', async ( {
		editor,
		page,
	} ) => {
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByRole( 'button', { name: 'Column size' } )
			.click();

		await page
			.locator(
				'input.components-input-control__input[aria-label="Xxl Column count"]'
			)
			.fill( '2' );

		// Check if selected column count is set in data attribute
		const firstColumnBlock = await page
			.locator( '[data-type="wp-bootstrap-blocks/column"]' )
			.first();

		expect( await firstColumnBlock.getAttribute( 'data-size-xxl' ) ).toBe(
			'2'
		);
		await page.getByLabel( 'Xxl equal-width' ).click();

		expect(
			await page.getByLabel( 'Xxl equal-width' ).inputValue()
		).toBeTruthy();

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'select-column-size-for-xxl-breakpoint.txt'
		);
	} );
} );
