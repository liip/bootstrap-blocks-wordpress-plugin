import { selectBlockByClientId } from '@wordpress/e2e-test-utils';
import { getBlockByName } from '../helper';

export const selectColumnBlock = async ( rowIndex = 0, columnIndex = 0 ) => {
	const columnBlocks = await getColumnBlocks( rowIndex );
	await selectBlockByClientId( columnBlocks[ columnIndex ].clientId );
};

export const getColumnBlocks = async ( rowIndex = 0 ) => {
	return ( await getBlockByName( 'wp-bootstrap-blocks/row', rowIndex ) )
		.innerBlocks;
};
