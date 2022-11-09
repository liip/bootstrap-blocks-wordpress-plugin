/* eslint-disable wrap-iife */
( function () {
	function buttonFiltersStyleOptions( styleOptions ) {
		return [
			...styleOptions,
			{ label: 'Brand', value: 'brand', color: '#FF0000' },
		];
	}
	wp.hooks.addFilter(
		'wpBootstrapBlocks.button.styleOptions',
		'button-filters/wp-bootstrap-blocks/button/styleOptions',
		buttonFiltersStyleOptions
	);
} )();
