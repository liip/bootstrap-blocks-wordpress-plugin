<?php
/**
 * WP_Bootstrap_Blocks settings page
 *
 * @package wp-bootstrap-blocks
 */

namespace WP_Bootstrap_Blocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


if ( ! class_exists( '\WP_Bootstrap_Blocks\Settings', false ) ) :
	/**
	 * Class Settings
	 */
	class Settings {

		/**
		 * Prefix for plugin settings.
		 *
		 * @var string
		 */
		const OPTION_PREFIX = 'wp-bootstrap-blocks_';

		/**
		 * Menu slug.
		 *
		 * @var string
		 */
		const MENU_SLUG = 'wp-bootstrap-blocks_settings';

		/**
		 * Name of bootstrap version constant.
		 *
		 * @var string
		 */
		const BOOTSTRAP_VERSION_CONSTANT_NAME = 'WP_BOOTSTRAP_BLOCKS_BOOTSTRAP_VERSION';

		/**
		 * Name of bootstrap version option.
		 *
		 * @var string
		 */
		const BOOTSTRAP_VERSION_OPTION_NAME = self::OPTION_PREFIX . 'bootstrap_version';

		/**
		 * Default bootstrap version value.
		 *
		 * @var int
		 */
		const BOOTSTRAP_VERSION_DEFAULT_VALUE = '4';

		/**
		 * Name of enable CSS grid constant.
		 *
		 * @var string
		 */
		const ENABLE_CSS_GRID_CONSTANT_NAME = 'WP_BOOTSTRAP_BLOCKS_ENABLE_CSS_GRID';

		/**
		 * Name of enable CSS grid option.
		 *
		 * @var string
		 */
		const ENABLE_CSS_GRID_OPTION_NAME = self::OPTION_PREFIX . 'enable_css_grid';

		/**
		 * Default enable CSS grid value.
		 *
		 * @var boolean
		 */
		const ENABLE_CSS_GRID_DEFAULT_VALUE = false;

		/**
		 * The plugin assets directory.
		 *
		 * @var string
		 */
		public static $assets_dir = '';

		/**
		 * The plugin assets URL.
		 *
		 * @var string
		 */
		public static $assets_url = '';

		/**
		 * True if settings are already initialized.
		 *
		 * @var bool
		 */
		private static $initialized = false;

		/**
		 * Settings constructor.
		 *
		 * @param string $assets_dir The plugin assets directory.
		 * @param string $assets_url The plugin assets URL.
		 */
		public static function init( $assets_dir, $assets_url ) {
			if ( ! self::$initialized ) {
				self::$assets_dir = $assets_dir;
				self::$assets_url = $assets_url;

				// Add settings page to menu
				add_action( 'admin_menu', array( __CLASS__, 'add_menu_item' ) );

				// Register plugin settings
				add_action( 'admin_init', array( __CLASS__, 'register_settings' ) );

				// Add settings link to plugin list table
				add_filter(
					'plugin_action_links_' . plugin_basename( WP_BOOTSTRAP_BLOCKS_PLUGIN_FILE ),
					array(
						__CLASS__,
						'add_settings_link',
					)
				);

				// Filter saving of bootstrap version
				add_filter( 'pre_update_option_' . self::BOOTSTRAP_VERSION_OPTION_NAME, array( __CLASS__, 'pre_update_option_bootstrap_version' ), 10, 2 );

				// Filter saving of enable css grid option
				add_filter( 'pre_update_option_' . self::ENABLE_CSS_GRID_OPTION_NAME, array( __CLASS__, 'pre_update_option_css_grid_enabled' ), 10, 2 );

				// Enqueue settings stylesheet
				add_action( 'admin_enqueue_scripts', array( __CLASS__, 'enqueue_styles' ) );

				self::$initialized = true;
			}
		}

		/**
		 * Enqueue settings specific styles.
		 *
		 * @param string $hook Hook of current screen.
		 */
		public static function enqueue_styles( $hook ) {
			if ( 'settings_page_' . self::MENU_SLUG !== $hook ) {
				return;
			}

			$settings_styles_path = self::$assets_dir . 'settings.css';
			$settings_styles_url = esc_url( self::$assets_url ) . 'settings.css';
			$settings_asset_file = self::$assets_dir . 'settings.asset.php';
			$settings_asset = file_exists( $settings_asset_file )
				? require_once $settings_asset_file
				: null;
			$settings_version = isset( $settings_asset['version'] ) ? $settings_asset['version'] : filemtime( $settings_styles_path );

			wp_register_style( self::MENU_SLUG . '_styles', $settings_styles_url, false, $settings_version );
			wp_enqueue_style( self::MENU_SLUG . '_styles' );
		}

		/**
		 * Add settings page to admin menu.
		 */
		public static function add_menu_item() {
			add_options_page( __( 'Bootstrap Blocks Settings', 'wp-bootstrap-blocks' ), __( 'Bootstrap Blocks', 'wp-bootstrap-blocks' ), 'manage_options', self::MENU_SLUG, array( __CLASS__, 'settings_page' ) );
		}

		/**
		 * Add settings link to plugin list table.
		 *
		 * @param  array $links Existing links.
		 *
		 * @return array Modified links
		 */
		public static function add_settings_link( $links ) {
			$settings_link = '<a href="' . esc_url( admin_url( 'options-general.php?page=' . self::MENU_SLUG ) ) . '">' . esc_html__( 'Settings', 'wp-bootstrap-blocks' ) . '</a>';
			// add settings link as first element
			array_unshift( $links, $settings_link );

			return $links;
		}

		/**
		 * Register plugin settings.
		 */
		public static function register_settings() {
			$section = 'default';

			$settings_fields = array(
				array(
					'option_name' => self::BOOTSTRAP_VERSION_OPTION_NAME,
					'label' => __( 'Bootstrap Version', 'wp-bootstrap-blocks' ),
					'description' => __( 'Depending on the selected Bootstrap version the blocks will be rendered accordingly and version specific features will be available in the editor.', 'wp-bootstrap-blocks' ),
					'type' => 'select',
					'default' => self::BOOTSTRAP_VERSION_DEFAULT_VALUE,
					'options' => array(
						'4' => '4.x',
						'5' => '5.x',
					),
					'constant_name' => self::BOOTSTRAP_VERSION_CONSTANT_NAME,
					'disabled' => false,
				),
				array(
					'option_name' => self::ENABLE_CSS_GRID_OPTION_NAME,
					'label' => __( 'Enable CSS grid (Experimental)', 'wp-bootstrap-blocks' ),
					'description' => __( 'If enabled Bootstrap\'s CSS grid will be used instead of the default flexbox grid system. The CSS grid is supported with Bootstrap >= 5.1.0. The `$enable-cssgrid` Bootstrap setting has to be set to `true` if this option is enabled.', 'wp-bootstrap-blocks' ),
					'type' => 'checkbox',
					'default' => self::ENABLE_CSS_GRID_DEFAULT_VALUE,
					'constant_name' => self::ENABLE_CSS_GRID_CONSTANT_NAME,
					'disabled' => ! self::is_bootstrap_5_active(),
				),
			);

			// Add section to page
			add_settings_section(
				$section,
				__( 'Main settings', 'wp-bootstrap-blocks' ),
				array(
					__CLASS__,
					'settings_section',
				),
				self::MENU_SLUG
			);

			foreach ( $settings_fields as $field ) {
				// Register field
				register_setting( self::MENU_SLUG, $field['option_name'] );

				$field_args = array(
					'field' => $field,
				);
				// add label_for argument to all fields which haven't an additional label
				if ( 'radio' !== $field['type'] ) {
					$field_args['label_for'] = $field['option_name'];
				}

				// Add field to page
				add_settings_field(
					$field['option_name'],
					$field['label'],
					array(
						__CLASS__,
						'display_field',
					),
					self::MENU_SLUG,
					$section,
					$field_args
				);
			}
		}

		/**
		 * Print settings section.
		 *
		 * @param array $section Settings section.
		 */
		public static function settings_section( $section ) {
		}

		/**
		 * Load settings page content.
		 */
		public static function settings_page() {
			if ( ! current_user_can( 'manage_options' ) ) {
				wp_die( esc_html__( 'You do not have sufficient permissions to access this page.', 'wp-bootstrap-blocks' ) );
			}
			?>
			<div class="wrap" id="<?php echo esc_attr( self::MENU_SLUG ); ?>">
				<h1><?php esc_html_e( 'Bootstrap Blocks Settings', 'wp-bootstrap-blocks' ); ?></h1>

				<form method="post" action="options.php" enctype="multipart/form-data">
					<?php
					// Get settings fields
					settings_fields( self::MENU_SLUG );
					do_settings_sections( self::MENU_SLUG );
					submit_button();
					?>
				</form>

			</div><!--end #wrap -->
			<?php
		}

		/**
		 * Generate HTML for displaying fields
		 *
		 * @param array $data Additional data which is added in add_settings_field() method.
		 */
		public static function display_field( $data = array() ) {
			// Get field info
			if ( ! isset( $data['field'] ) ) {
				_doing_it_wrong( __FUNCTION__, esc_html__( 'Field data missing.', 'wp-bootstrap-blocks' ), esc_attr( WP_Bootstrap_Blocks::$version ) );
			}

			$field = $data['field'];

			$is_option_constant_set = ! empty( $field['constant_name'] ) && defined( $field['constant_name'] );
			if ( $is_option_constant_set ) {
				$option_value = constant( $field['constant_name'] );
				$disabled = true;
			} else {
				if ( isset( $field['default'] ) ) {
					$option_value = get_option( $field['option_name'], $field['default'] );
				} else {
					$option_value = get_option( $field['option_name'], '' );
				}
				$disabled = array_key_exists( 'disabled', $field ) ? $field['disabled'] : false;
			}

			$placeholder = ( array_key_exists( 'placeholder', $field ) ? $field['placeholder'] : '' );
			$html = '';

			switch ( $field['type'] ) {
				case 'text':
				case 'url':
				case 'email':
					$html .= '<input id="' . esc_attr( $field['option_name'] ) . '" type="text" name="' . esc_attr( $field['option_name'] ) . '" placeholder="' . esc_attr( $placeholder ) . '" value="' . esc_attr( $option_value ) . '" ' . disabled( $disabled, true, false ) . '/>' . "\n";
					break;

				case 'textarea':
					$html .= '<textarea id="' . esc_attr( $field['option_name'] ) . '" rows="5" cols="50" name="' . esc_attr( $field['option_name'] ) . '" placeholder="' . esc_attr( $placeholder ) . '" ' . disabled( $disabled, true, false ) . '>' . $option_value . '</textarea>' . "\n";
					break;

				case 'checkbox':
					$html .= '<input id="' . esc_attr( $field['option_name'] ) . '" type="checkbox" name="' . esc_attr( $field['option_name'] ) . '" value="1" ' . checked( '1', $option_value, false ) . ' ' . disabled( $disabled, true, false ) . '/>' . "\n";
					break;

				case 'radio':
					foreach ( $field['options'] as $k => $v ) {
						$html .= '<p><label for="' . esc_attr( $field['option_name'] . '_' . $k ) . '"><input type="radio" id="' . esc_attr( $field['option_name'] . '_' . $k ) . '" name="' . esc_attr( $field['option_name'] ) . '" value="' . esc_attr( $k ) . '" ' . checked( strval( $k ), strval( $option_value ), false ) . ' ' . disabled( $disabled, true, false ) . ' /> ' . $v . '</label></p>' . "\n";
					}
					break;

				case 'select':
					$html .= '<select name="' . esc_attr( $field['option_name'] ) . '" id="' . esc_attr( $field['option_name'] ) . '"' . disabled( $disabled, true, false ) . '>' . "\n";
					foreach ( $field['options'] as $k => $v ) {
						$html .= '<option ' . selected( strval( $k ), strval( $option_value ), false ) . ' value="' . esc_attr( $k ) . '">' . $v . '</option>' . "\n";
					}
					$html .= '</select>' . "\n";
					break;
			}

			if ( array_key_exists( 'description', $field ) ) {
				$html .= '<p class="description">' . esc_html( $field['description'] ) . '</p>' . "\n";
			}

			if ( $is_option_constant_set ) {
				$html .= '<p class="description constant-notice">' .
					sprintf(
						// translators: %s contains constant name
						esc_html_x(
							'Option is defined in the following constant: %s',
							'%s contains constant name',
							'wp-bootstrap-blocks'
						),
						'<code>' . esc_html( $field['constant_name'] ) . '</code>'
					) . '</p>' . "\n";
			}

			// @codingStandardsIgnoreStart
			echo $html;
			// @codingStandardsIgnoreEnd
		}

		/**
		 * Always use constant value for bootstrap version if set.
		 *
		 * @param string $new_value The new, unserialized option value.
		 * @param string $old_value The old option value.
		 *
		 * @return string
		 */
		public static function pre_update_option_bootstrap_version( $new_value, $old_value ) {
			return defined( self::BOOTSTRAP_VERSION_CONSTANT_NAME ) ? strval( constant( self::BOOTSTRAP_VERSION_CONSTANT_NAME ) ) : $new_value;
		}

		/**
		 * Only enable CSS grid if bootstrap version is >= 5 and always use constant value if set.
		 *
		 * @param string $new_value The new, unserialized option value.
		 * @param string $old_value The old option value.
		 *
		 * @return string
		 */
		public static function pre_update_option_css_grid_enabled( $new_value, $old_value ) {
			return self::is_bootstrap_5_active()
				? defined( self::ENABLE_CSS_GRID_CONSTANT_NAME ) ? boolval( constant( self::ENABLE_CSS_GRID_CONSTANT_NAME ) ) : $new_value
				: false;
		}

		/**
		 * Get bootstrap version option.
		 *
		 * @return string Bootstrap version from options.
		 */
		public static function get_bootstrap_version() {
			return strval( self::get_option( self::BOOTSTRAP_VERSION_OPTION_NAME, self::BOOTSTRAP_VERSION_CONSTANT_NAME, self::BOOTSTRAP_VERSION_DEFAULT_VALUE ) );
		}

		/**
		 * Returns true when Bootstrap 5 is activated.
		 *
		 * @return bool
		 */
		public static function is_bootstrap_5_active() {
			return version_compare( self::get_bootstrap_version(), '5', '>=' );
		}

		/**
		 * Get enable CSS grid option.
		 *
		 * @return boolean Enable CSS grid value from options.
		 */
		public static function is_css_grid_enabled() {
			return self::is_bootstrap_5_active() && boolval( self::get_option( self::ENABLE_CSS_GRID_OPTION_NAME, self::ENABLE_CSS_GRID_CONSTANT_NAME, self::ENABLE_CSS_GRID_DEFAULT_VALUE ) );
		}

		/**
		 * Get option value in the following order:
		 * - from constant if defined
		 * - from database
		 * - default value
		 *
		 * @param string $option_name Name of option.
		 * @param string $constant_name Name of constant.
		 * @param mixed  $default_value Default value if option is not set.
		 *
		 * @return mixed
		 */
		public static function get_option( $option_name, $constant_name, $default_value ) {
			return defined( $constant_name ) ? constant( $constant_name ) : get_option( $option_name, $default_value );
		}

	}
endif;
