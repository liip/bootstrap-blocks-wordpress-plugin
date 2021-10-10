<?php
/**
 * Column CSS grid tests.
 *
 * @package wp-bootstrap-blocks
 */

/**
 * Class WP_Bootstrap_Blocks_Column_Css_Grid_Test
 */
class WP_Bootstrap_Blocks_Column_Css_Grid_Test extends WP_Bootstrap_Blocks_UnitTestCase {
	/**
	 * Name of current block.
	 *
	 * @var string $blockname
	 */
	protected $blockname = 'column-css-grid';

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
	 * Tests column CSS grid size.
	 */
	public function test_column_css_grid_size() {
		$variant = 'size';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Tests column CSS grid bgColor.
	 */
	public function test_column_css_grid_bg_color() {
		$variant = 'bg-color';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Tests column CSS grid padding.
	 */
	public function test_column_css_grid_padding() {
		$variant = 'padding';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Tests column CSS grid classname.
	 */
	public function test_column_css_grid_classname() {
		$variant = 'classname';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}
}
