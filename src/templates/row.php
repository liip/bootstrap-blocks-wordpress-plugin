<?php
$classes = array( 'bootstrap-blocks-row' );
if ( array_key_exists( 'className', $attributes ) ) {
	array_push( $classes, $attributes['className'] );
}

$rowClasses = array( 'row' );
if ( array_key_exists( 'noGutters', $attributes ) ) {
	array_push( $rowClasses, 'no-gutters' );
}
?>
<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
	<div class="<?php echo esc_attr( implode( ' ', $rowClasses ) ); ?>">
		<?php echo $content; ?>
	</div>
</div>
