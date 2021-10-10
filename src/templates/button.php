<?php
/**
 * Template for wp-bootstrap-blocks/button
 *
 * This template can be overridden by copying it to theme/wp-bootstrap-blocks/button.php.
 *
 * @package wp-bootstrap-blocks/templates/button
 * @version 3.1.0
 */

/**
 * Block attributes.
 * Defined in wp_bootstrap_blocks_get_template() which requires this template.
 *
 * The following attributes are available:
 *
 * @var $attributes array(
 *   'url' (boolean) => URL of the button.
 *   'text' (string) => Label of the button.
 *   'style' (string) => Styling of the button (eg. 'primary').
 *   'alignment' (string) => Alignment of the button (eg. 'right').
 *   'className' (string) => Additional class names which should be added to block.
 * )
 */

$classes = array( 'wp-bootstrap-blocks-button' );
$btn_classes = array( 'btn' );

if ( array_key_exists( 'alignment', $attributes ) && ! empty( $attributes['alignment'] ) ) {
	array_push( $classes, ( 'text-' . $attributes['alignment'] ) );
}

if ( array_key_exists( 'className', $attributes ) && ! empty( $attributes['className'] ) ) {
	array_push( $btn_classes, $attributes['className'] );
}
if ( array_key_exists( 'style', $attributes ) && ! empty( $attributes['style'] ) ) {
	array_push( $btn_classes, 'btn-' . $attributes['style'] );
} else {
	array_push( $btn_classes, 'btn-primary' );
}

/**
 * Filters button wrapper block classes.
 *
 * @since 1.0.0
 *
 * @param array $classes Classes which should be added to the wrapper block of the button.
 * @param array $attributes Block attributes.
 */
$classes = apply_filters( 'wp_bootstrap_blocks_button_wrapper_classes', $classes, $attributes );

/**
 * Filters button classes.
 *
 * @since 1.1.0
 *
 * @param string $classes Classes which should be added to the button.
 * @param array $attributes Block attributes.
 */
$btn_classes = apply_filters( 'wp_bootstrap_blocks_button_classes', $btn_classes, $attributes );
?>
<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
	<a
		href="<?php echo esc_url( $attributes['url'] ); ?>"
		<?php if ( ! empty( $attributes['linkTarget'] ) ) : ?>
			target="<?php echo esc_attr( $attributes['linkTarget'] ); ?>"
		<?php endif; ?>
		<?php if ( ! empty( $attributes['rel'] ) ) : ?>
			rel="<?php echo esc_attr( $attributes['rel'] ); ?>"
		<?php endif; ?>
		class="<?php echo esc_attr( implode( ' ', $btn_classes ) ); ?>"
	>
		<?php echo esc_html( $attributes['text'] ); ?>
	</a>
</div>
