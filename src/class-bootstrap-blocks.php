<?php
/**
 * Main class
 *
 * @package bootstrap-blocks
 */

namespace Bootstrap_Blocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Bootstrap_Blocks
 */
class Bootstrap_Blocks {

	/**
	 * Bootstrap_Blocks instance.
	 *
	 * @var Bootstrap_Blocks
	 */
	protected static $instance = null;

	/**
	 * The plugin version number.
	 *
	 * @var string
	 */
	public $version = '1.0.0';

	/**
	 * The plugin token.
	 *
	 * @var string
	 */
	public $token = 'bootstrap-blocks';

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
	 * Bootstrap_Blocks constructor.
	 */
	public function __construct() {
		$this->define_constants();
		$this->init_plugin_environment();
		$this->includes();
		$this->init_hooks();
	}

	/**
	 * Define plugin constants.
	 */
	protected function define_constants() {
		if ( ! defined( 'BOOTSTRAP_BLOCKS_ABSPATH' ) ) {
			define( 'BOOTSTRAP_BLOCKS_ABSPATH', trailingslashit( dirname( BOOTSTRAP_BLOCKS_PLUGIN_FILE ) ) );
		}
	}

	/**
	 * Initializes plugin environment variables
	 */
	protected function init_plugin_environment() {
		// Load plugin environment variables
		$this->assets_dir = BOOTSTRAP_BLOCKS_ABSPATH . 'dist';
		$this->assets_url = esc_url( trailingslashit( plugins_url( '/dist/', BOOTSTRAP_BLOCKS_PLUGIN_FILE ) ) );
	}

	/**
	 * Include required core files.
	 */
	public function includes() {
		// Load plugin class files
		require_once BOOTSTRAP_BLOCKS_ABSPATH . 'src/bootstrap-blocks-functions.php';
		require_once BOOTSTRAP_BLOCKS_ABSPATH . 'src/container/block.php';
		require_once BOOTSTRAP_BLOCKS_ABSPATH . 'src/row/block.php';
		require_once BOOTSTRAP_BLOCKS_ABSPATH . 'src/column/block.php';
		require_once BOOTSTRAP_BLOCKS_ABSPATH . 'src/button/block.php';
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
		// Styles.
		wp_enqueue_style(
			$this->token . '-styles', // Handle.
			esc_url( $this->assets_url ) . 'blocks.style.build.css', // Block style CSS.
			array( 'wp-editor' ), // Dependency to include the CSS after it.
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
					'slug' => 'bootstrap-blocks',
					'title' => __( 'Bootstrap Blocks', 'bootstrap-blocks' ),
				),
			)
		);
	}

	/**
	 * Load plugin textdomain
	 */
	public function load_plugin_textdomain() {
		$domain = 'bootstrap-blocks'; // textdomain can't be stored in class variable since it must be a single string literal
		load_plugin_textdomain( $domain, false, dirname( plugin_basename( BOOTSTRAP_BLOCKS_PLUGIN_FILE ) ) . '/languages/' );
	}

	/**
	 * Main Bootstrap_Blocks Instance
	 * Ensures only one instance of Bootstrap_Blocks is loaded or can be loaded.
	 *
	 * @return Bootstrap_Blocks Plugin instance
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
