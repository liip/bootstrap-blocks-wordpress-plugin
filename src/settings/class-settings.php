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
		 * Name of bootstrap version constant.
		 *
		 * @var string
		 */
		const BOOTSTRAP_VERSION_CONSTANT_NAME = 'WP_BOOTSTRAP_BLOCKS_BOOTSTRAP_VERSION';

		/**
		 * Default bootstrap version value.
		 *
		 * @var int
		 */
		const BOOTSTRAP_VERSION_DEFAULT_VALUE = 4;

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
		 * Settings constructor.
		 */
		public function __construct() {
			// Add settings page to menu
			add_action( 'admin_menu', array( $this, 'add_menu_item' ) );

			// Register plugin settings
			add_action( 'admin_init', array( $this, 'register_settings' ) );

			// Add settings link to plugin list table
			add_filter(
				'plugin_action_links_' . plugin_basename( WP_BOOTSTRAP_BLOCKS_PLUGIN_FILE ),
				array(
					$this,
					'add_settings_link',
				)
			);
		}

		/**
		 * Add settings page to admin menu.
		 */
		public function add_menu_item() {
			add_options_page( __( 'Bootstrap Blocks Settings', 'wp-bootstrap-blocks' ), __( 'Bootstrap Blocks', 'wp-bootstrap-blocks' ), 'manage_options', self::MENU_SLUG, array( $this, 'settings_page' ) );
		}

		/**
		 * Add settings link to plugin list table.
		 *
		 * @param  array $links Existing links.
		 *
		 * @return array Modified links
		 */
		public function add_settings_link( $links ) {
			$settings_link = '<a href="' . esc_url( admin_url( 'options-general.php?page=' . self::MENU_SLUG ) ) . '">' . esc_html__( 'Settings', 'wp-bootstrap-blocks' ) . '</a>';
			// add settings link as first element
			array_unshift( $links, $settings_link );

			return $links;
		}

		/**
		 * Register plugin settings.
		 */
		public function register_settings() {
			$section = 'default';

			$settings_fields = array(
				array(
					'id' => 'bootstrap_version',
					'label' => __( 'Bootstrap Version (experimental)', 'wp-bootstrap-blocks' ),
					'type' => 'select',
					'default' => self::BOOTSTRAP_VERSION_DEFAULT_VALUE,
					'options' => array(
						4 => '4.x',
						5 => '5.x',
					),
					'constant_name' => self::BOOTSTRAP_VERSION_CONSTANT_NAME,
				),
			);

			// Add section to page
			add_settings_section(
				$section,
				__( 'Main settings', 'wp-bootstrap-blocks' ),
				array(
					$this,
					'settings_section',
				),
				self::MENU_SLUG
			);

			foreach ( $settings_fields as $field ) {
				// Register field
				$option_name = self::OPTION_PREFIX . $field['id'];
				register_setting( self::MENU_SLUG, $option_name );

				// Add field to page
				add_settings_field(
					$field['id'],
					$field['label'],
					array(
						$this,
						'display_field',
					),
					self::MENU_SLUG,
					$section,
					array(
						'field' => $field,
						'prefix' => self::OPTION_PREFIX,
						'label_for' => $field['id'],
						'constant_name' => array_key_exists( 'constant_name', $field ) ? $field['constant_name'] : '',
						'disabled' => array_key_exists( 'disabled', $field ) ? $field['disabled'] : '',
					)
				);
			}
		}

		/**
		 * Print settings section.
		 *
		 * @param array $section Settings section.
		 */
		public function settings_section( $section ) {
		}

		/**
		 * Load settings page content.
		 */
		public function settings_page() {
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
		public function display_field( $data = array() ) {
			// Get field info
			if ( isset( $data['field'] ) ) {
				$field = $data['field'];
			} else {
				$field = $data;
			}

			// Check for prefix on option name
			$option_name = '';
			if ( isset( $data['prefix'] ) ) {
				$option_name = $data['prefix'];
			}

			// Get saved data
			$option_value = '';

			$option_name .= $field['id'];
			$is_option_constant_set = ! empty( $data['constant_name'] ) && defined( $data['constant_name'] );
			if ( $is_option_constant_set ) {
				$option = constant( $data['constant_name'] );
			} else {
				$option = get_option( $option_name );
			}

			// Get data to display in field
			if ( isset( $option ) ) {
				$option_value = $option;
			}

			// Show default data if no option saved and default is supplied
			if ( false === $option_value && isset( $field['default'] ) ) {
				$option_value = $field['default'];
			} elseif ( false === $option_value ) {
				$option_value = '';
			}

			$disabled = ( array_key_exists( 'disabled', $field ) ? $field['disabled'] : false );

			$html = '';

			switch ( $field['type'] ) {
				case 'text':
				case 'url':
				case 'email':
					$placeholder = ( array_key_exists( 'placeholder', $field ) ? $field['placeholder'] : '' );
					$html .= '<input id="' . esc_attr( $field['id'] ) . '" type="text" name="' . esc_attr( $option_name ) . '" class="' . ( ! empty( $data['constant_name'] ) && defined( $data['constant_name'] ) ? 'disabled' : '' ) . '" placeholder="' . esc_attr( $placeholder ) . '" value="' . esc_attr( $option_value ) . '" ' . disabled( ! empty( $data['constant_name'] ) && defined( $data['constant_name'] ), true, false ) . '/>' . "\n";
					break;

				case 'textarea':
					$placeholder = ( array_key_exists( 'placeholder', $field ) ? $field['placeholder'] : '' );
					$html .= '<textarea id="' . esc_attr( $field['id'] ) . '" rows="5" cols="50" name="' . esc_attr( $option_name ) . '" placeholder="' . esc_attr( $placeholder ) . '">' . $option_value . '</textarea><br/>' . "\n";
					break;

				case 'checkbox':
					$html .= '<input id="' . esc_attr( $field['id'] ) . '" type="' . esc_attr( $field['type'] ) . '" name="' . esc_attr( $option_name ) . '" class="' . ( $disabled ? 'disabled' : '' ) . '" value="1" ' . checked( '1', $option_value, false ) . ' ' . disabled( $disabled, true, false ) . '/>' . "\n";
					break;

				case 'radio':
					foreach ( $field['options'] as $k => $v ) {
						$html .= '<label for="' . esc_attr( $field['id'] . '_' . $k ) . '"><input type="radio" ' . checked( $k, $option_value, false ) . ' name="' . esc_attr( $option_name ) . '" value="' . esc_attr( $k ) . '" id="' . esc_attr( $field['id'] . '_' . $k ) . '" /> ' . $v . '</label> ';
					}
					break;

				case 'select':
					$html .= '<select name="' . esc_attr( $option_name ) . '" id="' . esc_attr( $field['id'] ) . '"' . disabled( ! empty( $data['constant_name'] ) && defined( $data['constant_name'] ), true, false ) . '>';
					foreach ( $field['options'] as $k => $v ) {
						$selected = false;
						if ( strval( $k ) === strval( $option_value ) ) {
							$selected = true;
						}
						$html .= '<option ' . selected( $selected, true, false ) . ' value="' . esc_attr( $k ) . '">' . $v . '</option>';
					}
					$html .= '</select>';
					break;
			}

			if ( array_key_exists( 'description', $field ) ) {
				switch ( $field['type'] ) {
					case 'radio':
						$html .= '<br/><span class="description">' . $field['description'] . '</span>';
						break;

					case 'checkbox':
						$html .= '<span class="description">' . $field['description'] . '</span>';
						break;

					default:
						$html .= '<div><span class="description">' . $field['description'] . '</span></div>' . "\n";
						break;
				}
			}

			if ( $is_option_constant_set ) {
				$html .= '<div class="constant-notice">' . sprintf(
					// translators: %s contains constant name
					esc_html_x(
						'Option disabled because %s constant is set.',
						'%s contains constant name',
						'wp-bootstrap-blocks'
					),
					esc_html( $data['constant_name'] )
				) . '</div>' . "\n";
			}

			// @codingStandardsIgnoreStart
			echo $html;
			// @codingStandardsIgnoreEnd
		}

		/**
		 * Get bootstrap version option.
		 *
		 * @return int
		 */
		public static function get_bootstrap_version() {
			return intval( self::get_option( 'bootstrap_version', self::BOOTSTRAP_VERSION_CONSTANT_NAME, self::BOOTSTRAP_VERSION_DEFAULT_VALUE ) );
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
			return defined( $constant_name ) ? constant( $constant_name ) : get_option( self::OPTION_PREFIX . $option_name, $default_value );
		}

	}
endif;
