import {
	searchForBlock,
} from '@wordpress/e2e-test-utils';
import {
	selectBlockByName,
} from '../helper';

export const insertButtonBlock = async () => {
	await searchForBlock( 'Bootstrap Button' );
	await page.click( 'button.editor-block-list-item-wp-bootstrap-blocks-button' );
};

export const selectButtonBlock = async ( index = 0 ) => {
	await selectBlockByName( 'wp-bootstrap-blocks/button', index );
};
