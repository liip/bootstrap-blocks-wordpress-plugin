<?php
/**
 * Template for wp-bootstrap-blocks/row
 *
 * This template can be overridden by copying it to theme/wp-bootstrap-blocks/row.php.
 *
 * @package wp-bootstrap-blocks/templates/row
 * @version 2.0.0
 */

/**
 * Block attributes.
 * Defined in wp_bootstrap_blocks_get_template() which requires this template.
 *
 * The following attributes are available:
 *
 * @var $attributes array(
 *   'template' (string) => Name of selected template.
 *   'noGutters' (boolean) => Defines if no gutters should be applied or not.
 *   'alignment' (string) => Horizontal alignment of inner columns.
 *   'verticalAlignment' (string) => Vertical alignment of inner columns.
 *   'align' (string) => If set to 'full' row should use full width of page.
 *   'className' (string) => Additional class names which should be added to block.
 * )
 */

/**
 * Block content.
 * Defined in wp_bootstrap_blocks_get_template() which requires this template.
 *
 * @var $content string
 */

$classes = array( 'wp-bootstrap-blocks-row', 'row' );
if ( array_key_exists( 'className', $attributes ) && ! empty( $attributes['className'] ) ) {
	array_push( $classes, $attributes['className'] );
}
if ( array_key_exists( 'align', $attributes ) && 'full' === $attributes['align'] ) {
	array_push( $classes, 'alignfull' );
}

if ( array_key_exists( 'noGutters', $attributes ) && $attributes['noGutters'] ) {
	array_push( $classes, 'no-gutters' );
}
if ( array_key_exists( 'alignment', $attributes ) ) {
	if ( 'left' === $attributes['alignment'] ) {
		array_push( $classes, 'justify-content-start' );
	}
	if ( 'center' === $attributes['alignment'] ) {
		array_push( $classes, 'justify-content-center' );
	}
	if ( 'right' === $attributes['alignment'] ) {
		array_push( $classes, 'justify-content-end' );
	}
}
if ( array_key_exists( 'verticalAlignment', $attributes ) ) {
	if ( 'top' === $attributes['verticalAlignment'] ) {
		array_push( $classes, 'align-items-start' );
	}
	if ( 'center' === $attributes['verticalAlignment'] ) {
		array_push( $classes, 'align-items-center' );
	}
	if ( 'bottom' === $attributes['verticalAlignment'] ) {
		array_push( $classes, 'align-items-end' );
	}
}

/**
 * Filters row block classes.
 *
 * @since 1.5.0
 *
 * @param string $classes Classes which should be added to the block.
 * @param array $attributes Block attributes.
 */
$classes = apply_filters( 'wp_bootstrap_blocks_row_classes', $classes, $attributes );
?>
<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
	<?php echo $content; // phpcs:ignore ?>
</div>
