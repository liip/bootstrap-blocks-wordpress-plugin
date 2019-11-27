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
	insertRowBlock,
	oldObjectStructureDeprecationWarning,
} from '../row/row-helper';
import {
	selectColumnBlock,
} from './column-helper';
import {
	getCheckboxValueByLabel,
	getDataValuesOfElement,
	getInputValueByLabel,
	getSelectedValueBySelectLabel,
	openSidebarPanelWithTitle,
	selectOption,
} from '../helper';

describe( 'column block filters', () => {
	beforeAll( async () => {
		await activatePlugin( 'wp-bootstrap-blocks-test-column-filters' );
	} );

	afterAll( async () => {
		await deactivatePlugin( 'wp-bootstrap-blocks-test-column-filters' );
	} );

	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'wpBootstrapBlocks.column.bgColorOptions should add background color', async () => {
		expect( console ).toHaveWarnedWith( oldObjectStructureDeprecationWarning );

		await insertRowBlock();
		await selectColumnBlock();
		await openSidebarPanelWithTitle( 'Background color' );

		// Additional background color should be available
		expect( await page.$( '.components-color-palette__item[aria-label="Color: brand"]' ) ).not.toBeNull();

		// Background color should be applied
		await page.click( '.components-color-palette__item[aria-label="Color: brand"]' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'wpBootstrapBlocks.column.paddingOptions should add padding option', async () => {
		expect( console ).toHaveWarnedWith( oldObjectStructureDeprecationWarning );

		await insertRowBlock();
		await selectColumnBlock();
		await openSidebarPanelWithTitle( 'Padding (inside column)' );

		// Additional padding option should be available
		expect( await page.$( 'select.components-select-control__input > option[value="p-8"]' ) ).not.toBeNull();

		// Padding option should be applied
		await selectOption( 'Size', 'p-8' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'wp_bootstrap_blocks_column_default_attributes should override default attributes', async () => {
		expect( console ).toHaveWarnedWith( oldObjectStructureDeprecationWarning );

		await insertRowBlock();
		await selectColumnBlock();

		// Columm size values should be set
		await openSidebarPanelWithTitle( 'Column size' );
		expect( await getInputValueByLabel( 'Xs Column count' ) ).toMatch( '4' );
		expect( await getInputValueByLabel( 'Sm Column count' ) ).toMatch( '6' );
		// For the md column count we would expect a value of 8 but it gets overwritten by the default layout which has a value of 6.
		expect( await getInputValueByLabel( 'Md Column count' ) ).toMatch( '6' );
		expect( await getInputValueByLabel( 'Lg Column count' ) ).toMatch( '10' );
		expect( await getInputValueByLabel( 'Xl Column count' ) ).toMatch( '0' );

		// Columm equal-width checkboxes should be checked
		expect( await getCheckboxValueByLabel( 'Xl equal-width' ) ).toBe( true );

		// Background color should be selected
		await openSidebarPanelWithTitle( 'Background color' );
		// There is no way to see which color of a color palette is selected. That's why we check the data attribute value.
		const columnData = await getDataValuesOfElement( '[data-type="wp-bootstrap-blocks/column"]' );
		expect( columnData.bgColor ).toMatch( 'primary' );
		expect( await getCheckboxValueByLabel( 'Center content vertically in row' ) ).toBe( true );

		// Padding should be selected
		await openSidebarPanelWithTitle( 'Padding (inside column)' );
		expect( await getSelectedValueBySelectLabel( 'Size' ) ).toMatch( 'p-3' );

		// Check if attributes are set correctly
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
