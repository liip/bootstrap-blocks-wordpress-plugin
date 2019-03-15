<?php
$classes = array( 'btn' );
if ( array_key_exists( 'className', $attributes ) ) {
	array_push( $classes, $attributes['className'] );
}
if ( array_key_exists( 'style', $attributes ) ) {
	array_push( $classes, 'btn-' . $attributes['style'] );
} else {
	array_push( $classes, 'btn-primary' );
}
?>
<div class="bootstrap-blocks-button">
	<a href="<?php echo esc_url( $attributes['url'] ); ?>" class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
		<?php echo esc_html( $attributes['text'] ); ?>
	</a>
</div>
