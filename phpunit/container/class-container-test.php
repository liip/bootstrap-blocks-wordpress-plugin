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
		$expected_html = $this->load_fixture( 'container-default.html' );
		$actual_html = do_blocks( '<!-- wp:wp-bootstrap-blocks/container /-->' );
		$this->assertEquals( $expected_html, $actual_html );
	}

	/**
	 * Tests container fluid.
	 */
	public function test_container_fluid() {
		$expected_html = $this->load_fixture( 'container-fluid.html' );
		$actual_html = do_blocks( '<!-- wp:wp-bootstrap-blocks/container {"isFluid":true} -->' );
		$this->assertEquals( $expected_html, $actual_html );
	}

	/**
	 * Tests container fluid breakpoint.
	 */
	public function test_container_fluid_breakpoint() {
		$expected_html = $this->load_fixture( 'container-fluid-breakpoint.html' );
		$actual_html = do_blocks( '<!-- wp:wp-bootstrap-blocks/container {"isFluid":true,"fluidBreakpoint":"lg"} -->' );
		$this->assertEquals( $expected_html, $actual_html );
	}

	/**
	 * Tests container margin after.
	 */
	public function test_container_margin_after() {
		$expected_html = $this->load_fixture( 'container-margin-after.html' );
		$actual_html = do_blocks( '<!-- wp:wp-bootstrap-blocks/container {"marginAfter":"mb-3"} -->' );
		$this->assertEquals( $expected_html, $actual_html );
	}

	/**
	 * Load fixture and return content.
	 *
	 * @param string $fixture_name Name of fixture to load.
	 * @return false|string
	 */
	protected function load_fixture( $fixture_name ) {
		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		return file_get_contents( __DIR__ . '/fixtures/' . $fixture_name );
	}
}
