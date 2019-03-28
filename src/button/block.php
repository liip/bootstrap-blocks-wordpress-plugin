<?php
/**
 * Register wp-bootstrap-blocks/button block type.
 *
 * @package wp-bootstrap-blocks/button
 */

namespace WP_Bootstrap_Blocks\Button;

use WP_Bootstrap_Blocks\Block_Type;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$button_default_attributes = array(
	'url' => '',
	'text' => '',
	'style' => '',
	'alignment' => '',
);

$button_attributes = array(
	'url' => array(
		'type' => 'string',
	),
	'text' => array(
		'type' => 'string',
	),
	'style' => array(
		'type' => 'string',
	),
	'alignment' => array(
		'type' => 'string',
	),
);

new Block_Type( 'wp-bootstrap-blocks/button', $button_attributes, $button_default_attributes );
