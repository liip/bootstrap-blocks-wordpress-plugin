<?php
/**
 * Register render callback for bootstrap-blocks/container.
 *
 * @package bootstrap-blocks
 */

/**
 * Render callback for bootstrap-blocks/container block.
 *
 * @param array  $attributes Block attributes.
 * @param string $content HTML content of block.
 * @return string Rendered block.
 */
function bootstrap_blocks_container_render_callback( $attributes, $content ) {
	return bootstrap_blocks_get_template( 'container', $attributes, $content );
}

register_block_type(
	'bootstrap-blocks/container',
	array(
		'render_callback' => 'bootstrap_blocks_container_render_callback',
	)
);
