/* eslint-disable wrap-iife */
( function() {
	// Add custom margin bottom option
	function myMarginOptions( marginOptions ) {
		return [
			...marginOptions,
			{ label: 'Huge', value: 'mb-8' },
		];
	}
	wp.hooks.addFilter( 'wpBootstrapBlocks.container.marginOptions', 'container-filters/wp-bootstrap-blocks/container/marginOptions', myMarginOptions );
} )();
