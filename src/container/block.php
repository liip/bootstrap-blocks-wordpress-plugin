<?php
function bootstrap_blocks_container_render_callback( $attributes, $content ) {
	return bootstrap_blocks_get_template( 'container', $attributes, $content );
}

register_block_type( 'bootstrap-blocks/container', array(
	'render_callback' => 'bootstrap_blocks_container_render_callback',
) );
