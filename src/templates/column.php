<?php
$classes = array();
if ( array_key_exists( 'sizeXs', $attributes ) && $attributes['sizeXs'] > 0 ) {
	array_push( $classes, 'col-' . $attributes['sizeXs'] );
} else {
	array_push( $classes, 'col-12' );
}
if ( array_key_exists( 'sizeSm', $attributes ) && $attributes['sizeSm'] > 0 ) {
	array_push( $classes, 'col-sm-' . $attributes['sizeSm'] );
}
if ( array_key_exists( 'sizeMd', $attributes ) && $attributes['sizeMd'] > 0 ) {
	array_push( $classes, 'col-md-' . $attributes['sizeMd'] );
}
if ( array_key_exists( 'sizeLg', $attributes ) && $attributes['sizeLg'] > 0 ) {
	array_push( $classes, 'col-lg-' . $attributes['sizeLg'] );
}
if ( array_key_exists( 'sizeXl', $attributes ) && $attributes['sizeXl'] > 0 ) {
	array_push( $classes, 'col-xl-' . $attributes['sizeXl'] );
}
if ( array_key_exists( 'className', $attributes ) ) {
	$classes = array_merge( $classes, explode( ' ', $attributes['className'] ) );
}

$classes = apply_filters( 'bootstrap_blocks_column_classes', $classes, $attributes );
?>
<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
	<?php echo $content; ?>
</div>
