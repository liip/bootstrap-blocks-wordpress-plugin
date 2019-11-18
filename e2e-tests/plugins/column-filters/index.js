/* eslint-disable wrap-iife */
( function() {
	function modifyBgColorOptions( bgColorOptions ) {
		return [
			...bgColorOptions,
			{
				name: 'brand',
				color: '#6EA644',
			}
		];
	}
	wp.hooks.addFilter( 'wpBootstrapBlocks.column.bgColorOptions', 'column-filters/wp-bootstrap-blocks/column/bgColorOptions', modifyBgColorOptions );
} )();
