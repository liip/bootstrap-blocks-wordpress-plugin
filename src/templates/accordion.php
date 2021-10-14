<?php
/**
 * Template for wp-bootstrap-blocks/accordion-item
 *
 * This template can be overridden by copying it to theme/wp-bootstrap-blocks/accordion-item.php.
 *
 * @package wp-bootstrap-blocks/templates/accordion-item
 * @version 3.3.0
 */

/**
 * Accordion item attributes.
 * Defined in wp_bootstrap_blocks_get_template() which requires this template.
 *
 * The following attributes are available:
 *
 * @var $attributes array(
 *     'title (string)' => title for accordion item
 *   'content (string)'=> content for accordion item
 *   'alignment' (string) => Horizontal alignment of inner columns.
 * )
 */

/**
 * Block content.
 * Defined in wp_bootstrap_blocks_get_template() which requires this template.
 *
 * @var $content string
 */

$classes                = array(
	'accordion-item',
);
$column_content_classes = array();

if ( array_key_exists( 'className', $attributes ) && ! empty( $attributes['className'] ) ) {
	array_push( $classes, $attributes['className'] );
}

if ( array_key_exists( 'alignment', $attributes ) ) {
	if ( 'left' === $attributes['alignment'] ) {
		array_push( $column_content_classes, 'text-start' );
	}
	if ( 'center' === $attributes['alignment'] ) {
		array_push( $column_content_classes, 'text-center' );
	}
	if ( 'right' === $attributes['alignment'] ) {
		array_push( $column_content_classes, 'text-end' );
	}
}


$column_content_classes = array_unique( $column_content_classes );

/**
 * Filters column block classes.
 *
 * @param array $classes Classes which should be added to the block.
 * @param array $attributes Block attributes.
 *
 * @since 1.0.0
 */
$classes = apply_filters( 'wp_bootstrap_blocks_column_classes', $classes, $attributes );

/**
 * Filters column inner content classes.
 *
 * @param array $classes Classes which should be added to the content.
 * @param array $attributes Block attributes.
 *
 * @since 1.5.0
 */
$column_content_classes = apply_filters( 'wp_bootstrap_blocks_column_content_classes', $column_content_classes, $attributes );
$accordion_id           = 'accordion-' . $attributes['clientId'];
?>
<div class="accordion" id="<?php echo esc_attr( $accordion_id ); ?>">
	<?php echo $content; // phpcs:ignore ?>
</div>
