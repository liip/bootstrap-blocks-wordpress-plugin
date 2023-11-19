import rowContent100 from './fixtures/row-1.0.0';
import rowContent110 from './fixtures/row-1.1.0';
import rowContent140 from './fixtures/row-1.4.0';
import rowContentBootstrap5 from './fixtures/row-bootstrap5';
import rowContent320CenterContent from './fixtures/row-3.2.0-center-content';

const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

test.describe( 'Row Block - Backwards compatibility', () => {
	test.beforeEach( async ( { admin, editor, page } ) => {
		await admin.createNewPost();
		await editor.insertBlock( {
			name: 'wp-bootstrap-blocks/row',
		} );
		await editor.openDocumentSettingsSidebar();
	} );

	test( 'v1.0.0 row block content is compatible', async ( {
		editor,
		page,
	} ) => {
		await editor.setContent( rowContent100 );

		// Row blocks should be successfully inserted
		expect(
			await page.$$( '[data-type="wp-bootstrap-blocks/row"]' )
		).toHaveLength( 2 );
		expect(
			await page.$$( '[data-type="wp-bootstrap-blocks/column"]' )
		).toHaveLength( 4 );

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'v1.0.0-row-block-content-is-compatible.txt'
		);

		await testVersion100RowFeatures( editor, page );
	} );

	test( 'v1.1.0 row block content is compatible', async ( {
		editor,
		page,
	} ) => {
		await editor.setContent( rowContent110 );

		// Row blocks should be successfully inserted
		expect(
			await page.$$( '[data-type="wp-bootstrap-blocks/row"]' )
		).toHaveLength( 3 );
		expect(
			await page.$$( '[data-type="wp-bootstrap-blocks/column"]' )
		).toHaveLength( 6 );

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'v1.1.0-row-block-content-is-compatible.txt'
		);

		await testVersion100RowFeatures( editor, page );

		await testVersion110RowFeatures( editor, page );
	} );

	test( 'v1.1.0 column block content is compatible', async ( {
		editor,
		page,
	} ) => {
		await editor.setContent( rowContent110 );

		await testVersion100ColumnFeatures( editor, page );

		await testVersion110ColumnFeatures( editor, page );
	} );

	test( 'v1.4.0 column block content is compatible', async ( {
		editor,
		page,
	} ) => {
		await editor.setContent( rowContent140 );

		await testVersion100ColumnFeatures( editor, page );

		await testVersion110ColumnFeatures( editor, page );

		await testVersion140ColumnFeatures( editor, page );
	} );

	test( 'v3.2.0 column block content with center content option gets migrated to content vertical alignment', async ( {
		editor,
		page,
	} ) => {
		await editor.setContent( rowContent320CenterContent );

		// Select 1. Column of 1. Row
		await editor.selectBlocks(
			page
				.locator( 'role=document[name="Block: Row (Bootstrap)"i]' )
				.locator( 'nth=0' )
				.locator( 'role=document[name="Block: Column (Bootstrap)"i]' )
				.locator( 'nth=0' )
		);

		// Check if row block could be inserted without error
		await expect(
			await page.locator( '[data-type="wp-bootstrap-blocks/row"]' )
		).toBeVisible();
		await expect(
			await page.$$( '[data-type="wp-bootstrap-blocks/column"]' )
		).toHaveLength( 2 );

		// Check if center content option was migrated to content vertical alignment
		await editor.clickBlockToolbarButton(
			'Change vertical alignment of content'
		);
		await expect(
			await page.locator(
				'button.is-active:text("Align content center")'
			)
		).toBeVisible();

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'v3.2.0-column-block-content-with-center-content-option-gets-migrated-to-content-vertical-alignment.txt'
		);
	} );
} );

test.describe( 'Row Block - Backwards compatibility Bootstrap 4', () => {
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

	test( 'Bootstrap 4 works with Bootstrap 5 settings', async ( {
		editor,
		page,
	} ) => {
		await editor.setContent( rowContentBootstrap5 );

		// Select 1. Column of 1. Row
		await editor.selectBlocks(
			page
				.locator( 'role=document[name="Block: Row (Bootstrap)"i]' )
				.locator( 'nth=0' )
				.locator( 'role=document[name="Block: Column (Bootstrap)"i]' )
				.locator( 'nth=0' )
		);

		// Check if row block could be inserted without error
		await expect(
			await page.locator( '[data-type="wp-bootstrap-blocks/row"]' )
		).toBeVisible();
		await expect(
			await page.$$( '[data-type="wp-bootstrap-blocks/column"]' )
		).toHaveLength( 2 );

		// Check if Bootstrap 4 values are set in inspector controls
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByRole( 'button', { name: 'Column size' } )
			.click();

		expect(
			await page
				.getByRole( 'spinbutton', { name: 'Md Column count' } )
				.inputValue()
		).toBe( '8' );
	} );
} );

const testVersion100RowFeatures = async ( editor, page ) => {
	// Select first row block
	await editor.selectBlocks(
		page.locator( 'role=document[name="Block: Row (Bootstrap)"i]' ).first()
	);

	// 2:1 template should be selected
	await expect(
		await page.locator(
			'.wp-bootstrap-blocks-template-selector-button > button[aria-label="2 Columns (2:1)"].is-active'
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

	// Select 2. Row
	await editor.selectBlocks(
		page
			.locator( 'role=document[name="Block: Row (Bootstrap)"i]' )
			.locator( 'nth=1' )
	);

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
		await page.locator( 'button.is-active:text("Align columns bottom")' )
	).toBeVisible();

	// TODO fix
	// Align full should be selected
	/*await editor.clickBlockToolbarButton( 'Align' );
	await expect(
		await page.locator( 'button.is-active:text("Full width")' )
	).toBeVisible();*/
};

const testVersion110RowFeatures = async ( editor, page ) => {
	// Select 3. Row
	await editor.selectBlocks(
		page
			.locator( 'role=document[name="Block: Row (Bootstrap)"i]' )
			.locator( 'nth=2' )
	);

	// Custom template should be selected
	await expect(
		await page.locator(
			'.wp-bootstrap-blocks-template-selector-button > button[aria-label="Custom"].is-active'
		)
	).toBeVisible();

	// Column block appender should be visible
	await expect(
		page.locator(
			'.wp-block-wp-bootstrap-blocks-row > .block-editor-inner-blocks > .block-editor-block-list__layout > .block-list-appender'
		)
	).toBeVisible();
};

const testVersion100ColumnFeatures = async ( editor, page ) => {
	// Select 2. Column of 1. Row
	await editor.selectBlocks(
		page
			.locator( 'role=document[name="Block: Row (Bootstrap)"i]' )
			.locator( 'nth=0' )
			.locator( 'role=document[name="Block: Column (Bootstrap)"i]' )
			.locator( 'nth=1' )
	);

	// Check if default values are set in inspector controls
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
	).toBe( '5' );
	expect(
		await page
			.getByRole( 'spinbutton', { name: 'Sm Column count' } )
			.inputValue()
	).toBe( '6' );
	expect(
		await page
			.getByRole( 'spinbutton', { name: 'Md Column count' } )
			.inputValue()
	).toBe( '7' );
	expect(
		await page
			.getByRole( 'spinbutton', { name: 'Lg Column count' } )
			.inputValue()
	).toBe( '8' );
	expect(
		await page
			.getByRole( 'spinbutton', {
				name: 'Xl Column count',
				exact: true,
			} )
			.inputValue()
	).toBe( '9' );
};

const testVersion110ColumnFeatures = async ( editor, page ) => {
	// Select 2. Column of 1. Row
	await editor.selectBlocks(
		page
			.locator( 'role=document[name="Block: Row (Bootstrap)"i]' )
			.locator( 'nth=0' )
			.locator( 'role=document[name="Block: Column (Bootstrap)"i]' )
			.locator( 'nth=1' )
	);

	// Background color should be selected
	await page
		.getByRole( 'region', {
			name: 'Editor settings',
		} )
		.getByRole( 'button', { name: 'Background color' } )
		.click();

	// There is no way to see which color of a color palette is selected. That's why we check the data attribute value of the second column block.
	expect(
		await page
			.locator( '[data-type="wp-bootstrap-blocks/column"]' )
			.locator( 'nth=1' )
			.getAttribute( 'data-bg-color' )
	).toBe( 'primary' );

	// Check if center content option was migrated to content vertical alignment
	await editor.clickBlockToolbarButton(
		'Change vertical alignment of content'
	);
	await expect(
		await page.locator( 'button.is-active:text("Align content center")' )
	).toBeVisible();

	// Padding should be selected
	await page
		.getByRole( 'region', {
			name: 'Editor settings',
		} )
		.getByRole( 'button', { name: 'Padding (inside column)' } )
		.click();

	expect(
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'Size' )
			.inputValue()
	).toBe( 'p-5' );
};

const testVersion140ColumnFeatures = async ( editor, page ) => {
	// Select 2. Column of 1. Row
	await editor.selectBlocks(
		page
			.locator( 'role=document[name="Block: Row (Bootstrap)"i]' )
			.locator( 'nth=0' )
			.locator( 'role=document[name="Block: Column (Bootstrap)"i]' )
			.locator( 'nth=1' )
	);

	// Column equal-width checkboxes should be checked
	expect(
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'Lg equal-width' )
			.isChecked()
	).toBeTruthy();
	expect(
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'Xl equal-width', { exact: true } )
			.isChecked()
	).toBeTruthy();
};
