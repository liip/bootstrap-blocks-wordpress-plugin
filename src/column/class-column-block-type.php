<?php
/**
 * Register wp-bootstrap-blocks/column block type.
 *
 * @package wp-bootstrap-blocks/column
 */

namespace WP_Bootstrap_Blocks\Column;

use WP_Bootstrap_Blocks\Block_Type;
use WP_Bootstrap_Blocks\Settings;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( '\WP_Bootstrap_Blocks\Column\Column_Block_Type', false ) ) :

	/**
	 * Class Column_Block_Type
	 */
	class Column_Block_Type extends Block_Type {
		/**
		 * Name of block type including namespace.
		 *
		 * @var string
		 */
		protected $name = 'wp-bootstrap-blocks/column';

		/**
		 * Block attributes.
		 *
		 * @var array
		 */
		protected $attributes = array(
			'sizeXxl' => array(
				'type' => 'number',
			),
			'sizeXl' => array(
				'type' => 'number',
			),
			'sizeLg' => array(
				'type' => 'number',
			),
			'sizeMd' => array(
				'type' => 'number',
			),
			'sizeSm' => array(
				'type' => 'number',
			),
			'sizeXs' => array(
				'type' => 'number',
			),
			'equalWidthXxl' => array(
				'type' => 'boolean',
			),
			'equalWidthXl' => array(
				'type' => 'boolean',
			),
			'equalWidthLg' => array(
				'type' => 'boolean',
			),
			'equalWidthMd' => array(
				'type' => 'boolean',
			),
			'equalWidthSm' => array(
				'type' => 'boolean',
			),
			'equalWidthXs' => array(
				'type' => 'boolean',
			),
			'bgColor' => array(
				'type' => 'string',
			),
			'padding' => array(
				'type' => 'string',
			),
			'centerContent' => array(
				'type' => 'boolean',
			),
			'contentVerticalAlignment' => array(
				'type' => 'string',
			),
		);

		/**
		 * Default values of block attributes.
		 *
		 * @var array
		 */
		protected $default_attributes = array(
			'sizeXxl' => 0,
			'sizeXl' => 0,
			'sizeLg' => 0,
			'sizeMd' => 0,
			'sizeSm' => 0,
			'sizeXs' => 12,
			'equalWidthXxl' => false,
			'equalWidthXl' => false,
			'equalWidthLg' => false,
			'equalWidthMd' => false,
			'equalWidthSm' => false,
			'equalWidthXs' => false,
			'bgColor' => '',
			'padding' => '',
			'centerContent' => false,
			'contentVerticalAlignment' => '',
		);

		/**
		 * Get name of block template.
		 *
		 * @return string
		 */
		protected function get_template_name() {
			$template_name = parent::get_template_name();
			if ( Settings::is_css_grid_enabled() ) {
				$template_name .= '-css-grid';
			}
			return $template_name;
		}
	}

endif;
