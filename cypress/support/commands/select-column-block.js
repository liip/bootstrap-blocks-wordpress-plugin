import { getBlockByName, selectBlockByClientId } from '../shared/helper';

Cypress.Commands.add(
	'selectColumnBlock',
	( rowIndex = 0, columnIndex = 0 ) => {
		getBlockByName( 'wp-bootstrap-blocks/row', rowIndex ).then(
			( block ) => {
				const columnBlocks = block.innerBlocks;
				selectBlockByClientId( columnBlocks[ columnIndex ].clientId );
			}
		);
	}
);
