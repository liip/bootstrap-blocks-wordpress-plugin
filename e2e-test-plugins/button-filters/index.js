/* eslint-disable wrap-iife */
( function () {
	function buttonFiltersStyleOptions( styleOptions ) {
		return [ ...styleOptions, { label: 'Brand', value: 'brand' } ];
	}
	wp.hooks.addFilter(
		'wpBootstrapBlocks.button.styleOptions',
		'button-filters/wp-bootstrap-blocks/button/styleOptions',
		buttonFiltersStyleOptions
	);
} )();
