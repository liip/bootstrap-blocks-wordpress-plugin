<?php
/**
 * Template for wp-bootstrap-blocks/row when CSS grid option is enabled.
 *
 * This template can be overridden by copying it to theme/wp-bootstrap-blocks/row-css-grid.php.
 *
 * @package wp-bootstrap-blocks/templates/row-css-grid
 * @version 4.0.0
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
 *   'cssGridGutters' (string) => Size of gutters (eg. '1rem').
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

$classes = array( 'wp-bootstrap-blocks-row', 'grid' );
$styles = '';

if ( array_key_exists( 'className', $attributes ) && ! empty( $attributes['className'] ) ) {
	array_push( $classes, $attributes['className'] );
}
if ( array_key_exists( 'align', $attributes ) && 'full' === $attributes['align'] ) {
	array_push( $classes, 'alignfull' );
}

if ( array_key_exists( 'noGutters', $attributes ) && $attributes['noGutters'] ) {
	$styles = '--bs-gap: 0;';
} elseif ( array_key_exists( 'cssGridGutters', $attributes ) && $attributes['cssGridGutters'] ) {
	$styles = '--bs-gap: ' . $attributes['cssGridGutters'] . ';';
}

/**
 * Filters row block classes.
 *
 * @since 4.0.0
 *
 * @param array $classes Classes which should be added to the block.
 * @param array $attributes Block attributes.
 */
$classes = apply_filters( 'wp_bootstrap_blocks_row_css_grid_classes', $classes, $attributes );

/**
 * Filters row block inline styles.
 *
 * @since 4.0.0
 *
 * @param string $styles Inline styles which should be added to the block.
 * @param array $attributes Block attributes.
 */
$styles = apply_filters( 'wp_bootstrap_blocks_row_css_grid_styles', $styles, $attributes );
?>
<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>"<?php echo ! empty( $styles ) ? ' style="' . esc_attr( $styles ) . '"' : ''; ?>>
	<?php echo $content; // phpcs:ignore ?>
</div>
