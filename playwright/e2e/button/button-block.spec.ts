import { editorSettingsSelectOption } from '../../commands/editor-settings-select-option';

const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

test.describe( 'Button Block', () => {
	test.beforeEach( async ( { admin, editor } ) => {
		await admin.createNewPost();
		await editor.insertBlock( {
			name: 'wp-bootstrap-blocks/button',
		} );
	} );

	test( 'Button block should be available', async ( { editor, page } ) => {
		const buttonBlock = await page.locator(
			'[data-type="wp-bootstrap-blocks/button"]'
		);

		await expect( buttonBlock ).toBeVisible();

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'button-block-should-be-available.txt'
		);
	} );

	test( 'Set link url and text', async ( { editor, page } ) => {
		await page
			.locator(
				'[aria-label="Add text..."].block-editor-rich-text__editable'
			)
			.fill( 'Liip' );
		await page
			.locator( 'input[aria-label="URL"]' )
			.fill( 'https://liip.ch' );

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'set-link-url-and-text.txt'
		);
	} );

	test( 'Select style', async ( { editor, page } ) => {
		// Style option should be applied
		await editorSettingsSelectOption( editor, page, 'Style', 'Secondary' );

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'select-style.txt'
		);
	} );

	test( 'Style is visible in UI', async ( { editor, page } ) => {
		expect(
			await page.getAttribute(
				'.wp-block-wp-bootstrap-blocks-button',
				'style'
			)
		).toEqual(
			'background-color: rgb(0, 123, 255); color: rgb(255, 255, 255);'
		);

		await editorSettingsSelectOption( editor, page, 'Style', 'Secondary' );

		expect(
			await page.getAttribute(
				'.wp-block-wp-bootstrap-blocks-button',
				'style'
			)
		).toEqual(
			'background-color: rgb(108, 117, 125); color: rgb(255, 255, 255);'
		);
	} );

	test( 'Data attributes are added', async ( { editor, page } ) => {
		await expect(
			await page.locator(
				'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/button"][data-style="primary"]'
			)
		).toBeVisible();

		await editorSettingsSelectOption( editor, page, 'Style', 'Secondary' );

		await expect(
			await page.locator(
				'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/button"][data-style="secondary"]'
			)
		).toBeVisible();
	} );

	test( 'Change alignment', async ( { editor, page } ) => {
		await editor.clickBlockToolbarButton( 'Change button alignment' );
		await page.locator( 'button:text("Align text center")' ).click();

		await expect(
			await page.locator(
				'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/button"][data-alignment="center"]'
			)
		).toBeVisible();

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'change-alignment.txt'
		);
	} );

	test( 'Enable / disable open in new tab', async ( { editor, page } ) => {
		const defaultLinkRelValue = 'noreferrer noopener';

		await editor.openDocumentSettingsSidebar();
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'Open in new tab' )
			.click();

		await expect(
			page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Link rel' )
		).toHaveValue( defaultLinkRelValue );

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'enable-open-in-new-tab.txt'
		);

		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'Open in new tab' )
			.click();

		await expect(
			page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Link rel' )
		).toHaveValue( '' );

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'disable-open-in-new-tab.txt'
		);
	} );

	test( 'Keeps rel value when open in new tab is enabled or disabled', async ( {
		editor,
		page,
	} ) => {
		const customLinkRelValue = 'custom rel value';

		await editor.openDocumentSettingsSidebar();
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'Link rel' )
			.fill( customLinkRelValue );

		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'Open in new tab' )
			.click();

		await expect(
			page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Link rel' )
		).toHaveValue( customLinkRelValue );

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'keeps-rel-value-when-open-in-new-tab-is-enabled.txt'
		);

		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'Open in new tab' )
			.click();

		await expect(
			page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Link rel' )
		).toHaveValue( customLinkRelValue );

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'keeps-rel-value-when-open-in-new-tab-is-disabled.txt'
		);
	} );
} );
