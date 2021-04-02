<?php
/**
 * Plugin Name: wp-bootstrap-blocks-test-container-filters
 * Description: [FOR TESTING PURPOSES ONLY] Plugin to test container filters.
 * Plugin URI: https://github.com/liip/bootstrap-blocks-wordpress-plugin
 * Author: Liip AG
 *
 * @package wp-bootstrap-blocks-test-container-filters
 */

/**
 * Registers a custom script for the plugin.
 */
function enqueue_container_filters_plugin_script() {
	wp_enqueue_script(
		'wp-bootstrap-blocks-test-container-filters',
		plugins_url( 'container-filters/index.js', __FILE__ ),
		array(
			'wp-hooks',
		),
		filemtime( plugin_dir_path( __FILE__ ) . 'container-filters/index.js' ),
		true
	);
}

add_action( 'init', 'enqueue_container_filters_plugin_script' );

/**
 * Filter default attributes.
 *
 * @param array $default_attributes Default attributes.
 *
 * @return array
 */
function container_filters_default_attributes( $default_attributes ) {
	$default_attributes['isFluid'] = true;
	$default_attributes['fluidBreakpoint'] = 'md';
	$default_attributes['marginAfter'] = 'mb-3';
	return $default_attributes;
}
add_filter( 'wp_bootstrap_blocks_container_default_attributes', 'container_filters_default_attributes', 10, 1 );
