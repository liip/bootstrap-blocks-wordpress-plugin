/**
 * WordPress dependencies
 */
import {
	activatePlugin,
	deactivatePlugin,
	createNewPost,
	selectBlockByClientId,
	getEditedPostContent,
} from '@wordpress/e2e-test-utils';
import { insertRowBlock } from '../row/row-helper';
import { getColumnBlocks } from './column-helper';
import {
	clickElementByText,
	getDataValuesOfElement,
	openSidebarPanelWithTitle,
} from '../helper';

describe( 'column block Bootstrap 5', () => {
	beforeAll( async () => {
		await activatePlugin( 'wp-bootstrap-blocks-test-bootstrap-v5' );
	} );

	afterAll( async () => {
		await deactivatePlugin( 'wp-bootstrap-blocks-test-bootstrap-v5' );
	} );

	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'Should display xxl breakpoint options', async () => {
		await insertRowBlock();

		// Select first column block
		const columnBlocks = await getColumnBlocks();
		const firstColumnBlockClientId = columnBlocks[ 0 ].clientId;
		await selectBlockByClientId( firstColumnBlockClientId );
		await openSidebarPanelWithTitle( 'Column size' );

		// Xxl column count option should exist
		expect(
			await page.$x(
				'//label[@class="components-base-control__label"][contains(text(),"Xxl Column count")]'
			)
		).toHaveLength( 1 );

		// Xxl equal-width option should exist
		expect(
			await page.$x(
				'//label[@class="components-checkbox-control__label"][contains(text(),"Xxl equal-width")]'
			)
		).toHaveLength( 1 );
	} );

	it( 'Should be possible to select column size for xxl breakpoint', async () => {
		await insertRowBlock();

		// Select first column block
		const columnBlocks = await getColumnBlocks();
		const firstColumnBlockClientId = columnBlocks[ 0 ].clientId;
		await selectBlockByClientId( firstColumnBlockClientId );
		await openSidebarPanelWithTitle( 'Column size' );

		// Change column count
		await page.type( '[aria-label="Xxl Column count"]', '2' );
		const columnData = await getDataValuesOfElement(
			`#block-${ firstColumnBlockClientId }`
		);
		expect( columnData.sizeXxl ).toMatch( '2' );

		// Enable column equal-width
		await clickElementByText( 'label', 'Xxl equal-width' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
