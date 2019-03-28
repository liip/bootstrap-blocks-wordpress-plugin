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

$row_default_attributes = array(
	'template' => '1-1',
	'noGutters' => false,
	'alignment' => '',
	'verticalAlignment' => '',
);

$row_attributes = array(
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
);

new Block_Type( 'wp-bootstrap-blocks/row', $row_attributes, $row_default_attributes );
