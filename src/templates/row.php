<?php
/**
 * Template for wp-bootstrap-blocks/row
 *
 * This template can be overridden by copying it to theme/wp-bootstrap-blocks/row.php.
 *
 * @package wp-bootstrap-blocks/templates/row
 * @version 1.1.0
 */

/**
 * Block attributes.
 * Defined in wp_bootstrap_blocks_get_template() which requires this template.
 *
 * @var $attributes array
 */

/**
 * Block content.
 * Defined in wp_bootstrap_blocks_get_template() which requires this template.
 *
 * @var $content string
 */

$classes = array( 'wp-bootstrap-blocks-row' );
if ( array_key_exists( 'className', $attributes ) ) {
	array_push( $classes, $attributes['className'] );
}
if ( array_key_exists( 'align', $attributes ) && 'full' === $attributes['align'] ) {
	array_push( $classes, 'alignfull' );
}

$row_classes = array( 'row' );
if ( array_key_exists( 'noGutters', $attributes ) && $attributes['noGutters'] ) {
	array_push( $row_classes, 'no-gutters' );
}
if ( array_key_exists( 'alignment', $attributes ) ) {
	if ( 'left' === $attributes['alignment'] ) {
		array_push( $row_classes, 'justify-content-start' );
	}
	if ( 'center' === $attributes['alignment'] ) {
		array_push( $row_classes, 'justify-content-center' );
	}
	if ( 'right' === $attributes['alignment'] ) {
		array_push( $row_classes, 'justify-content-end' );
	}
}
if ( array_key_exists( 'verticalAlignment', $attributes ) ) {
	if ( 'top' === $attributes['verticalAlignment'] ) {
		array_push( $row_classes, 'align-items-start' );
	}
	if ( 'center' === $attributes['verticalAlignment'] ) {
		array_push( $row_classes, 'align-items-center' );
	}
	if ( 'bottom' === $attributes['verticalAlignment'] ) {
		array_push( $row_classes, 'align-items-end' );
	}
}

$classes = apply_filters( 'wp_bootstrap_blocks_row_wrapper_classes', $classes, $attributes );
$row_classes = apply_filters( 'wp_bootstrap_blocks_row_classes', $row_classes, $attributes );
?>
<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
	<div class="<?php echo esc_attr( implode( ' ', $row_classes ) ); ?>">
		<?php echo $content; // phpcs:ignore ?>
	</div>
</div>
