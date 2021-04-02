<?php
/**
 * Plugin Name: wp-bootstrap-blocks-test-button-filters
 * Description: [FOR TESTING PURPOSES ONLY] Plugin to test button filters.
 * Plugin URI: https://github.com/liip/bootstrap-blocks-wordpress-plugin
 * Author: Liip AG
 *
 * @package wp-bootstrap-blocks-test-button-filters
 */

/**
 * Registers a custom script for the plugin.
 */
function enqueue_button_filters_plugin_script() {
	wp_enqueue_script(
		'wp-bootstrap-blocks-test-button-filters',
		plugins_url( 'button-filters/index.js', __FILE__ ),
		array(
			'wp-hooks',
		),
		filemtime( plugin_dir_path( __FILE__ ) . 'button-filters/index.js' ),
		true
	);
}
add_action( 'init', 'enqueue_button_filters_plugin_script' );

/**
 * Filter default attributes.
 *
 * @param array $default_attributes Default attributes.
 *
 * @return array
 */
function button_filters_default_attributes( $default_attributes ) {
	$default_attributes['url'] = 'https://liip.ch';
	$default_attributes['linkTarget'] = '_blank';
	$default_attributes['rel'] = 'custom rel';
	$default_attributes['text'] = 'Liip';
	$default_attributes['style'] = 'secondary';
	$default_attributes['alignment'] = 'center';
	return $default_attributes;
}
add_filter( 'wp_bootstrap_blocks_button_default_attributes', 'button_filters_default_attributes', 10, 1 );
