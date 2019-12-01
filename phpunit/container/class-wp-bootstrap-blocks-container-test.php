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
		$block_content = $this->load_block_fixture( $variant );
		$actual_html = do_blocks( $block_content );
		$this->create_fixture_if_needed( $variant, $actual_html );
		$expected_html = $this->load_output_fixture( $variant );
		$this->assertEquals( $expected_html, $actual_html );
	}

	/**
	 * Tests container fluid.
	 */
	public function test_container_fluid() {
		$variant = 'fluid';
		$block_content = $this->load_block_fixture( $variant );
		$actual_html = do_blocks( $block_content );
		$this->create_fixture_if_needed( $variant, $actual_html );
		$expected_html = $this->load_output_fixture( $variant );
		$this->assertEquals( $expected_html, $actual_html );
	}

	/**
	 * Tests container fluid breakpoint.
	 */
	public function test_container_fluid_breakpoint() {
		$variant = 'fluid-breakpoint';
		$block_content = $this->load_block_fixture( $variant );
		$actual_html = do_blocks( $block_content );
		$this->create_fixture_if_needed( $variant, $actual_html );
		$expected_html = $this->load_output_fixture( $variant );
		$this->assertEquals( $expected_html, $actual_html );
	}

	/**
	 * Tests container margin after.
	 */
	public function test_container_margin_after() {
		$variant = 'margin-after';
		$block_content = $this->load_block_fixture( $variant );
		$actual_html = do_blocks( $block_content );
		$this->create_fixture_if_needed( $variant, $actual_html );
		$expected_html = $this->load_output_fixture( $variant );
		$this->assertEquals( $expected_html, $actual_html );
	}
}
