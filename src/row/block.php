<?php
/**
 * Register render callback for wp-bootstrap-blocks/row.
 *
 * @package wp-bootstrap-blocks
 */

/**
 * Render callback for wp-bootstrap-blocks/row block.
 *
 * @param array  $attributes Block attributes.
 * @param string $content HTML content of block.
 * @return string Rendered block.
 */
function wp_bootstrap_blocks_row_render_callback( $attributes, $content ) {
	return wp_bootstrap_blocks_get_template( 'row', $attributes, $content );
}

register_block_type(
	'wp-bootstrap-blocks/row',
	array(
		'render_callback' => 'wp_bootstrap_blocks_row_render_callback',
	)
);
