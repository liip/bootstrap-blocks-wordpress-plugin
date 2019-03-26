<?php
/**
 * Template for wp-bootstrap-blocks/row
 *
 * This template can be overridden by copying it to theme/wp-bootstrap-blocks/row.php.
 *
 * @package wp-bootstrap-blocks/templates/row
 * @version 1.0.0
 */

$classes = array( 'wp-bootstrap-blocks-row' );
if ( array_key_exists( 'className', $attributes ) ) {
	array_push( $classes, $attributes['className'] );
}
if ( array_key_exists( 'align', $attributes ) && 'full' === $attributes['align'] ) {
	array_push( $classes, 'full-width' );
}

$row_classes = array( 'row' );
if ( array_key_exists( 'noGutters', $attributes ) ) {
	array_push( $row_classes, 'no-gutters' );
}
if ( array_key_exists( 'alignment', $attributes ) ) {
	if ( 'center' === $attributes['alignment'] ) {
		array_push( $row_classes, 'justify-content-center' );
	}
	if ( 'right' === $attributes['alignment'] ) {
		array_push( $row_classes, 'justify-content-end' );
	}
}
if ( array_key_exists( 'verticalAlignment', $attributes ) ) {
	if ( 'center' === $attributes['verticalAlignment'] ) {
		array_push( $row_classes, 'align-items-center' );
	}
	if ( 'bottom' === $attributes['verticalAlignment'] ) {
		array_push( $row_classes, 'align-items-end' );
	}
}
?>
<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
	<div class="<?php echo esc_attr( implode( ' ', $row_classes ) ); ?>">
		<?php echo $content; // phpcs:ignore ?>
	</div>
</div>
