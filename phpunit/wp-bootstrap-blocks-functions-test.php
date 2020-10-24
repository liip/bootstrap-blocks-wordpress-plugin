<?php
/**
 * Helper functions tests.
 *
 * @package wp-bootstrap-blocks
 */

/**
 * Class WP_Bootstrap_Blocks_Functions_Test
 */
class WP_Bootstrap_Blocks_Functions_Test extends WP_UnitTestCase {
	/**
	 * Test wp_bootstrap_blocks_locate_template function.
	 */
	public function test_wp_bootstrap_blocks_locate_template() {
		$row_template_path = wp_bootstrap_blocks_locate_template( 'row' );
		$expected_row_template_path = untrailingslashit( plugin_dir_path( WP_BOOTSTRAP_BLOCKS_PLUGIN_FILE ) ) . '/src/templates/row.php';
		$this->assertEquals( $expected_row_template_path, $row_template_path );
	}

	/**
	 * Test wp_bootstrap_blocks_get_template function.
	 */
	public function test_wp_bootstrap_blocks_get_template() {
		$container_template = wp_bootstrap_blocks_get_template( 'container', array() );
		$expected_container_template = '<div class="wp-bootstrap-blocks-container container">';
		$this->assertTrue( strpos( $container_template, $expected_container_template ) !== false );
	}

	/**
	 * Test wp_bootstrap_blocks_get_template function with 'wp_bootstrap_blocks_get_template' filter.
	 */
	public function test_wp_bootstrap_blocks_get_template_with_filter() {
		add_filter(
			'wp_bootstrap_blocks_get_template',
			function () {
				return trailingslashit( dirname( __FILE__ ) ) . 'fixtures/templates/dummy.php';
			}
		);
		$container_template = wp_bootstrap_blocks_get_template( 'container', array() );
		$expected_container_template = '<div class="dummy-template"></div>';
		$this->assertTrue( strpos( $container_template, $expected_container_template ) !== false );
	}
}
