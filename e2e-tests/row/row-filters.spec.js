/**
 * WordPress dependencies
 */
import {
	activatePlugin,
	deactivatePlugin,
	createNewPost,
	getEditedPostContent,
} from '@wordpress/e2e-test-utils';
import { insertRowBlock, selectRowBlock } from './row-helper';
import { getCheckboxValueByLabel } from '../helper';

describe( 'row block filters', () => {
	beforeAll( async () => {
		await activatePlugin( 'wp-bootstrap-blocks-test-row-filters' );
	} );

	afterAll( async () => {
		await deactivatePlugin( 'wp-bootstrap-blocks-test-row-filters' );
	} );

	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'wpBootstrapBlocks.row.templates should add additional template', async () => {
		await insertRowBlock();
		await selectRowBlock();

		// Additional template should be available
		expect(
			await page.$$( '.wp-bootstrap-blocks-template-selector-button' )
		).toHaveLength( 5 ); // 4 default templates + 1 additional template (custom template disabled)
		expect(
			await page.$(
				'.wp-bootstrap-blocks-template-selector-button > button[aria-label="1 Column (2/3 width)"]'
			)
		).not.toBeNull();
		expect(
			await page.$(
				'.wp-bootstrap-blocks-template-selector-button > button[aria-label="1 Column (2/3 width)"] > svg.dashicons-yes'
			)
		).not.toBeNull();

		// Template should be applied
		await page.click(
			'.wp-bootstrap-blocks-template-selector-button > button[aria-label="1 Column (2/3 width)"]'
		);

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'wpBootstrapBlocks.row.enableCustomTemplate should disable custom template', async () => {
		await insertRowBlock();
		await selectRowBlock();

		// Custom template shouldn't be available
		expect(
			await page.$$( '.wp-bootstrap-blocks-template-selector-button' )
		).toHaveLength( 5 ); // 4 default templates + 1 additional template (custom template disabled)
		expect(
			await page.$(
				'.wp-bootstrap-blocks-template-selector-button > button[aria-label="Custom"]'
			)
		).toBeNull();
	} );

	it( 'wp_bootstrap_blocks_row_default_attributes should override default attributes', async () => {
		await insertRowBlock();
		await selectRowBlock();

		// 1:2 template should be selected
		expect(
			await page.$(
				'.wp-bootstrap-blocks-template-selector-button > button[aria-label="2 Columns (1:2)"].is-active'
			)
		).not.toBeNull();

		// No Gutters option should be checked
		expect( await getCheckboxValueByLabel( 'No Gutters' ) ).toBe( true );

		// Editor column layout option should be checked
		expect(
			await getCheckboxValueByLabel( 'Editor: Display columns stacked' )
		).toBe( true );

		/* TODO fix broken test
		// Align columns right should be selected
		expect(
			await toolbarOptionIsActive(
				'Change horizontal alignment of columns',
				'Align columns right'
			)
		).toBe( true );
		*/

		/* TODO fix broken test
		// Align columns bottom should be selected
		expect(
			await toolbarOptionIsActive(
				'Change vertical alignment of columns',
				'Align columns bottom'
			)
		).toBe( true );
		*/

		// Check if attributes are set correctly
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
