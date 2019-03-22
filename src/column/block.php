<?php
/**
 * Register render callback for bootstrap-blocks/column.
 *
 * @package bootstrap-blocks
 */

/**
 * Render callback for bootstrap-blocks/column block.
 *
 * @param array  $attributes Block attributes.
 * @param string $content HTML content of block.
 * @return string Rendered block.
 */
function bootstrap_blocks_column_render_callback( $attributes, $content ) {
	return bootstrap_blocks_get_template( 'column', $attributes, $content );
}

register_block_type(
	'bootstrap-blocks/column',
	array(
		'render_callback' => 'bootstrap_blocks_column_render_callback',
	)
);
