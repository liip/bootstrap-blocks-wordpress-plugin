<?php
function bootstrap_blocks_row_render_callback( $attributes, $content ) {
	return bootstrap_blocks_get_template( 'row', $attributes, $content );
}

register_block_type( 'bootstrap-blocks/row', array(
	'render_callback' => 'bootstrap_blocks_row_render_callback',
) );
