import { searchForBlock } from '@wordpress/e2e-test-utils';
import { selectBlockByName } from '../helper';

export const insertContainerBlock = async () => {
	await searchForBlock( 'Bootstrap Container' );
	await page.click(
		'button.editor-block-list-item-wp-bootstrap-blocks-container'
	);
};

export const selectContainerBlock = async ( index = 0 ) => {
	await selectBlockByName( 'wp-bootstrap-blocks/container', index );
};
