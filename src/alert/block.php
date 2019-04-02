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
function wp_bootstrap_blocks_alert_render_callback( $attributes, $content ) {
	return wp_bootstrap_blocks_get_template( 'alert', $attributes, $content );
}

register_block_type(
	'wp-bootstrap-blocks/alert',
	array(
		'render_callback' => 'wp_bootstrap_blocks_alert_render_callback',
	)
);
