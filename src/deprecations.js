/* eslint-disable no-console */

/**
 * WordPress dependencies
 */
const { hasFilter } = wp.hooks;

// deprecated container filters
if ( hasFilter( 'wpBootstrapBlocks.container.customMarginOptions' ) ) {
	console.warn(
		'`wpBootstrapBlocks.container.customMarginOptions` filter was renamed to `wpBootstrapBlocks.container.marginAfterOptions`. Please change your filter definition.'
	);
}

if ( hasFilter( 'wpBootstrapBlocks.container.useFluidContainerPerDefault' ) ) {
	console.warn(
		'`wpBootstrapBlocks.container.useFluidContainerPerDefault` filter has been removed. Please use `wp_bootstrap_blocks_container_default_attributes` filter (PHP) instead.'
	);
}

// deprecated row filters
if ( hasFilter( 'wpBootstrapBlocks.row.useOldObjectTemplateStructure' ) ) {
	console.warn(
		'`wpBootstrapBlocks.row.useOldObjectTemplateStructure` filter has no effect since the old template structure is not supported anymore. You can safely remove this filter.'
	);
}
