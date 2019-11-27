/**
 * WordPress dependencies
 */
import {
	createNewPost,
	getEditedPostContent,
} from '@wordpress/e2e-test-utils';
import {
	oldObjectStructureDeprecationWarning,
} from '../row/row-helper';
import {
	clickElementByText,
	getCheckboxValueByLabel,
	selectOption,
	selectIsDisabledByLabel,
	getSelectedValueBySelectLabel,
} from '../helper';
import {
	insertContainerBlock,
	selectContainerBlock,
} from './container-helper';

describe( 'container block', () => {
	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'Container block should be initialized with default attributes', async () => {
		expect( console ).toHaveWarnedWith( oldObjectStructureDeprecationWarning );

		await insertContainerBlock();
		await selectContainerBlock();

		// Fluid option should not be checked
		expect( await getCheckboxValueByLabel( 'Fluid' ) ).toBe( false );

		// Fluid Breakpoint select field should be disabled
		expect( await selectIsDisabledByLabel( 'Fluid Breakpoint' ) ).toBe( true );

		// Margin After should be set
		expect( await getSelectedValueBySelectLabel( 'Margin After' ) ).toMatch( 'mb-2' );

		// Editor content should match snapshot
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'Should be possible to enable fluid option', async () => {
		expect( console ).toHaveWarnedWith( oldObjectStructureDeprecationWarning );

		await insertContainerBlock();
		await selectContainerBlock();

		// Change column size attributes
		await clickElementByText( 'label', 'Fluid' );

		// Fluid checkbox should be selected
		expect( await getCheckboxValueByLabel( 'Fluid' ) ).toBe( true );

		// Editor content should match snapshot
		expect( await getEditedPostContent() ).toMatchSnapshot();

		// Padding option should be applied
		await selectOption( 'Fluid Breakpoint', 'lg' );

		// Editor content should match snapshot
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
