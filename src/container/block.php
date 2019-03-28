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

$container_default_attributes = array(
	'isFluid' => false,
	'marginAfter' => 'mb-2',
);

$container_attributes = array(
	'isFluid' => array(
		'type' => 'boolean',
	),
	'marginAfter' => array(
		'type' => 'string',
	),
);

new Block_Type( 'wp-bootstrap-blocks/container', $container_attributes, $container_default_attributes );
