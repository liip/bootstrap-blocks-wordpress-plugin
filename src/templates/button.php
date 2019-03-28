<?php
/**
 * Template for wp-bootstrap-blocks/button
 *
 * This template can be overridden by copying it to theme/wp-bootstrap-blocks/button.php.
 *
 * @package wp-bootstrap-blocks/templates/button
 * @version 1.0.0
 */

/**
 * Block attributes.
 * Defined in wp_bootstrap_blocks_get_template() which requires this template.
 *
 * @var $attributes array
 */

$classes = array( 'wp-bootstrap-blocks-button' );
$btn_classes = array( 'btn' );

if ( array_key_exists( 'alignment', $attributes ) && ! empty( $attributes['alignment'] ) ) {
	array_push( $classes, ( 'text-' . $attributes['alignment'] ) );
}

if ( array_key_exists( 'className', $attributes ) ) {
	array_push( $btn_classes, $attributes['className'] );
}
if ( array_key_exists( 'style', $attributes ) && ! empty( $attributes['style'] ) ) {
	array_push( $btn_classes, 'btn-' . $attributes['style'] );
} else {
	array_push( $btn_classes, 'btn-primary' );
}

$classes = apply_filters( 'wp_bootstrap_blocks_button_wrapper_classes', $classes, $attributes );
$btn_classes = apply_filters( 'wp_bootstrap_blocks_classes', $btn_classes, $attributes );
?>
<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
	<a href="<?php echo esc_url( $attributes['url'] ); ?>" class="<?php echo esc_attr( implode( ' ', $btn_classes ) ); ?>">
		<?php echo esc_html( $attributes['text'] ); ?>
	</a>
</div>
