<?php
/**
 * Register wp-bootstrap-blocks/row block type.
 *
 * @package wp-bootstrap-blocks/row
 */

namespace WP_Bootstrap_Blocks\Row;

use WP_Bootstrap_Blocks\Block_Type;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( '\WP_Bootstrap_Blocks\Row\Row_Block_Type', false ) ) :

	/**
	 * Class Row_Block_Type
	 */
	class Row_Block_Type extends Block_Type {
		/**
		 * Name of block type including namespace.
		 *
		 * @var string
		 */
		protected $name = 'wp-bootstrap-blocks/row';

		/**
		 * Block attributes.
		 *
		 * @var array
		 */
		protected $attributes = array(
			'template' => array(
				'type' => 'string',
			),
			'noGutters' => array(
				'type' => 'boolean',
			),
			'alignment' => array(
				'type' => 'string',
			),
			'verticalAlignment' => array(
				'type' => 'string',
			),
			'editorStackColumns' => array(
				'type' => 'boolean',
			),
		);

		/**
		 * Default values of block attributes.
		 *
		 * @var array
		 */
		protected $default_attributes = array(
			'template' => '1-1',
			'noGutters' => false,
			'alignment' => '',
			'verticalAlignment' => '',
			'editorStackColumns' => false,
		);
	}

endif;
