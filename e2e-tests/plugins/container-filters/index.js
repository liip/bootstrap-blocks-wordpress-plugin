/* eslint-disable wrap-iife */
( function () {
	// Add margin after option
	function myMarginAfterOptions( marginAfterOptions ) {
		return [ ...marginAfterOptions, { label: 'Huge', value: 'mb-8' } ];
	}
	wp.hooks.addFilter(
		'wpBootstrapBlocks.container.marginAfterOptions',
		'container-filters/wp-bootstrap-blocks/container/marginAfterOptions',
		myMarginAfterOptions
	);
} )();
