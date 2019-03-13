<?php
function bootstrap_blocks_column_render_callback( $attributes, $content ) {
	return bootstrap_blocks_get_template( 'column', $attributes, $content );
}

register_block_type( 'bootstrap-blocks/column', array(
	'render_callback' => 'bootstrap_blocks_column_render_callback',
) );
