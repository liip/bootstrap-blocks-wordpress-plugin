<?php
$classes = array( 'bootstrap-blocks-button' );
$btn_classes = array( 'btn' );

if ( array_key_exists( 'className', $attributes ) ) {
	array_push( $btn_classes, $attributes['className'] );
}
if ( array_key_exists( 'style', $attributes ) ) {
	array_push( $btn_classes, 'btn-' . $attributes['style'] );
} else {
	array_push( $btn_classes, 'btn-primary' );
}

$btn_classes = apply_filters( 'bootstrap_blocks_button_classes', $btn_classes, $attributes );

$classes = apply_filters( 'bootstrap_blocks_button_wrapper_classes', $classes, $attributes );
?>
<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
	<a href="<?php echo esc_url( $attributes['url'] ); ?>" class="<?php echo esc_attr( implode( ' ', $btn_classes ) ); ?>">
		<?php echo esc_html( $attributes['text'] ); ?>
	</a>
</div>
