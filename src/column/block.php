<?php
/**
 * Register render callback for wp-bootstrap-blocks/column.
 *
 * @package wp-bootstrap-blocks
 */

/**
 * Render callback for wp-bootstrap-blocks/column block.
 *
 * @param array  $attributes Block attributes.
 * @param string $content HTML content of block.
 * @return string Rendered block.
 */
function wp_bootstrap_blocks_column_render_callback( $attributes, $content ) {
	return wp_bootstrap_blocks_get_template( 'column', $attributes, $content );
}

register_block_type(
	'wp-bootstrap-blocks/column',
	array(
		'render_callback' => 'wp_bootstrap_blocks_column_render_callback',
	)
);
