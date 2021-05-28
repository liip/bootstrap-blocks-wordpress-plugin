/* eslint-disable wrap-iife */
( function () {
	// Add custom background color
	function addBgColorOptions( bgColorOptions ) {
		return [
			...bgColorOptions,
			{
				name: 'brand',
				color: '#6EA644',
			},
		];
	}
	wp.hooks.addFilter(
		'wpBootstrapBlocks.column.bgColorOptions',
		'column-filters/wp-bootstrap-blocks/column/bgColorOptions',
		addBgColorOptions
	);

	// Add custom padding option
	function addPaddingOption( paddingOptions ) {
		return [ ...paddingOptions, { label: 'Huge', value: 'p-8' } ];
	}
	wp.hooks.addFilter(
		'wpBootstrapBlocks.column.paddingOptions',
		'column-filters/wp-bootstrap-blocks/column/paddingOptions',
		addPaddingOption
	);
} )();
