( function() {
	wp.hooks.addFilter( 'wpBootstrapBlocks.row.useOldObjectTemplateStructure', 'row-filters/wp-bootstrap-blocks/row/useOldObjectTemplateStructure', function () { return false; } );

	function rowFiltersTemplates( templates ) {
		templates = [
			...templates,
			{
				name: '1-66percent',
				title: '1 Column (1/3 width)',
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
