<?php
/**
 * WP_Bootstrap_Blocks UnitTestCase class.
 *
 * @package wp-bootstrap-blocks
 */

/**
 * Class WP_Bootstrap_Blocks_UnitTestCase
 */
abstract class WP_Bootstrap_Blocks_UnitTestCase extends WP_UnitTestCase {
	const OUTPUT_STATE_NAME = 'output';

	/**
	 * Name of current block.
	 *
	 * @var string $blockname
	 */
	protected $blockname = '';

	/**
	 * Gets actual and expected output of block variant.
	 *
	 * @param string $variant Variant of block.
	 *
	 * @return array Array with expected output at index 0 and actual output at index 1.
	 *
	 * @throws Exception Throws exception if fixture could not be loaded.
	 */
	protected function get_block_output( $variant ) {
		$block_content = $this->load_block_fixture( $variant );
		$actual_output = do_blocks( $block_content );
		$this->create_fixture_if_needed( $variant, $actual_output );
		$expected_output = $this->load_output_fixture( $variant );
		return array( $expected_output, $actual_output );
	}

	/**
	 * Load output fixture and return content.
	 *
	 * @param string $variant Variant of fixture to load.
	 *
	 * @return false|string
	 *
	 * @throws Exception Throws exception if fixture could not be loaded.
	 */
	protected function load_output_fixture( $variant ) {
		return $this->load_fixture( $variant, self::OUTPUT_STATE_NAME );
	}

	/**
	 * Load block fixture and return content.
	 *
	 * @param string $variant Variant of fixture to load.
	 *
	 * @return false|string
	 *
	 * @throws Exception Throws exception if fixture could not be loaded.
	 */
	protected function load_block_fixture( $variant ) {
		return $this->load_fixture( $variant );
	}

	/**
	 * Load fixture and return content.
	 *
	 * @param string $variant Variant of fixture to load.
	 * @param string $state Fixture state to load.
	 *
	 * @return false|string
	 *
	 * @throws Exception Throws exception if fixture could not be found.
	 */
	protected function load_fixture( $variant, $state = '' ) {
		$filepath = $this->get_fixture_path( $variant, $state );
		if ( ! file_exists( $filepath ) ) {
			if ( self::OUTPUT_STATE_NAME === $state ) {
				throw new Exception( 'Fixture file ' . $filepath . ' does not exist. Please record output fixture file first by setting the environment variable WP_BOOTSTRAP_BLOCKS_RECORD to true and running the tests again.' );
			} else {
				throw new Exception( 'Fixture file ' . $filepath . ' does not exist. Please create it first.' );
			}
		}
		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		return file_get_contents( $filepath );
	}

	/**
	 * Creates fixture file if WP_BOOTSTRAP_BLOCKS_RECORD environment variable is set to true.
	 *
	 * @param string $variant State of fixture which will be created.
	 * @param string $content Content which will be written to file.
	 *
	 * @throws Exception Throws exception if fixture path could not be retrieved.
	 */
	protected function create_fixture_if_needed( $variant, $content ) {
		if ( getenv( 'WP_BOOTSTRAP_BLOCKS_RECORD' ) === '1' ) {
			// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_read_file_put_contents
			file_put_contents( $this->get_fixture_path( $variant, 'output' ), $content );
		}
	}

	/**
	 * Returns path to fixture by state.
	 *
	 * @param string $variant Variant of fixture to load.
	 * @param string $state Fixture state to load.
	 *
	 * @return string Path to fixture.
	 *
	 * @throws Exception Throws exception if blockname or variant is empty.
	 */
	protected function get_fixture_path( $variant, $state = '' ) {
		if ( empty( $this->blockname ) ) {
			throw new Exception( 'Blockname can not be empty. Please set it!' );
		}
		if ( empty( $variant ) ) {
			throw new Exception( 'Please define state of fixture.' );
		}

		$state_part = ! empty( $state ) ? '.' . $state : '';
		return __DIR__ . '/' . $this->blockname . '/fixtures/' . $this->blockname . '__' . $variant . $state_part . '.html';
	}
}
