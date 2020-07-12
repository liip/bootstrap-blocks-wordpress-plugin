<?php
/**
 * Row tests.
 *
 * @package wp-bootstrap-blocks
 */

/**
 * Class WP_Bootstrap_Blocks_Row_Test
 */
class WP_Bootstrap_Blocks_Row_Bootstrap_5_Test extends WP_Bootstrap_Blocks_UnitTestCase {
	/**
	 * Name of current block.
	 *
	 * @var string $blockname
	 */
	protected $blockname = 'row';

	/**
	 * Runs before each test
	 */
	public function setUp() {
		parent::setUp();
		// Enable Bootstrap 5
		update_option( \WP_Bootstrap_Blocks\Settings::OPTION_PREFIX . 'bootstrap_version', 5 );
	}

	/**
	 * Runs after each test
	 */
	public function tearDown() {
		parent::tearDown();
		delete_option( \WP_Bootstrap_Blocks\Settings::OPTION_PREFIX . 'bootstrap_version' );
	}

	/**
	 * Tests row no gutters.
	 */
	public function test_row_no_gutters() {
		$variant = 'no-gutters-bootstrap-5';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Tests row horizontal gutters.
	 */
	public function test_row_horizontal_gutters() {
		$variant = 'horizontal-gutters';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Tests row vertical gutters.
	 */
	public function test_row_vertical_gutters() {
		$variant = 'vertical-gutters';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}
}
