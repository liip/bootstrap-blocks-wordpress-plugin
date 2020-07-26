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
import {
	clickElementByText,
	ensureSidebarOpened,
	getSelectedValueBySelectLabel,
	selectOption,
	selectOptionIsAvailable,
} from '../helper';

describe( 'row block filters Bootstrap 5', () => {
	beforeAll( async () => {
		await activatePlugin( 'wp-bootstrap-blocks-test-bootstrap-v5' );
		await activatePlugin( 'wp-bootstrap-blocks-test-row-filters' );
	} );

	afterAll( async () => {
		await deactivatePlugin( 'wp-bootstrap-blocks-test-bootstrap-v5' );
		await deactivatePlugin( 'wp-bootstrap-blocks-test-row-filters' );
	} );

	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'wpBootstrapBlocks.row.horizontalGuttersOptions should add horizontal gutters option', async () => {
		await insertRowBlock();
		await selectRowBlock();
		await ensureSidebarOpened();

		// Disable No Gutters option to make Gutter options visible
		await clickElementByText( 'label', 'No Gutters' );

		// Additional horizontal gutters option should be available
		expect(
			await selectOptionIsAvailable( 'Horizontal Gutters', 'gx-4' )
		).toBe( true );

		// Horizontal Gutters option should be applied
		await selectOption( 'Horizontal Gutters', 'gx-4' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'wpBootstrapBlocks.row.verticalGuttersOptions should add vertical gutters option', async () => {
		await insertRowBlock();
		await selectRowBlock();
		await ensureSidebarOpened();

		// Disable No Gutters option to make Gutter options visible
		await clickElementByText( 'label', 'No Gutters' );

		// Additional vertical gutters option should be available
		expect(
			await selectOptionIsAvailable( 'Vertical Gutters', 'gy-4' )
		).toBe( true );

		// Vertical Gutters option should be applied
		await selectOption( 'Vertical Gutters', 'gy-4' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'wp_bootstrap_blocks_row_default_attributes should override default attributes with Bootstrap 5', async () => {
		await insertRowBlock();
		await selectRowBlock();
		await ensureSidebarOpened();

		// Disable No Gutters option to make Gutter options visible
		await clickElementByText( 'label', 'No Gutters' );

		// Horizontal Gutters should be selected
		expect(
			await getSelectedValueBySelectLabel( 'Horizontal Gutters' )
		).toMatch( 'gx-5' );

		// Vertical Gutters should be selected
		expect(
			await getSelectedValueBySelectLabel( 'Vertical Gutters' )
		).toMatch( 'gy-3' );

		// Check if attributes are set correctly
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
