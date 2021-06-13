<?php
/**
 * Plugin Name: wp-bootstrap-blocks-test-column-filters
 * Description: [FOR TESTING PURPOSES ONLY] Plugin to test column filters.
 * Plugin URI: https://github.com/liip/bootstrap-blocks-wordpress-plugin
 * Author: Liip AG
 *
 * @package wp-bootstrap-blocks-test-column-filters
 */

/**
 * Registers a custom script for the plugin.
 */
function enqueue_column_filters_plugin_script() {
	wp_enqueue_script(
		'wp-bootstrap-blocks-test-column-filters',
		plugins_url( 'column-filters/index.js', __FILE__ ),
		array(
			'wp-hooks',
		),
		filemtime( plugin_dir_path( __FILE__ ) . 'column-filters/index.js' ),
		true
	);
}

add_action( 'init', 'enqueue_column_filters_plugin_script' );

/**
 * Filter default attributes.
 *
 * @param array $default_attributes Default attributes.
 *
 * @return array
 */
function column_filters_default_attributes( $default_attributes ) {
	$default_attributes['sizeXxl'] = 5;
	$default_attributes['sizeXl'] = 0;
	$default_attributes['sizeLg'] = 10;
	$default_attributes['sizeMd'] = 8;
	$default_attributes['sizeSm'] = 6;
	$default_attributes['sizeXs'] = 4;
	$default_attributes['equalWidthXl'] = true;
	$default_attributes['bgColor'] = 'primary';
	$default_attributes['padding'] = 'p-3';
	$default_attributes['contentVerticalAlignment'] = 'bottom';
	return $default_attributes;
}
add_filter( 'wp_bootstrap_blocks_column_default_attributes', 'column_filters_default_attributes', 10, 1 );
