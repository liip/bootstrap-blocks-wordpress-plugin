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

$classes = array( 'wp-bootstrap-blocks-accordion', 'accordion' );

if ( array_key_exists( 'className', $attributes ) && ! empty( $attributes['className'] ) ) {
	array_push( $classes, $attributes['className'] );
}

/**
 * Filters accordion block classes.
 *
 * @param array $classes Classes which should be added to the block.
 * @param array $attributes Block attributes.
 *
 * @since 1.0.0
 */
$classes = apply_filters( 'wp_bootstrap_blocks_accordion_classes', $classes, $attributes );

$accordion_id = 'accordion-' . $attributes['clientId'];
?>
<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>" id="<?php echo esc_attr( $accordion_id ); ?>">
	<?php echo $content; // phpcs:ignore ?>
</div>
