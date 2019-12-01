<?php
/**
 * Column tests.
 *
 * @package wp-bootstrap-blocks
 */

/**
 * Class WP_Bootstrap_Blocks_Column_Test
 */
class WP_Bootstrap_Blocks_Column_Test extends WP_Bootstrap_Blocks_UnitTestCase {
	/**
	 * Name of current block.
	 *
	 * @var string $blockname
	 */
	protected $blockname = 'column';

	/**
	 * Tests column size.
	 */
	public function test_column_size() {
		$variant = 'size';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Tests column bgColor.
	 */
	public function test_column_bg_color() {
		$variant = 'bg-color';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Tests column center content.
	 */
	public function test_column_center_content() {
		$variant = 'center-content';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Tests column padding.
	 */
	public function test_column_padding() {
		$variant = 'padding';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}
}
