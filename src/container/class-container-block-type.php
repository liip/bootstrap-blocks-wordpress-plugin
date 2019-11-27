<?php
/**
 * Register wp-bootstrap-blocks/container block type.
 *
 * @package wp-bootstrap-blocks/container
 */

namespace WP_Bootstrap_Blocks\Container;

use WP_Bootstrap_Blocks\Block_Type;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( '\WP_Bootstrap_Blocks\Container\Container_Block_Type', false ) ) :

	/**
	 * Class Container_Block_Type
	 */
	class Container_Block_Type extends Block_Type {
		/**
		 * Name of block type including namespace.
		 *
		 * @var string
		 */
		protected $name = 'wp-bootstrap-blocks/container';

		/**
		 * Block attributes.
		 *
		 * @var array
		 */
		protected $attributes = array(
			'isFluid' => array(
				'type' => 'boolean',
			),
			'fluidBreakpoint' => array(
				'type' => 'string',
			),
			'marginAfter' => array(
				'type' => 'string',
			),
		);

		/**
		 * Default values of block attributes.
		 *
		 * @var array
		 */
		protected $default_attributes = array(
			'isFluid' => false,
			'fluidBreakpoint' => '',
			'marginAfter' => 'mb-2',
		);
	}

endif;
