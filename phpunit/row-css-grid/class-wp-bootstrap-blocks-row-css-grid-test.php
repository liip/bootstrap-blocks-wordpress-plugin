<?php
/**
 * Row tests CSS grid.
 *
 * @package wp-bootstrap-blocks
 */

/**
 * Class WP_Bootstrap_Blocks_Row_Css_Grid_Test
 */
class WP_Bootstrap_Blocks_Row_Css_Grid_Test extends WP_Bootstrap_Blocks_UnitTestCase {
	/**
	 * Name of current block.
	 *
	 * @var string $blockname
	 */
	protected $blockname = 'row-css-grid';

	/**
	 * Runs before each test
	 */
	public function setUp() {
		parent::setUp();
		// Enable Bootstrap 5
		update_option( \WP_Bootstrap_Blocks\Settings::BOOTSTRAP_VERSION_OPTION_NAME, '5' );
		// Enable CSS grid
		update_option( \WP_Bootstrap_Blocks\Settings::ENABLE_CSS_GRID_OPTION_NAME, true );
	}

	/**
	 * Runs after each test
	 */
	public function tearDown() {
		parent::tearDown();
		delete_option( \WP_Bootstrap_Blocks\Settings::BOOTSTRAP_VERSION_OPTION_NAME );
		delete_option( \WP_Bootstrap_Blocks\Settings::ENABLE_CSS_GRID_OPTION_NAME );
	}

	/**
	 * Tests row default attributes.
	 */
	public function test_row_default() {
		$variant = 'default';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Tests row no gutters.
	 */
	public function test_row_css_grid_no_gutters() {
		$variant = 'no-gutters';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Tests row horizontal gutters.
	 */
	public function test_row_css_grid_gutters() {
		$variant = 'gutters';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Tests if gutters options are ignored when no gutters is set.
	 */
	public function test_row_css_grid_no_gutters_ignore_gutters_options() {
		$variant = 'no-gutters-with-gutters-options';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}
}
