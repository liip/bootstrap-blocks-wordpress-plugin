import { editorSettingsSelectOption } from '../../commands/editor-settings-select-option';
import { openSidebarPanelWithTitle } from '../../commands/open-sidebar-panel-with-title';

const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

test.describe( 'Container Filters', () => {
	test.beforeAll( async ( { requestUtils } ) => {
		await requestUtils.activatePlugin(
			'wp-bootstrap-blocks-test-container-filters'
		);
	} );

	test.afterAll( async ( { requestUtils } ) => {
		await requestUtils.deactivatePlugin(
			'wp-bootstrap-blocks-test-container-filters'
		);
	} );

	test.beforeEach( async ( { admin, editor } ) => {
		await admin.createNewPost();
		await editor.insertBlock( {
			name: 'wp-bootstrap-blocks/container',
		} );
	} );

	test( 'wpBootstrapBlocks.container.marginAfterOptions adds margin option', async ( {
		editor,
		page,
	} ) => {
		// Additional padding option should be available
		await page
			.getByRole( 'region', {
				name: 'Editor settings',
			} )
			.getByLabel( 'Margin After' )
			.selectOption( 'mb-8' );

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'wpBootstrapBlocks.container.marginAfterOptions-adds-margin-option.txt'
		);
	} );

	test( 'wp_bootstrap_blocks_container_default_attributes override default attributes', async ( {
		editor,
		page,
	} ) => {
		// Fluid options should be enabled
		expect(
			await page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Fluid', { exact: true } )
				.isChecked()
		).toBeTruthy();

		// Fluid Breakpoint should be selected
		expect(
			await page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Fluid Breakpoint' )
				.inputValue()
		).toBe( 'md' );

		// Margin should be selected
		expect(
			await page
				.getByRole( 'region', {
					name: 'Editor settings',
				} )
				.getByLabel( 'Margin After' )
				.inputValue()
		).toBe( 'mb-3' );

		expect( await editor.getEditedPostContent() ).toMatchSnapshot(
			'wp_bootstrap_blocks_container_default_attributes-override-default-attributes.txt'
		);
	} );
} );
