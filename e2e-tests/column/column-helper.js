import {
	selectBlockByClientId,
} from '@wordpress/e2e-test-utils';
import {
	getBlockByName,
} from '../helper';

export const selectColumnBlock = async ( index = 0 ) => {
	const columnBlocks = await getColumnBlocks();
	await selectBlockByClientId( columnBlocks[ index ].clientId );
};

export const getColumnBlocks = async () => {
	return ( await getBlockByName( 'wp-bootstrap-blocks/row' ) ).innerBlocks;
};
