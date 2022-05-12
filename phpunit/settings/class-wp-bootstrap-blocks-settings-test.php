<?php
/**
 * Settings tests.
 *
 * @package wp-bootstrap-blocks
 */

use \WP_Bootstrap_Blocks\Settings;

/**
 * Class WP_Bootstrap_Blocks_Settings_Test
 */
class WP_Bootstrap_Blocks_Settings_Test extends WP_UnitTestCase {
	/**
	 * Tests get_bootstrap_version() helper function. Version value gets fetched in the following order:
	 * 1. Constant value
	 * 2. Option value
	 * 3. Default value
	 *
	 * This test must run in a separate process as it defines constants!
	 *
	 * @runInSeparateProcess
	 * @preserveGlobalState disabled
	 */
	public function test_get_bootstrap_version() {
		// Default value should be returned if option is not is set.
		$bootstrap_version_default_value = Settings::get_bootstrap_version();
		$this->assertEquals( Settings::BOOTSTRAP_VERSION_DEFAULT_VALUE, $bootstrap_version_default_value );

		// Option value should be returned if option is set and constant is not set.
		$option_value = '5';
		update_option( Settings::BOOTSTRAP_VERSION_OPTION_NAME, $option_value );
		$bootstrap_version_option_value = Settings::get_bootstrap_version();
		$this->assertEquals( $option_value, $bootstrap_version_option_value );

		// Constant value should be returned if constant is set.
		$constant_value = '4';
		define( Settings::BOOTSTRAP_VERSION_CONSTANT_NAME, $constant_value );
		$bootstrap_version_constant_value = Settings::get_bootstrap_version();
		$this->assertEquals( $constant_value, $bootstrap_version_constant_value );
	}

	/**
	 * Tests test_is_bootstrap_5_active() helper function.
	 */
	public function test_is_bootstrap_5_active() {
		// Bootstrap 5 shouldn't be active by default
		$this->assertEquals( false, Settings::is_bootstrap_5_active() );

		// Should be true if Bootstrap version 5 is selected in option.
		update_option( Settings::BOOTSTRAP_VERSION_OPTION_NAME, '5' );
		$this->assertEquals( true, Settings::is_bootstrap_5_active() );

		// Should be true if Bootstrap version is higher than 5. (even if there is no option for this right now)
		update_option( Settings::BOOTSTRAP_VERSION_OPTION_NAME, '5.5' );
		$this->assertEquals( true, Settings::is_bootstrap_5_active() );
		update_option( Settings::BOOTSTRAP_VERSION_OPTION_NAME, '6.9.0-beta' );
		$this->assertEquals( true, Settings::is_bootstrap_5_active() );

		// Should be false if Bootstrap version is lower than 4. (even if there is no option for this right now)
		update_option( Settings::BOOTSTRAP_VERSION_OPTION_NAME, '3.5.1' );
		$this->assertEquals( false, Settings::is_bootstrap_5_active() );
	}

	/**
	 * Tests pre_update_option_bootstrap_version() filter. Option should be saved to constant value if set.
	 *
	 * This test must run in a separate process as it defines constants!
	 *
	 * @runInSeparateProcess
	 * @preserveGlobalState disabled
	 */
	public function test_pre_update_option_bootstrap_version() {
		// Option value should be set if constant is not set
		$option_value = '5';
		update_option( Settings::BOOTSTRAP_VERSION_OPTION_NAME, $option_value );
		$bootstrap_version_option_value = get_option( Settings::BOOTSTRAP_VERSION_OPTION_NAME );
		$this->assertEquals( $option_value, $bootstrap_version_option_value );

		// Constant value should be saved as option value if available.
		$constant_value = '4';
		define( Settings::BOOTSTRAP_VERSION_CONSTANT_NAME, $constant_value );
		$option_value = '5';
		update_option( Settings::BOOTSTRAP_VERSION_OPTION_NAME, $option_value );
		$bootstrap_version_option_value = get_option( Settings::BOOTSTRAP_VERSION_OPTION_NAME );
		$this->assertEquals( $constant_value, $bootstrap_version_option_value );
	}

	/**
	 * Tests pre_update_option_enable_css_grid() filter. Option should be saved to constant value if set and always be false if Bootstrap < 5.
	 *
	 * This test must run in a separate process as it defines constants!
	 *
	 * @runInSeparateProcess
	 * @preserveGlobalState disabled
	 */
	public function test_pre_update_option_enable_css_grid() {
		// Option value should always be set to false if Bootstrap version < 5
		update_option( Settings::BOOTSTRAP_VERSION_OPTION_NAME, '4' );
		update_option( Settings::ENABLE_CSS_GRID_OPTION_NAME, true );
		$this->assertEquals( false, get_option( Settings::ENABLE_CSS_GRID_OPTION_NAME ) );

		// Option value should be set if constant is not set and Bootstrap version is >= 5
		update_option( Settings::BOOTSTRAP_VERSION_OPTION_NAME, '5' );
		$option_value = true;
		update_option( Settings::ENABLE_CSS_GRID_OPTION_NAME, $option_value );
		$enable_css_grid_option_value = get_option( Settings::ENABLE_CSS_GRID_OPTION_NAME );
		$this->assertEquals( $option_value, $enable_css_grid_option_value );

		// Constant value should be saved as option value if available.
		$constant_value = true;
		define( Settings::ENABLE_CSS_GRID_CONSTANT_NAME, $constant_value );
		$option_value = false;
		update_option( Settings::ENABLE_CSS_GRID_OPTION_NAME, $option_value );
		$enable_css_grid_option_value = get_option( Settings::ENABLE_CSS_GRID_OPTION_NAME );
		$this->assertEquals( $constant_value, $enable_css_grid_option_value );

		// Option value should be set to false if Bootstrap version < 5
		update_option( Settings::BOOTSTRAP_VERSION_OPTION_NAME, '4' );
		update_option( Settings::ENABLE_CSS_GRID_OPTION_NAME, true );
		$this->assertEquals( false, get_option( Settings::ENABLE_CSS_GRID_OPTION_NAME ) );
	}

	/**
	 * Tests test_is_bootstrap_5_active() helper function.
	 *
	 * This test must run in a separate process as it defines constants!
	 *
	 * @runInSeparateProcess
	 * @preserveGlobalState disabled
	 */
	public function test_is_css_grid_enabled() {
		// CSS grid shouldn't be enabled by default
		$this->assertEquals( false, Settings::is_css_grid_enabled() );

		// Should be true if Bootstrap version 5 is selected and css grid option is enabled.
		update_option( Settings::BOOTSTRAP_VERSION_OPTION_NAME, '5' );
		update_option( Settings::ENABLE_CSS_GRID_OPTION_NAME, true );
		$this->assertEquals( true, Settings::is_css_grid_enabled() );

		// Should be true if Bootstrap version 5 is selected and css grid constant is set to true even if option is set to false.
		define( Settings::ENABLE_CSS_GRID_CONSTANT_NAME, true );
		update_option( Settings::ENABLE_CSS_GRID_OPTION_NAME, false );
		$this->assertEquals( true, Settings::is_css_grid_enabled() );

		// Should be always false when Bootstrap version is < 5
		update_option( Settings::BOOTSTRAP_VERSION_OPTION_NAME, '4' );
		update_option( Settings::ENABLE_CSS_GRID_OPTION_NAME, true );
		$this->assertEquals( false, Settings::is_css_grid_enabled() );
	}
}
