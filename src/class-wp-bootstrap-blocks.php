<?php
/**
 * Main class
 *
 * @package wp-bootstrap-blocks
 */

namespace WP_Bootstrap_Blocks;

use WP_Bootstrap_Blocks\Button\Button_Block_Type;
use WP_Bootstrap_Blocks\Column\Column_Block_Type;
use WP_Bootstrap_Blocks\Container\Container_Block_Type;
use WP_Bootstrap_Blocks\Row\Row_Block_Type;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class WP_Bootstrap_Blocks
 */
class WP_Bootstrap_Blocks {

	/**
	 * WP_Bootstrap_Blocks instance.
	 *
	 * @var WP_Bootstrap_Blocks
	 */
	protected static $instance = null;

	/**
	 * The plugin version number.
	 *
	 * @var string
	 */
	public $version = '1.1.0';

	/**
	 * The plugin token.
	 *
	 * @var string
	 */
	public $token = 'wp-bootstrap-blocks';

	/**
	 * The plugin assets directory.
	 *
	 * @var string
	 */
	public $assets_dir;

	/**
	 * The plugin assets URL.
	 *
	 * @var string
	 */
	public $assets_url;

	/**
	 * WP_Bootstrap_Blocks constructor.
	 */
	public function __construct() {
		$this->define_constants();
		$this->init_plugin_environment();
		$this->includes();
		$this->init_hooks();
		$this->register_block_types();
	}

	/**
	 * Define plugin constants.
	 */
	protected function define_constants() {
		if ( ! defined( 'WP_BOOTSTRAP_BLOCKS_ABSPATH' ) ) {
			define( 'WP_BOOTSTRAP_BLOCKS_ABSPATH', trailingslashit( dirname( WP_BOOTSTRAP_BLOCKS_PLUGIN_FILE ) ) );
		}
	}

	/**
	 * Initializes plugin environment variables
	 */
	protected function init_plugin_environment() {
		// Load plugin environment variables
		$this->assets_dir = WP_BOOTSTRAP_BLOCKS_ABSPATH . 'dist';
		$this->assets_url = esc_url( trailingslashit( plugins_url( '/dist/', WP_BOOTSTRAP_BLOCKS_PLUGIN_FILE ) ) );
	}

	/**
	 * Include required core files.
	 */
	public function includes() {
		// Load plugin class files
		require_once WP_BOOTSTRAP_BLOCKS_ABSPATH . 'src/wp-bootstrap-blocks-functions.php';
		require_once WP_BOOTSTRAP_BLOCKS_ABSPATH . 'src/class-block-type.php';
		require_once WP_BOOTSTRAP_BLOCKS_ABSPATH . 'src/container/class-container-block-type.php';
		require_once WP_BOOTSTRAP_BLOCKS_ABSPATH . 'src/row/class-row-block-type.php';
		require_once WP_BOOTSTRAP_BLOCKS_ABSPATH . 'src/column/class-column-block-type.php';
		require_once WP_BOOTSTRAP_BLOCKS_ABSPATH . 'src/button/class-button-block-type.php';
	}

	/**
	 * Initializes hooks.
	 */
	protected function init_hooks() {
		// Hook: Frontend assets.
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_block_assets' ) );

		// Hook: Editor assets.
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ) );

		// Register custom block category
		add_filter( 'block_categories', array( $this, 'register_custom_block_category' ), 10, 2 );

		// Load textdomain
		add_action( 'plugins_loaded', array( $this, 'load_plugin_textdomain' ) );

		// check version number on each request
		add_action( 'init', array( $this, 'check_version' ) );
	}

	/**
	 * Load frontend block assets.
	 */
	public function enqueue_block_assets() {
		$enqueue_block_assets = apply_filters( 'wp_bootstrap_blocks_enqueue_block_assets', true );
		if ( ! $enqueue_block_assets ) {
			return;
		}

		// Styles.
		wp_enqueue_style(
			$this->token . '-styles', // Handle.
			esc_url( $this->assets_url ) . 'blocks.style.build.css', // Block style CSS.
			array(),
			$this->version
		);
	}

	/**
	 * Load editor block assets.
	 */
	public function enqueue_block_editor_assets() {
		// Scripts.
		wp_enqueue_script(
			$this->token . '-js', // Handle.
			esc_url( $this->assets_url ) . 'blocks.build.js', // block.build.js: We register the block here. Built with Webpack.
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
			$this->version,
			true // Enqueue the script in the footer.
		);

		// Styles.
		wp_enqueue_style(
			$this->token . '-editor-styles', // Handle.
			esc_url( $this->assets_url ) . 'blocks.editor.build.css', // Block editor CSS.
			array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
			$this->version
		);
	}

	/**
	 * Register custom block category
	 *
	 * @param array    $categories List of all registered categories.
	 * @param \WP_Post $post    Current post object.
	 *
	 * @return array
	 */
	public function register_custom_block_category( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug' => 'wp-bootstrap-blocks',
					'title' => __( 'Bootstrap Blocks', 'wp-bootstrap-blocks' ),
				),
			)
		);
	}

	/**
	 * Load plugin textdomain
	 */
	public function load_plugin_textdomain() {
		$domain = 'wp-bootstrap-blocks'; // textdomain can't be stored in class variable since it must be a single string literal
		load_plugin_textdomain( $domain, false, dirname( plugin_basename( WP_BOOTSTRAP_BLOCKS_PLUGIN_FILE ) ) . '/languages/' );
	}

	/**
	 * Register block types
	 */
	public function register_block_types() {
		new Container_Block_Type();
		new Row_Block_Type();
		new Column_Block_Type();
		new Button_Block_Type();
	}

	/**
	 * Main WP_Bootstrap_Blocks Instance
	 * Ensures only one instance of WP_Bootstrap_Blocks is loaded or can be loaded.
	 *
	 * @return WP_Bootstrap_Blocks Plugin instance
	 */
	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Cloning is forbidden.
	 */
	public function __clone() {
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?' ), esc_attr( $this->version ) );
	}

	/**
	 * Unserializing instances of this class is forbidden.
	 */
	public function __wakeup() {
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?' ), esc_attr( $this->version ) );
	}

	/**
	 * Checks plugin version.
	 *
	 * This check is done on all requests and runs if the versions do not match.
	 */
	public function check_version() {
		if ( ! defined( 'IFRAME_REQUEST' ) && get_option( $this->token . '_version' ) !== $this->version ) {
			$this->log_version_number();
			do_action( $this->token . '_updated' );
		}
	}

	/**
	 * Log the plugin version number in database.
	 */
	protected function log_version_number() {
		delete_option( $this->token . '_version' );
		update_option( $this->token . '_version', $this->version );
	}

}
