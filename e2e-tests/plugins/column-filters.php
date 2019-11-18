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
