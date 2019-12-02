<?php
/**
 * Button tests.
 *
 * @package wp-bootstrap-blocks
 */

/**
 * Class WP_Bootstrap_Blocks_Button_Test
 */
class WP_Bootstrap_Blocks_Button_Test extends WP_Bootstrap_Blocks_UnitTestCase {
	/**
	 * Name of current block.
	 *
	 * @var string $blockname
	 */
	protected $blockname = 'button';

	/**
	 * Tests button default attributes.
	 */
	public function test_button_default_attributes() {
		$variant = 'default';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Tests button classname.
	 */
	public function test_button_classname() {
		$variant = 'classname';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Tests button style.
	 */
	public function test_button_style() {
		$variant = 'style';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Tests button alignment.
	 */
	public function test_button_alignment() {
		$variant = 'alignment';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}
}
