import { editorSettingsSelectOption } from '../../commands/editor-settings-select-option';
import { openSidebarPanelWithTitle } from '../../commands/open-sidebar-panel-with-title';

const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

test.describe( 'Container Block', () => {
	test.beforeEach( async ( { admin, editor } ) => {
		await admin.createNewPost();
		await editor.insertBlock( {
			name: 'wp-bootstrap-blocks/container',
		} );
	} );

	test( 'Container block gets initialized with default attributes', async ( {
		editor,
		page,
	} ) => {
		// Fluid option should not be checked
		expect(
			await page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Fluid', { exact: true } )
				.isChecked()
		).toBeFalsy();

		// Fluid Breakpoint select field should be disabled
		await expect(
			await page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Fluid Breakpoint', { exact: true } )
		).toBeDisabled();

		// Margin After should be set
		expect(
			await page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Margin After' )
				.inputValue()
		).toBe( 'mb-2' );

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'container-block-gets-initialized-with-default-attributes.txt'
		);
	} );

	test( 'Enable fluid option', async ( { editor, page } ) => {
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'Fluid', { exact: true } )
			.check();

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'enable-fluid-option-1.txt'
		);

		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'Fluid breakpoint' )
			.selectOption( 'lg' );

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'enable-fluid-option-2.txt'
		);
	} );

	// Bootstrap 5 specific options
	test( 'Xxl breakpoint is available', async ( { editor, page } ) => {
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'Fluid', { exact: true } )
			.check();

		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'Fluid breakpoint' )
			.selectOption( 'xxl' );

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'xxl-breakpoint-is-available.txt'
		);
	} );
} );
