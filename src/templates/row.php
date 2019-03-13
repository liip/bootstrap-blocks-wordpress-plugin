<?php
$classes = array( 'row' );
if ( array_key_exists( 'noGutters', $attributes ) ) {
	array_push( $classes, 'no-gutters' );
}
if ( array_key_exists( 'className', $attributes ) ) {
	array_push( $classes, $attributes['className'] );
}
?>
<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
	<?php echo $content; ?>
</div>
