import {
	searchForBlock,
} from '@wordpress/e2e-test-utils';
import {
	selectBlockByName,
} from '../helper';

export const insertRowBlock = async () => {
	await searchForBlock( 'Bootstrap Row' );
	await page.click( 'button.editor-block-list-item-wp-bootstrap-blocks-row' );
};

export const selectRowBlock = async ( index = 0 ) => {
	await selectBlockByName( 'wp-bootstrap-blocks/row', index );
};
