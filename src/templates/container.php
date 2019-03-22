<?php
/**
 * Template for bootstrap-blocks/container
 *
 * This template can be overridden by copying it to theme/bootstrap-blocks/container.php.
 *
 * @package bootstrap-blocks/templates/container
 * @version 1.0.0
 */

$classes = array( 'bootstrap-blocks-container' );

if ( array_key_exists( 'isFluid', $attributes ) && $attributes['isFluid'] ) {
	array_push( $classes, 'container-fluid' );
} else {
	array_push( $classes, 'container' );
}
if ( array_key_exists( 'marginAfter', $attributes ) ) {
	array_push( $classes, $attributes['marginAfter'] );
}
if ( array_key_exists( 'className', $attributes ) ) {
	array_push( $classes, $attributes['className'] );
}
?>
<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
	<?php echo $content; // phpcs:ignore ?>
</div>
