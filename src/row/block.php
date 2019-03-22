<?php
/**
 * Register render callback for bootstrap-blocks/row.
 *
 * @package bootstrap-blocks
 */

/**
 * Render callback for bootstrap-blocks/row block.
 *
 * @param array  $attributes Block attributes.
 * @param string $content HTML content of block.
 * @return string Rendered block.
 */
function bootstrap_blocks_row_render_callback( $attributes, $content ) {
	return bootstrap_blocks_get_template( 'row', $attributes, $content );
}

register_block_type(
	'bootstrap-blocks/row',
	array(
		'render_callback' => 'bootstrap_blocks_row_render_callback',
	)
);
