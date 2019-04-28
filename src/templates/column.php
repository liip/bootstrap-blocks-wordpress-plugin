<?php
/**
 * Template for wp-bootstrap-blocks/column
 *
 * This template can be overridden by copying it to theme/wp-bootstrap-blocks/column.php.
 *
 * @package wp-bootstrap-blocks/templates/column
 * @version 1.0.0
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

if ( $attributes['bgColor'] ) {
	array_push( $classes, 'bg-' . $attributes['bgColor'] );
}

if ( array_key_exists( 'padding', $attributes ) ) {
	$attributes['parentNoGutters'] ? $padding_prefix = 'p' : $padding_prefix = 'py';

	array_push( $classes, $padding_prefix . '-' . $attributes['padding'] );
}

$classes = apply_filters( 'wp_bootstrap_blocks_column_classes', $classes, $attributes );

if ( $attributes['centerInStretch'] && ! $attributes['parentVerticalAlignment'] ) : ?>
<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?> d-flex justify-content-center align-items-center">
	<div class="last-child-margin-fix">
		<?php echo $content; // phpcs:ignore ?>
	</div>
</div>
<?php else : ?>
<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
	<?php echo $content; // phpcs:ignore ?>
</div>
<?php endif; ?>
