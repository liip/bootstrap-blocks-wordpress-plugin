( function() {
	function rowOldTemplateStructureTemplates( templates ) {
		templates['1-66percent'] = {
			label: '1 Column (2/3 width)',
			templateLock: 'all',
			blocks: [
				[
					'wp-bootstrap-blocks/column',
					{
						sizeMd: 8,
					},
				],
			],
		};
		return templates;
	}
	wp.hooks.addFilter( 'wpBootstrapBlocks.row.templates', 'row-old-template-structure/wp-bootstrap-blocks/row/templates', rowOldTemplateStructureTemplates );
} )();
