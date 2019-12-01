<?php
/**
 * Row tests.
 *
 * @package wp-bootstrap-blocks
 */

/**
 * Class WP_Bootstrap_Blocks_Row_Test
 */
class WP_Bootstrap_Blocks_Row_Test extends WP_Bootstrap_Blocks_UnitTestCase {
	/**
	 * Name of current block.
	 *
	 * @var string $blockname
	 */
	protected $blockname = 'row';

	/**
	 * Tests row default attributes.
	 */
	public function test_row_default_attributes() {
		$variant = 'default';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Tests row no gutters.
	 */
	public function test_row_no_gutters() {
		$variant = 'no-gutters';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}
}