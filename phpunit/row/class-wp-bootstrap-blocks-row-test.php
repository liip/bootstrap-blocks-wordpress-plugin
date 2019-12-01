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
		$block_content = $this->load_block_fixture( $variant );
		$actual_html = do_blocks( $block_content );
		$this->create_fixture_if_needed( $variant, $actual_html );
		$expected_html = $this->load_output_fixture( $variant );
		$this->assertEquals( $expected_html, $actual_html );
	}
}
