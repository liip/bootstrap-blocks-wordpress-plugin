/* eslint-disable wrap-iife */
( function () {
	function rowFiltersTemplates( templates ) {
		templates = [
			...templates,
			{
				name: '1-66percent',
				title: '1 Column (2/3 width)',
				icon: 'yes',
				templateLock: 'all',
				template: [
					[
						'wp-bootstrap-blocks/column',
						{
							sizeMd: 8,
						},
					],
				],
			},
		];
		return templates;
	}
	wp.hooks.addFilter(
		'wpBootstrapBlocks.row.templates',
		'row-filters/wp-bootstrap-blocks/row/templates',
		rowFiltersTemplates
	);

	// Disable custom row template
	wp.hooks.addFilter(
		'wpBootstrapBlocks.row.enableCustomTemplate',
		'row-filters/wp-bootstrap-blocks/row/enableCustomTemplate',
		() => false
	);

	// Add custom horizontal gutters option
	function customHorizontalGuttersOption( horizontalGuttersOptions ) {
		return [
			...horizontalGuttersOptions,
			{
				label: 'Huge',
				value: 'gx-10',
			},
		];
	}
	wp.hooks.addFilter(
		'wpBootstrapBlocks.row.horizontalGuttersOptions',
		'row-filters/wp-bootstrap-blocks/row/horizontalGuttersOptions',
		customHorizontalGuttersOption
	);

	// Add custom vertical gutters option
	function customVerticalGuttersOption( verticalGuttersOptions ) {
		return [
			...verticalGuttersOptions,
			{
				label: 'Huge',
				value: 'gy-10',
			},
		];
	}
	wp.hooks.addFilter(
		'wpBootstrapBlocks.row.verticalGuttersOptions',
		'row-filters/wp-bootstrap-blocks/row/verticalGuttersOptions',
		customVerticalGuttersOption
	);

	// Add custom CSS grid gutters option
	function customCssGridGuttersOption( cssGridGuttersOptions ) {
		return [
			...cssGridGuttersOptions,
			{
				label: 'Huge',
				value: '10rem',
			},
		];
	}
	wp.hooks.addFilter(
		'wpBootstrapBlocks.row.cssGridGuttersOptions',
		'row-filters/wp-bootstrap-blocks/row/cssGridGuttersOptions',
		customCssGridGuttersOption
	);
} )();
