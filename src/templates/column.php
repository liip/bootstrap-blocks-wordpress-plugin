<?php
/**
 * Template for wp-bootstrap-blocks/column
 *
 * This template can be overridden by copying it to theme/wp-bootstrap-blocks/column.php.
 *
 * @package wp-bootstrap-blocks/templates/column
 * @version 2.1.0
 */

/**
 * Block attributes.
 * Defined in wp_bootstrap_blocks_get_template() which requires this template.
 *
 * The following attributes are available:
 *
 * @var $attributes array(
 *   'sizeXl' (int) => Xl column size.
 *   'sizeLg' (int) => Lg column size.
 *   'sizeMd' (int) => Md column size.
 *   'sizeSm' (int) => Sm column size.
 *   'sizeXs' (int) => Xs column size.
 *   'equalWidthXl' (boolean) => Xl columns equal-width.
 *   'equalWidthLg' (boolean) => Lg columns equal-width.
 *   'equalWidthMd' (boolean) => Md columns equal-width.
 *   'equalWidthSm' (boolean) => Sm columns equal-width.
 *   'equalWidthXs' (boolean) => Xs columns equal-width.
 *   'bgColor' (string) => Name of background color (eg. 'primary').
 *   'padding' (string) => Padding inside of column (eg. 'p-3').
 *   'centerContent' (boolean) => If true content should be centered in column (only needed if bgColor is set).
 *   'className' (string) => Additional class names which should be added to block.
 * )
 */

/**
 * Block content.
 * Defined in wp_bootstrap_blocks_get_template() which requires this template.
 *
 * @var $content string
 */

$classes = array();
$column_content_classes = array();

if ( array_key_exists( 'equalWidthXs', $attributes ) && $attributes['equalWidthXs'] ) {
	array_push( $classes, 'col' );
} elseif ( array_key_exists( 'sizeXs', $attributes ) && $attributes['sizeXs'] > 0 ) {
	array_push( $classes, 'col-' . $attributes['sizeXs'] );
} else {
	array_push( $classes, 'col-12' );
}
if ( array_key_exists( 'equalWidthSm', $attributes ) && $attributes['equalWidthSm'] ) {
	array_push( $classes, 'col-sm' );
} elseif ( array_key_exists( 'sizeSm', $attributes ) && $attributes['sizeSm'] > 0 ) {
	array_push( $classes, 'col-sm-' . $attributes['sizeSm'] );
}
if ( array_key_exists( 'equalWidthMd', $attributes ) && $attributes['equalWidthMd'] ) {
	array_push( $classes, 'col-md' );
} elseif ( array_key_exists( 'sizeMd', $attributes ) && $attributes['sizeMd'] > 0 ) {
	array_push( $classes, 'col-md-' . $attributes['sizeMd'] );
}
if ( array_key_exists( 'equalWidthLg', $attributes ) && $attributes['equalWidthLg'] ) {
	array_push( $classes, 'col-lg' );
} elseif ( array_key_exists( 'sizeLg', $attributes ) && $attributes['sizeLg'] > 0 ) {
	array_push( $classes, 'col-lg-' . $attributes['sizeLg'] );
}
if ( array_key_exists( 'equalWidthXl', $attributes ) && $attributes['equalWidthXl'] ) {
	array_push( $classes, 'col-xl' );
} elseif ( array_key_exists( 'sizeXl', $attributes ) && $attributes['sizeXl'] > 0 ) {
	array_push( $classes, 'col-xl-' . $attributes['sizeXl'] );
}
if ( array_key_exists( 'className', $attributes ) && ! empty( $attributes['className'] ) ) {
	array_push( $classes, $attributes['className'] );
}

if ( array_key_exists( 'bgColor', $attributes ) && ! empty( $attributes['bgColor'] ) ) {
	array_push( $column_content_classes, 'h-100' );
	array_push( $column_content_classes, 'bg-' . $attributes['bgColor'] );

	if ( array_key_exists( 'centerContent', $attributes ) && $attributes['centerContent'] ) {
		array_push( $column_content_classes, 'd-flex' );
		array_push( $column_content_classes, 'flex-column' );
		array_push( $column_content_classes, 'justify-content-center' );
	}
}

if ( array_key_exists( 'padding', $attributes ) && ! empty( $attributes['padding'] ) ) {
	array_push( $column_content_classes, $attributes['padding'] );
}

/**
 * Filters column block classes.
 *
 * @since 1.0.0
 *
 * @param string $classes Classes which should be added to the block.
 * @param array $attributes Block attributes.
 */
$classes = apply_filters( 'wp_bootstrap_blocks_column_classes', $classes, $attributes );

/**
 * Filters column inner content classes.
 *
 * @since 1.5.0
 *
 * @param string $classes Classes which should be added to the content.
 * @param array $attributes Block attributes.
 */
$column_content_classes = apply_filters( 'wp_bootstrap_blocks_column_content_classes', $column_content_classes, $attributes );
?>

<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
	<?php if ( ! empty( $column_content_classes ) ) : ?>
		<div class="<?php echo esc_attr( implode( ' ', $column_content_classes ) ); ?>">
			<?php echo $content; // phpcs:ignore ?>
		</div>
	<?php else : ?>
		<?php echo $content; // phpcs:ignore ?>
	<?php endif; ?>
</div>
