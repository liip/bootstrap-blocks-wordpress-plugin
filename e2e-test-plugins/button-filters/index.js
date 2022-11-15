/* eslint-disable wrap-iife */
( function () {
	function buttonFiltersStyleOptions( styleOptions ) {
		return [
			...styleOptions,
			{
				label: 'Brand',
				value: 'brand',
				bgColor: '#FF0000',
				textColor: '#FFFFFF',
			},
			{
				label: 'Brand (Deprecated Color)',
				value: 'brand-deprecated-color',
				color: '#FF0000',
			},
			{
				label: 'Missing colors',
				value: 'missing-colors',
			},
		];
	}
	wp.hooks.addFilter(
		'wpBootstrapBlocks.button.styleOptions',
		'button-filters/wp-bootstrap-blocks/button/styleOptions',
		buttonFiltersStyleOptions
	);
} )();
