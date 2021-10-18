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


$classes = array( 'wp-bootstrap-blocks-accordion-item', 'accordion-item' );

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
$classes = apply_filters( 'wp_bootstrap_blocks_accordion_item_classes', $classes, $attributes );

$accordion_item_title      = ( array_key_exists( 'title', $attributes ) ) ? $attributes['title'] : '';
$accordion_item_id         = 'btn-' . $attributes['clientId'];
$accordion_item_content_id = 'content-' . $attributes['clientId'];
$accordion_id              = 'accordion-' . $attributes['parentClientId'];
$always_open               = $attributes['alwaysOpen'];

/**
 * Block content.
 * Defined in wp_bootstrap_blocks_get_template() which requires this template.
 *
 * @var $content string
 */

?>
<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
	<h2 class="accordion-header" id="<?php echo esc_attr( $accordion_item_id ); ?>">
		<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
				data-bs-target="#<?php echo esc_attr( $accordion_item_content_id ); ?>" aria-expanded="true"
				aria-controls="<?php echo esc_attr( $accordion_item_content_id ); ?>">
			<?php echo $accordion_item_title; // phpcs:ignore ?>
		</button>
	</h2>
	<div id="<?php echo esc_attr( $accordion_item_content_id ); ?>" class="accordion-collapse collapse" aria-labelledby="<?php echo esc_attr( $accordion_item_id ); ?>" <?php echo ( $accordion_id && ! $always_open ) ? 'data-bs-parent="#' . esc_attr( $accordion_id ) . '"' : ''; ?>>
		<div
			class="accordion-body">
			<?php echo $content; // phpcs:ignore ?>
		</div>
	</div>
</div>
