/**
 * WordPress dependencies
 */
import {
	createNewPost,
	searchForBlock,
	getEditedPostContent,
} from '@wordpress/e2e-test-utils';

describe( 'adding row block', () => {
	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'Should insert row block with the global inserter', async () => {
		await searchForBlock( 'Bootstrap Row' )
		await page.click( 'button.editor-block-list-item-wp-bootstrap-blocks-row' )

		expect( await page.$( '[data-type="wp-bootstrap-blocks/row"]' ) ).not.toBeNull();
		expect( await page.$$( '[data-type="wp-bootstrap-blocks/column"]' ) ).toHaveLength(2);

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
