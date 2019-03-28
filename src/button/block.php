<?php
/**
 * Register render callback for wp-bootstrap-blocks/button.
 *
 * @package wp-bootstrap-blocks
 */

/**
 * Render callback for wp-bootstrap-blocks/button block.
 *
 * @param array  $attributes Block attributes.
 * @param string $content HTML content of block.
 * @return string Rendered block.
 */
function wp_bootstrap_blocks_button_render_callback( $attributes, $content ) {
	return wp_bootstrap_blocks_get_template( 'button', $attributes, $content );
}

register_block_type(
	'wp-bootstrap-blocks/button',
	array(
		'render_callback' => 'wp_bootstrap_blocks_button_render_callback',
	)
);
