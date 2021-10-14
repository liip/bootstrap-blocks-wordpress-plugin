<?php
/**
 * Register wp-bootstrap-blocks/accordion-item block type.
 *
 * @package wp-bootstrap-blocks/accordion-item
 */

namespace WP_Bootstrap_Blocks\Accordion_Item;

use WP_Bootstrap_Blocks\Block_Type;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( '\WP_Bootstrap_Blocks\Accordion_Item\Accordion_Item_Block_Type', false ) ) :

	/**
	 * Class Button_Block_Type
	 */
	class Accordion_Item_Block_Type extends Block_Type {
		/**
		 * Name of block type including namespace.
		 *
		 * @var string
		 */
		protected $name = 'wp-bootstrap-blocks/accordion-item';

		/**
		 * Block attributes.
		 *
		 * @var array
		 */
		protected $attributes = array(
			'alignment'      => array(
				'type' => 'string',
			),
			'title'          => array(
				'type' => 'string',
			),
			'clientId'       => array(
				'type' => 'string',
			),
			'alwaysOpen'     => array(
				'type' => 'boolean',
			),
			'parentClientId' => array(
				'type' => 'string',
			),
		);

		/**
		 * Default values of block attributes.
		 *
		 * @var array
		 */
		protected $default_attributes = array(
			'alignment'      => '',
			'title'          => '',
			'clientId'       => '',
			'alwaysOpen'     => false,
			'parentClientId' => '',
		);
	}

endif;
