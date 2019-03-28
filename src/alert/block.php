<?php
/**
 * Register render callback for bootstrap-blocks/alert.
 *
 * @package bootstrap-blocks
 */

/**
 * Render callback for bootstrap-blocks/alert block.
 *
 * @param array  $attributes Block attributes.
 * @param string $content HTML content of block.
 * @return string Rendered block.
 */
function bootstrap_blocks_alert_render_callback( $attributes, $content ) {
	return bootstrap_blocks_get_template( 'alert', $attributes, $content );
}

register_block_type(
	'bootstrap-blocks/alert',
	array(
		'render_callback' => 'bootstrap_blocks_alert_render_callback',
	)
);
