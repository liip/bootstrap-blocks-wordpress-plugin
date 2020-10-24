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
}
