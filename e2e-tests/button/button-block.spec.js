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
	clickElementByText,
	ensureSidebarOpened,
	getTextControlValueByLabel,
	selectOption,
	setTextControlValueByLabel,
} from '../helper';
import { insertButtonBlock, selectButtonBlock } from './button-helper';

const NEW_TAB_REL_DEFAULT_VALUE = 'noreferrer noopener';

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
		await page.type(
			'[aria-label="Add text..."].block-editor-rich-text__editable',
			'Liip'
		);

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
		await ensureSidebarOpened();

		// Style option should be applied
		await selectOption( 'Style', 'secondary' );

		// Editor content should match snapshot
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	// TODO fix broken test
	it.skip( 'Should be possible to change alignment', async () => {
		await insertButtonBlock();
		await selectButtonBlock();

		// Change alignment
		await clickBlockToolbarButton( 'Change button alignment' );
		await clickButton( 'Align text center' );
		expect(
			await page.$(
				'.block-editor-block-list__block[data-type="wp-bootstrap-blocks/button"][data-alignment="center"]'
			)
		).not.toBeNull();

		// Editor content should match snapshot
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'Should be possible to enable and disable open in new tab', async () => {
		await insertButtonBlock();
		await selectButtonBlock();
		await ensureSidebarOpened();

		// Enable open in new tab
		await clickElementByText( 'label', 'Open in new tab' );

		// Check if default rel value is set
		expect( await getTextControlValueByLabel( 'Link rel' ) ).toMatch(
			NEW_TAB_REL_DEFAULT_VALUE
		);

		// Editor content should match snapshot
		expect( await getEditedPostContent() ).toMatchSnapshot();

		// Disable open in new tab
		await clickElementByText( 'label', 'Open in new tab' );

		// Check if default rel value is removed
		expect( await getTextControlValueByLabel( 'Link rel' ) ).toMatch( '' );

		// Editor content should match snapshot
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'Should keep rel value if set when open in new tab is enabled or disabled', async () => {
		await insertButtonBlock();
		await selectButtonBlock();
		await ensureSidebarOpened();

		const customRelValue = 'custom rel value';

		// Enable no gutters option
		await setTextControlValueByLabel( 'Link rel', customRelValue );

		// Enable open in new tab
		await clickElementByText( 'label', 'Open in new tab' );

		// Check if rel value hasn't changed
		expect( await getTextControlValueByLabel( 'Link rel' ) ).toMatch(
			customRelValue
		);

		// Editor content should match snapshot
		expect( await getEditedPostContent() ).toMatchSnapshot();

		// Disable open in new tab
		await clickElementByText( 'label', 'Open in new tab' );

		// Check if rel value hasn't changed
		expect( await getTextControlValueByLabel( 'Link rel' ) ).toMatch(
			customRelValue
		);

		// Editor content should match snapshot
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
