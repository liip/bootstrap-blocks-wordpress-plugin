<?php
/**
 * Container tests.
 *
 * @package wp-bootstrap-blocks
 */

/**
 * Class WP_Bootstrap_Blocks_Container_Test
 */
class WP_Bootstrap_Blocks_Container_Test extends WP_Bootstrap_Blocks_UnitTestCase {
	/**
	 * Name of current block.
	 *
	 * @var string $blockname
	 */
	protected $blockname = 'container';

	/**
	 * Tests container default attributes.
	 */
	public function test_container_default_attributes() {
		$variant = 'default';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Tests container fluid.
	 */
	public function test_container_fluid() {
		$variant = 'fluid';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Tests container fluid breakpoint.
	 */
	public function test_container_fluid_breakpoint() {
		$variant = 'fluid-breakpoint';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Tests container margin after.
	 */
	public function test_container_margin_after() {
		$variant = 'margin-after';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Tests container classname.
	 */
	public function test_container_classname() {
		$variant = 'classname';
		list( $expected, $actual ) = $this->get_block_output( $variant );
		$this->assertEquals( $expected, $actual );
	}
}
