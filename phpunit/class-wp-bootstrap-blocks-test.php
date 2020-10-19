<?php
/**
 * Main class tests.
 *
 * @package wp-bootstrap-blocks
 */

/**
 * Class WP_Bootstrap_Blocks_Test
 */
class WP_Bootstrap_Blocks_Test extends WP_UnitTestCase {
	/**
	 * Tests row default attributes.
	 */
	public function test_check_version() {
		$wp_bootstrap_blocks_instance = \WP_Bootstrap_Blocks\WP_Bootstrap_Blocks::instance();
		$version_option_name = $wp_bootstrap_blocks_instance->token . '_version';
		$updated_action_name = $wp_bootstrap_blocks_instance->token . '_updated';
		$wrong_version = (float) $wp_bootstrap_blocks_instance::$version - 1;
		update_option( $version_option_name, $wrong_version );
		$wp_bootstrap_blocks_instance->check_version();
		// updated action should have been called 2 times (1. first load of plugin when starting unit test 2. manual change of version in this unit test)
		$this->assertEquals( 2, did_action( $updated_action_name ) );
		// Version option should be set to current plugin version
		$this->assertEquals( $wp_bootstrap_blocks_instance::$version, get_option( $version_option_name ) );

		update_option( $version_option_name, $wp_bootstrap_blocks_instance::$version );
		$wp_bootstrap_blocks_instance->check_version();
		// updated action should not have been called again since the version number already matched.
		$this->assertEquals( 2, did_action( $updated_action_name ) );
	}
}
