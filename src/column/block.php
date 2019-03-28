<?php
/**
 * Register wp-bootstrap-blocks/column block type.
 *
 * @package wp-bootstrap-blocks/column
 */

namespace WP_Bootstrap_Blocks\Column;

use WP_Bootstrap_Blocks\Block_Type;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$column_default_attributes = array(
	'sizeXl' => 0,
	'sizeLg' => 0,
	'sizeMd' => 0,
	'sizeSm' => 0,
	'sizeXs' => 12,
);

$column_attributes = array(
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
);

new Block_Type( 'wp-bootstrap-blocks/column', $column_attributes, $column_default_attributes );
