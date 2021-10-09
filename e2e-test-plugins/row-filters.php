<?php
/**
 * Plugin Name: wp-bootstrap-blocks-test-row-filters
 * Description: [FOR TESTING PURPOSES ONLY] Plugin to test row filters.
 * Plugin URI: https://github.com/liip/bootstrap-blocks-wordpress-plugin
 * Author: Liip AG
 *
 * @package wp-bootstrap-blocks-test-row-filters
 */

/**
 * Registers a custom script for the plugin.
 */
function enqueue_row_filters_plugin_script() {
	wp_enqueue_script(
		'wp-bootstrap-blocks-test-row-filters',
		plugins_url( 'row-filters/index.js', __FILE__ ),
		array(
			'wp-hooks',
		),
		filemtime( plugin_dir_path( __FILE__ ) . 'row-filters/index.js' ),
		true
	);
}
add_action( 'init', 'enqueue_row_filters_plugin_script' );

/**
 * Filter default attributes.
 *
 * @param array $default_attributes Default attributes.
 *
 * @return array
 */
function row_filters_default_attributes( $default_attributes ) {
	$default_attributes['template'] = '1-2';
	$default_attributes['noGutters'] = true;
	$default_attributes['alignment'] = 'right';
	$default_attributes['verticalAlignment'] = 'bottom';
	$default_attributes['editorStackColumns'] = true;
	$default_attributes['horizontalGutters'] = 'gx-5';
	$default_attributes['verticalGutters'] = 'gy-3';
	$default_attributes['cssGridGutters'] = '1rem';
	return $default_attributes;
}
add_filter( 'wp_bootstrap_blocks_row_default_attributes', 'row_filters_default_attributes', 10, 1 );
