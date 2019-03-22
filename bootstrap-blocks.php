<?php
/**
 * Plugin Name: Bootstrap Blocks
 * Plugin URI: https://github.com/liip/bootstrap-blocks-wordpress-plugin
 * Description: Bootstrap 4 Gutenberg Blocks for WordPress.
 * Author: Team Jazz, Liip AG
 * Author URI: https://liip.ch
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: bootstrap-blocks
 * Domain Path: /languages/
 *
 * @package bootstrap-blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define BOOTSTRAP_BLOCKS_PLUGIN_FILE.
if ( ! defined( 'BOOTSTRAP_BLOCKS_PLUGIN_FILE' ) ) {
	define( 'BOOTSTRAP_BLOCKS_PLUGIN_FILE', __FILE__ );
}

// Include the main Bootstrap_Blocks class.
if ( ! class_exists( \Bootstrap_Blocks\Bootstrap_Blocks::class ) ) {
	require_once plugin_dir_path( BOOTSTRAP_BLOCKS_PLUGIN_FILE ) . 'src/class-bootstrap-blocks.php';
}

// Initialize plugin
\Bootstrap_Blocks\Bootstrap_Blocks::instance();
