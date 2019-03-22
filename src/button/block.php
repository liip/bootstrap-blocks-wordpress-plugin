<?php
/**
 * Register render callback for bootstrap-blocks/button.
 *
 * @package bootstrap-blocks
 */

/**
 * Render callback for bootstrap-blocks/button block.
 *
 * @param array  $attributes Block attributes.
 * @param string $content HTML content of block.
 * @return string Rendered block.
 */
function bootstrap_blocks_button_render_callback( $attributes, $content ) {
	return bootstrap_blocks_get_template( 'button', $attributes, $content );
}

register_block_type(
	'bootstrap-blocks/button',
	array(
		'render_callback' => 'bootstrap_blocks_button_render_callback',
	)
);
