export const wpDataSelect = ( store, selector, ...parameters ) => {
	return cy.window().then(window => {
		return window.wp.data.select( store )[ selector ]( ...parameters )
	})
}

export const getAllBlocks = () => {
	return wpDataSelect( 'core/block-editor', 'getBlocks' )
}

export const getBlockByName = ( name, index = 0 ) => {
	return getAllBlocks().then( ( blocks ) => {
		const blocksByName = blocks.filter(
			( block ) => block.name === name
		);
		return blocksByName[ index ]
	})
};

export const selectBlockByClientId = ( clientId ) => {
	cy.window().then(window => {
		window.wp.data.dispatch( 'core/block-editor' ).selectBlock( clientId )
	})
}
