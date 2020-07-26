/**
 * WordPress dependencies
 */
import { createNewPost, getEditedPostContent } from '@wordpress/e2e-test-utils';
import {
	clickElementByText,
	getCheckboxValueByLabel,
	selectOption,
	selectIsDisabledByLabel,
	getSelectedValueBySelectLabel,
	ensureSidebarOpened,
} from '../helper';
import { insertContainerBlock, selectContainerBlock } from './container-helper';

describe( 'container block', () => {
	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'Container block should be initialized with default attributes', async () => {
		await insertContainerBlock();
		await selectContainerBlock();
		await ensureSidebarOpened();

		// Fluid option should not be checked
		expect( await getCheckboxValueByLabel( 'Fluid' ) ).toBe( false );

		// Fluid Breakpoint select field should be disabled
		expect( await selectIsDisabledByLabel( 'Fluid Breakpoint' ) ).toBe(
			true
		);

		// Margin After should be set
		expect( await getSelectedValueBySelectLabel( 'Margin After' ) ).toMatch(
			'mb-2'
		);

		// Editor content should match snapshot
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'Should be possible to enable fluid option', async () => {
		await insertContainerBlock();
		await selectContainerBlock();
		await ensureSidebarOpened();

		// Change column size attributes
		await clickElementByText( 'label', 'Fluid' );

		// Fluid checkbox should be selected
		expect( await getCheckboxValueByLabel( 'Fluid' ) ).toBe( true );

		// Editor content should match snapshot
		expect( await getEditedPostContent() ).toMatchSnapshot();

		// Fluid breakpoint option should be applied
		await selectOption( 'Fluid Breakpoint', 'lg' );

		// Editor content should match snapshot
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'Should not display xxl breakpoint options if run with Bootstrap 4', async () => {
		await insertContainerBlock();
		await selectContainerBlock();
		await ensureSidebarOpened();

		expect(
			await page.$x(
				`//label[@class="components-base-control__label"][contains(text(),"Fluid Breakpoint")]/following-sibling::select[@class="components-select-control__input"]/option`
			)
		).toHaveLength( 5 );

		// xxl option should not exist
		expect(
			await page.$x(
				`//label[@class="components-base-control__label"][contains(text(),"Fluid Breakpoint")]/following-sibling::select[@class="components-select-control__input"]/option[@value='xxl']`
			)
		).toHaveLength( 0 );
	} );
} );
