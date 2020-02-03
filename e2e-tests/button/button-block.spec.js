/**
 * WordPress dependencies
 */
import {
	clickBlockToolbarButton,
	clickButton,
	createNewPost,
	getEditedPostContent,
} from '@wordpress/e2e-test-utils';
import {
} from '../row/row-helper';
import {
	selectOption,
} from '../helper';
import {
	insertButtonBlock,
	selectButtonBlock,
} from './button-helper';

describe( 'button block', () => {
	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'Button block should be initialized with default attributes', async () => {
		await insertButtonBlock();
		await selectButtonBlock();

		// Editor content should match snapshot
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'Should be possible to set link url and text', async () => {
		await insertButtonBlock();
		await selectButtonBlock();

		// Set button text
		await page.type( '[aria-label="Add text..."].block-editor-rich-text__editable', 'Liip' );

		// Editor content should match snapshot
		expect( await getEditedPostContent() ).toMatchSnapshot();

		// Set button url
		await page.type( 'input[aria-label="URL"]', 'https://liip.ch' );

		// Editor content should match snapshot
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'Should be possible to select style', async () => {
		await insertButtonBlock();
		await selectButtonBlock();

		// Style option should be applied
		await selectOption( 'Style', 'secondary' );

		// Editor content should match snapshot
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'Should be possible to change alignment', async () => {
		await insertButtonBlock();
		await selectButtonBlock();

		// Change alignment
		await clickBlockToolbarButton( 'Change button alignment' );
		await clickButton( 'Align Text Center' );
		expect( await page.$( '[data-type="wp-bootstrap-blocks/button"][data-alignment="center"]' ) ).not.toBeNull();

		// Editor content should match snapshot
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
