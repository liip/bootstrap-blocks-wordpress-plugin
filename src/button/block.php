<?php
function bootstrap_blocks_button_render_callback( $attributes, $content ) {
	return bootstrap_blocks_get_template( 'button', $attributes, $content );
}

register_block_type( 'bootstrap-blocks/button', array(
	'render_callback' => 'bootstrap_blocks_button_render_callback',
) );
