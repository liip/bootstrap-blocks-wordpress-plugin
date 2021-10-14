<?php
/**
 * Register wp-bootstrap-blocks/accordion block type.
 *
 * @package wp-bootstrap-blocks/accordion
 */

namespace WP_Bootstrap_Blocks\Accordion;

use WP_Bootstrap_Blocks\Block_Type;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( '\WP_Bootstrap_Blocks\Accordion\Accordion_Block_Type', false ) ) :

	/**
	 * Class Button_Block_Type
	 */
	class Accordion_Block_Type extends Block_Type {
		/**
		 * Name of block type including namespace.
		 *
		 * @var string
		 */
		protected $name = 'wp-bootstrap-blocks/accordion';

		/**
		 * Block attributes.
		 *
		 * @var array
		 */
		protected $attributes = array(
			'clientId'   => array(
				'type' => 'string',
			),
			'alwaysOpen' => array(
				'type' => 'boolean',
			),
		);

		/**
		 * Default values of block attributes.
		 *
		 * @var array
		 */
		protected $default_attributes = array(
			'clientId'   => '',
			'alwaysOpen' => false,
		);
	}

endif;
