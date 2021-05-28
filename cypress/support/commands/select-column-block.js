import { getBlockByName, selectBlockByClientId } from 'cypress-wp-test-utils';

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
