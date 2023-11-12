const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

test.describe( 'Settings page', () => {
	test.beforeEach( async ( { admin } ) => {
		await admin.visitAdminPage(
			'options-general.php?page=wp-bootstrap-blocks_settings'
		);
	} );

	test( 'Default values are selected', async ( { page } ) => {
		expect(
			await page
				.locator( '#wp-bootstrap-blocks_bootstrap_version' )
				.inputValue()
		).toBe( '5' );

		const enableCssGridCheckbox = await page.getByLabel(
			'Enable CSS grid (Experimental)'
		);

		expect( await enableCssGridCheckbox.isChecked() ).toBeFalsy();
		await expect( enableCssGridCheckbox ).not.toBeDisabled();
	} );

	test( 'Respects constants', async ( { page, requestUtils } ) => {
		await requestUtils.activatePlugin(
			'wp-bootstrap-blocks-test-css-grid'
		);

		await expect(
			await page.locator( '#wp-bootstrap-blocks_bootstrap_version' )
		).toBeDisabled();

		expect(
			await page
				.locator( '#wp-bootstrap-blocks_bootstrap_version' )
				.inputValue()
		).toBe( '5' );

		const enableCssGridCheckbox = await page.locator(
			'#wp-bootstrap-blocks_enable_css_grid'
		);

		expect( await enableCssGridCheckbox.isChecked() ).toBeTruthy();
		await expect( enableCssGridCheckbox ).toBeDisabled();

		await requestUtils.deactivatePlugin(
			'wp-bootstrap-blocks-test-css-grid'
		);
	} );
} );
