<?php
/**
 * Container tests.
 *
 * @package wp-bootstrap-blocks
 */

/**
 * Class WP_Bootstrap_Blocks_Container_Test
 */
class WP_Bootstrap_Blocks_Container_Test extends WP_UnitTestCase {
	/**
	 * Tests container default attributes.
	 */
	public function test_container_default_attributes() {
		$expected_html = file_get_contents( __DIR__ . '/fixtures/container-default.html' );
		$actual_html = do_blocks( '<!-- wp:wp-bootstrap-blocks/container /-->' );
		$this->assertEquals( $expected_html, $actual_html );
	}
}
