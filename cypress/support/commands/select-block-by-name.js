import { getBlockByName, selectBlockByClientId } from '../shared/helper';

Cypress.Commands.add( 'selectBlockByName', ( name, index ) => {
	getBlockByName( name, index ).then( ( block ) => {
		selectBlockByClientId( block.clientId )
	})
} )
