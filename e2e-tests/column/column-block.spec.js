/**
 * WordPress dependencies
 */
import {
	createNewPost,
	getEditedPostContent,
	searchForBlock,
	selectBlockByClientId,
} from '@wordpress/e2e-test-utils';
import { insertRowBlock } from '../row/row-helper';
import { getColumnBlocks } from './column-helper';
import {
	clickElementByText,
	getCheckboxValueByLabel,
	getDataValuesOfElement,
	inputIsDisabledByLabel,
	getInputValueByLabel,
	openSidebarPanelWithTitle,
	selectOption,
	ensureSidebarOpened,
} from '../helper';

describe( 'column block', () => {
	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'Column block should not be available in block inserter', async () => {
		await searchForBlock( 'Bootstrap Column' );
		expect(
			await page.$( '.block-editor-inserter__no-results' )
		).not.toBeNull();
	} );

	it( 'Column block should be initialized with default attributes', async () => {
		await insertRowBlock();
		await ensureSidebarOpened();

		// Check attributes of first column block
		const columnBlocks = await getColumnBlocks();
		const firstColumnBlockClientId = columnBlocks[ 0 ].clientId;
		const columnData = await getDataValuesOfElement(
			`#block-${ firstColumnBlockClientId }`
		);

		// Check if default values are set in data attributes
		expect( columnData.sizeXs ).toMatch( '12' );
		expect( columnData.sizeSm ).toMatch( '0' );
		expect( columnData.sizeMd ).toMatch( '6' );
		expect( columnData.sizeLg ).toMatch( '0' );
		expect( columnData.sizeXl ).toMatch( '0' );

		// Select first column block
		await selectBlockByClientId( firstColumnBlockClientId );

		// Check if default values are set in inspector controls
		await openSidebarPanelWithTitle( 'Column size' );
		expect( await getInputValueByLabel( 'Xs Column count' ) ).toMatch(
			'12'
		);
		expect( await getInputValueByLabel( 'Sm Column count' ) ).toMatch(
			'0'
		);
		expect( await getInputValueByLabel( 'Md Column count' ) ).toMatch(
			'6'
		);
		expect( await getInputValueByLabel( 'Lg Column count' ) ).toMatch(
			'0'
		);
		expect( await getInputValueByLabel( 'Xl Column count' ) ).toMatch(
			'0'
		);

		expect( await getCheckboxValueByLabel( 'Xs equal-width' ) ).toBe(
			false
		);
		expect( await getCheckboxValueByLabel( 'Sm equal-width' ) ).toBe(
			false
		);
		expect( await getCheckboxValueByLabel( 'Md equal-width' ) ).toBe(
			false
		);
		expect( await getCheckboxValueByLabel( 'Lg equal-width' ) ).toBe(
			false
		);
		expect( await getCheckboxValueByLabel( 'Xl equal-width' ) ).toBe(
			false
		);
	} );

	it( 'Should be possible to change column size', async () => {
		await insertRowBlock();
		await ensureSidebarOpened();

		// Select first column block
		const columnBlocks = await getColumnBlocks();
		const firstColumnBlockClientId = columnBlocks[ 0 ].clientId;
		await selectBlockByClientId( firstColumnBlockClientId );
		await openSidebarPanelWithTitle( 'Column size' );

		// Change column size attributes
		await clickElementByText( 'label', 'Lg equal-width' );

		let columnData = await getDataValuesOfElement(
			`#block-${ firstColumnBlockClientId }`
		);

		// Check if default values are set in data attributes
		expect( columnData.sizeXs ).toMatch( '0' );
		expect( columnData.sizeSm ).toMatch( '0' );
		expect( columnData.sizeMd ).toMatch( '0' );
		expect( columnData.sizeLg ).toMatch( '0' );
		expect( columnData.sizeXl ).toMatch( '0' );
		expect( await getCheckboxValueByLabel( 'Lg equal-width' ) ).toBe(
			true
		);

		// Column size should be disabled if equal-width checkbox is checked
		expect( await inputIsDisabledByLabel( 'Lg Column count' ) ).toBe(
			true
		);

		expect( await getEditedPostContent() ).toMatchSnapshot();

		await page.type( '[aria-label="Xl Column count"]', '2' );
		columnData = await getDataValuesOfElement(
			`#block-${ firstColumnBlockClientId }`
		);
		expect( columnData.sizeXl ).toMatch( '2' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'Should be possible to select background color', async () => {
		await insertRowBlock();
		await ensureSidebarOpened();

		// Select first column block
		const columnBlocks = await getColumnBlocks();
		const firstColumnBlockClientId = columnBlocks[ 0 ].clientId;
		await selectBlockByClientId( firstColumnBlockClientId );
		await openSidebarPanelWithTitle( 'Background color' );

		// Select background color
		await page.click( 'button[aria-label="Color: secondary"]' );

		// Check if selected background is set in data attribute
		let columnData = await getDataValuesOfElement(
			`#block-${ firstColumnBlockClientId }`
		);
		expect( columnData.bgColor ).toMatch( 'secondary' );

		expect( await getEditedPostContent() ).toMatchSnapshot();

		// Select center content vertically
		await clickElementByText( 'label', 'Center content vertically in row' );
		columnData = await getDataValuesOfElement(
			`#block-${ firstColumnBlockClientId }`
		);
		expect( columnData.centerContent ).toMatch( 'true' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'Should reset centerContent if bgColor gets removed', async () => {
		await insertRowBlock();
		await ensureSidebarOpened();

		// Select first column block
		const columnBlocks = await getColumnBlocks();
		const firstColumnBlockClientId = columnBlocks[ 0 ].clientId;
		await selectBlockByClientId( firstColumnBlockClientId );
		await openSidebarPanelWithTitle( 'Background color' );

		// Select background color
		await page.click( 'button[aria-label="Color: secondary"]' );

		// Select center content vertically
		await clickElementByText( 'label', 'Center content vertically in row' );

		let columnData = await getDataValuesOfElement(
			`#block-${ firstColumnBlockClientId }`
		);
		expect( columnData.centerContent ).toMatch( 'true' );

		expect( await getEditedPostContent() ).toMatchSnapshot();

		// Remove background color
		await page.click( 'button.components-circular-option-picker__clear' );

		columnData = await getDataValuesOfElement(
			`#block-${ firstColumnBlockClientId }`
		);
		expect( columnData.centerContent ).toMatch( 'false' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'Should be possible to select padding', async () => {
		await insertRowBlock();
		await ensureSidebarOpened();

		// Select first column block
		const columnBlocks = await getColumnBlocks();
		const firstColumnBlockClientId = columnBlocks[ 0 ].clientId;
		await selectBlockByClientId( firstColumnBlockClientId );

		// Select padding
		await openSidebarPanelWithTitle( 'Padding (inside column)' );
		await selectOption( 'Size', 'p-2' );
		const columnData = await getDataValuesOfElement(
			`#block-${ firstColumnBlockClientId }`
		);
		expect( columnData.padding ).toMatch( 'p-2' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
