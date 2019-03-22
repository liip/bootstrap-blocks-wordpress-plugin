<?php
$classes = array( 'bootstrap-blocks-row' );
if ( array_key_exists( 'className', $attributes ) ) {
	array_push( $classes, $attributes['className'] );
}
if ( array_key_exists( 'align', $attributes ) && 'full' === $attributes['align'] ) {
	array_push( $classes, 'full-width' );
}

$rowClasses = array( 'row' );
if ( array_key_exists( 'noGutters', $attributes ) ) {
	array_push( $rowClasses, 'no-gutters' );
}
if ( array_key_exists( 'alignment', $attributes ) ) {
	if ( 'center' === $attributes['alignment'] ) {
		array_push( $rowClasses, 'justify-content-center' );
	}
	if ( 'right' === $attributes['alignment'] ) {
		array_push( $rowClasses, 'justify-content-end' );
	}
}
if ( array_key_exists( 'verticalAlignment', $attributes ) ) {
	if ( 'center' === $attributes['verticalAlignment'] ) {
		array_push( $rowClasses, 'align-items-center' );
	}
	if ( 'bottom' === $attributes['verticalAlignment'] ) {
		array_push( $rowClasses, 'align-items-end' );
	}
}
?>
<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
	<div class="<?php echo esc_attr( implode( ' ', $rowClasses ) ); ?>">
		<?php echo $content; ?>
	</div>
</div>
