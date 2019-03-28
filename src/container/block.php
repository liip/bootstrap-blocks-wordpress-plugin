<?php
/**
 * Register render callback for wp-bootstrap-blocks/container.
 *
 * @package wp-bootstrap-blocks
 */

/**
 * Render callback for wp-bootstrap-blocks/container block.
 *
 * @param array  $attributes Block attributes.
 * @param string $content HTML content of block.
 * @return string Rendered block.
 */
function wp_bootstrap_blocks_container_render_callback( $attributes, $content ) {
	return wp_bootstrap_blocks_get_template( 'container', $attributes, $content );
}

register_block_type(
	'wp-bootstrap-blocks/container',
	array(
		'render_callback' => 'wp_bootstrap_blocks_container_render_callback',
	)
);
