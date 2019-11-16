/* eslint-disable wrap-iife */
( function() {
	wp.hooks.addFilter( 'wpBootstrapBlocks.row.useOldObjectTemplateStructure', 'row-filters/wp-bootstrap-blocks/row/useOldObjectTemplateStructure', () => false );

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
	wp.hooks.addFilter( 'wpBootstrapBlocks.row.templates', 'row-filters/wp-bootstrap-blocks/row/templates', rowFiltersTemplates );
} )();
