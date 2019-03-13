<?php
/**
 * Plugin Name: Bootstrap Blocks
 * Plugin URI: https://liip.ch
 * Description: Bootstrap Blocks - Bootstrap 4 Gutenberg Block library for WordPress.
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

// Include the main BootstrapBlocks class.
if ( ! class_exists( \BootstrapBlocks\BootstrapBlocks::class ) ) {
	require_once plugin_dir_path( BOOTSTRAP_BLOCKS_PLUGIN_FILE ) . 'src/class-bootstrap-blocks.php';
}

// Initialize plugin
\BootstrapBlocks\BootstrapBlocks::instance();
