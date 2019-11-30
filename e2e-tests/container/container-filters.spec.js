/**
 * WordPress dependencies
 */
import {
	activatePlugin,
	deactivatePlugin,
	createNewPost,
	getEditedPostContent,
} from '@wordpress/e2e-test-utils';
import {
} from '../row/row-helper';
import {
	getCheckboxValueByLabel,
	getSelectedValueBySelectLabel,
	selectOption,
} from '../helper';
import {
	insertContainerBlock,
	selectContainerBlock,
} from './container-helper';

describe( 'container block filters', () => {
	beforeAll( async () => {
		await activatePlugin( 'wp-bootstrap-blocks-test-container-filters' );
	} );

	afterAll( async () => {
		await deactivatePlugin( 'wp-bootstrap-blocks-test-container-filters' );
	} );

	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'wpBootstrapBlocks.container.marginAfterOptions should add margin option', async () => {
		await insertContainerBlock();
		await selectContainerBlock();

		// Additional padding option should be available
		expect( await page.$( 'select.components-select-control__input > option[value="mb-8"]' ) ).not.toBeNull();

		// Margin option should be applied
		await selectOption( 'Margin After', 'mb-8' );

		// Editor content should match snapshot
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'wp_bootstrap_blocks_container_default_attributes should override default attributes', async () => {
		await insertContainerBlock();
		await selectContainerBlock();

		// Fluid options should be enabled
		expect( await getCheckboxValueByLabel( 'Fluid' ) ).toBe( true );

		// Fluid Breakpoint should be selected
		expect( await getSelectedValueBySelectLabel( 'Fluid Breakpoint' ) ).toMatch( 'md' );

		// Margin should be selected
		expect( await getSelectedValueBySelectLabel( 'Margin After' ) ).toMatch( 'mb-3' );

		// Check if attributes are set correctly
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
