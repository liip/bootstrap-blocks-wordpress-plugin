/**
 * WordPress dependencies
 */
import {
	activatePlugin,
	deactivatePlugin,
	createNewPost,
	getEditedPostContent,
} from '@wordpress/e2e-test-utils';
import { insertRowBlock } from '../row/row-helper';
import { selectColumnBlock } from './column-helper';
import {
	getCheckboxValueByLabel,
	getDataValuesOfElement,
	getInputValueByLabel,
	getSelectedValueBySelectLabel,
	openSidebarPanelWithTitle,
	selectOption,
	selectOptionIsAvailable,
} from '../helper';

describe( 'column block filters', () => {
	beforeAll( async () => {
		await activatePlugin( 'wp-bootstrap-blocks-test-bootstrap-v5' );
		await activatePlugin( 'wp-bootstrap-blocks-test-column-filters' );
	} );

	afterAll( async () => {
		await deactivatePlugin( 'wp-bootstrap-blocks-test-bootstrap-v5' );
		await deactivatePlugin( 'wp-bootstrap-blocks-test-column-filters' );
	} );

	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'wp_bootstrap_blocks_column_default_attributes should override default attributes with Bootstrap 5', async () => {
		await insertRowBlock();
		await selectColumnBlock();

		// Xxl Columm size value should be set
		await openSidebarPanelWithTitle( 'Column size' );
		expect( await getInputValueByLabel( 'Xxl Column count' ) ).toMatch(
			'5'
		);

		// Check if attributes are set correctly
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
