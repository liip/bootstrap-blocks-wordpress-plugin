/**
 * WordPress dependencies
 */
import {
	activatePlugin,
	deactivatePlugin,
	createNewPost,
} from '@wordpress/e2e-test-utils';
import { insertContainerBlock, selectContainerBlock } from './container-helper';
import { ensureSidebarOpened } from '../helper';

describe( 'container block Bootstrap 5', () => {
	beforeAll( async () => {
		await activatePlugin( 'wp-bootstrap-blocks-test-bootstrap-v5' );
	} );

	afterAll( async () => {
		await deactivatePlugin( 'wp-bootstrap-blocks-test-bootstrap-v5' );
	} );

	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'Should display xxl breakpoint', async () => {
		await insertContainerBlock();
		await selectContainerBlock();
		await ensureSidebarOpened();

		expect(
			await page.$x(
				`//label[contains(@class,"components-base-control__label")][contains(text(),"Fluid Breakpoint")]/following-sibling::select[contains(@class,"components-select-control__input")]/option`
			)
		).toHaveLength( 6 );

		// xxl option should exist
		expect(
			await page.$x(
				`//label[contains(@class,"components-base-control__label")][contains(text(),"Fluid Breakpoint")]/following-sibling::select[contains(@class,"components-select-control__input")]/option[@value='xxl']`
			)
		).toHaveLength( 1 );
	} );
} );
