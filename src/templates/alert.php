<?php
/**
 * Template for bootstrap-blocks/alert
 *
 * This template can be overridden by copying it to theme/bootstrap-blocks/alert.php.
 *
 * @package bootstrap-blocks/templates/alert
 * @version 1.0.0
 */

$alert_classes = 'alert';

if ( array_key_exists( 'alignment', $attributes ) ) {
	$alert_classes = $alert_classes . ' text-' . $attributes['alignment'];
}

$alert_classes = array_key_exists( 'style', $attributes )
	? $alert_classes . ' alert-' . $attributes['style']
	: $alert_classes . ' alert-primary';

$is_dismissible = array_key_exists( 'dismissible', $attributes ) && $attributes['dismissible'];

if ( $is_dismissible ) {
	$alert_classes = $alert_classes . ' alert-dismissible fade show';
}

if ( array_key_exists( 'text', $attributes ) ) : ?>
	<div class="<?php echo esc_attr( $alert_classes ); ?>" role="alert">
		<?php echo wp_kses_post( str_replace( '<a ', '<a class="alert-link" ', $attributes['text'] ) ); ?>
		<?php if ( $is_dismissible ) : ?>
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		<?php endif; ?>
	</div>
<?php endif; ?>
