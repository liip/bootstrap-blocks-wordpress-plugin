/**
 * WordPress dependencies
 */
import {
	createNewPost,
	searchForBlock,
	selectBlockByClientId,
} from '@wordpress/e2e-test-utils'
import {
	insertRowBlock,
} from '../row/row-helper';
import {
	getColumnBlocks,
} from './column-helper'
import {
	getDataValuesOfElement,
	getRangeSelectorValueByLabel,
	openSidebarPanelWithTitle,
} from "../helper"

describe( 'column block', () => {
	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'Column block should not be available in block inserter', async () => {
		expect( console ).toHaveWarned();

		await searchForBlock( 'Bootstrap Column' );
		expect( await page.$( '.block-editor-inserter__no-results' ) ).not.toBeNull();
	} );

	it( 'Should be possible to change column size', async () => {
		expect( console ).toHaveWarned();

		await insertRowBlock();

		// Check attributes of first column block
		const columnBlocks = await getColumnBlocks();
		const firstColumnBlockClientId = columnBlocks[ 0 ].clientId;
		const columnData = await getDataValuesOfElement( `#block-${ firstColumnBlockClientId }` );

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
		expect( await getRangeSelectorValueByLabel( 'Xs Column count' ) ).toMatch( '12' );
		expect( await getRangeSelectorValueByLabel( 'Sm Column count' ) ).toMatch( '0' );
		expect( await getRangeSelectorValueByLabel( 'Md Column count' ) ).toMatch( '6' );
		expect( await getRangeSelectorValueByLabel( 'Lg Column count' ) ).toMatch( '0' );
		expect( await getRangeSelectorValueByLabel( 'Xl Column count' ) ).toMatch( '0' );
	} );
} );
