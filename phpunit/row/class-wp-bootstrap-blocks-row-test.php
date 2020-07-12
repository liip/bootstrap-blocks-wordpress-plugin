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

	/**
	 * Tests row alignment.
	 */
	public function test_row_alignment() {
		$variant = 'alignment';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Tests row align full.
	 */
	public function test_row_align_full() {
		$variant = 'align-full';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Tests editor column layout.
	 */
	public function test_row_editor_column_layout() {
		// The editorColumnLayout option should not affect output
		$variant = 'editor-column-layout';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Tests row classname.
	 */
	public function test_row_classname() {
		$variant = 'classname';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}
}
