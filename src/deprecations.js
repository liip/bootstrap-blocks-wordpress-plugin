// WordPress dependencies
import { hasFilter } from '@wordpress/hooks';

// deprecated container filters
if ( hasFilter( 'wpBootstrapBlocks.container.customMarginOptions' ) ) {
	// eslint-disable-next-line no-console
	console.warn(
		'`wpBootstrapBlocks.container.customMarginOptions` filter was renamed to `wpBootstrapBlocks.container.marginAfterOptions`. Please change your filter definition.'
	);
}

if ( hasFilter( 'wpBootstrapBlocks.container.useFluidContainerPerDefault' ) ) {
	// eslint-disable-next-line no-console
	console.warn(
		'`wpBootstrapBlocks.container.useFluidContainerPerDefault` filter has been removed. Please use `wp_bootstrap_blocks_container_default_attributes` filter (PHP) instead.'
	);
}

// deprecated row filters
if ( hasFilter( 'wpBootstrapBlocks.row.useOldObjectTemplateStructure' ) ) {
	// eslint-disable-next-line no-console
	console.warn(
		'`wpBootstrapBlocks.row.useOldObjectTemplateStructure` filter has no effect since the old template structure is not supported anymore. You can safely remove this filter.'
	);
}
