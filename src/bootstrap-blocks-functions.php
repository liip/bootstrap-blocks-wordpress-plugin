<?php
function bootstrap_blocks_get_template( $template_name, $attributes, $content = '', $template_path = '', $default_path = '' ) {
	$located = bootstrap_blocks_locate_template( $template_name, $template_path, $default_path );

	if ( ! file_exists( $located ) ) {
		/* translators: %s template */
		_doing_it_wrong( __FUNCTION__, sprintf( __( '%s does not exist.', 'bootstrap-blocks' ), '<code>' . $located . '</code>' ), '1.0' );
		return '';
	}

	// Allow 3rd party plugins or themes to filter the located template file
	$located = apply_filters( 'bootstrap_blocks_get_template', $located, $template_name, $template_path, $default_path );

	// Start output capture.
	ob_start();

	require $located;

	// Record output.
	$html = ob_get_contents();
	ob_end_clean();

	return $html;
}

function bootstrap_blocks_locate_template( $template_name, $template_path = '', $default_path = '' ) {
	// If template path is not set get plugin from defined bootstrap_blocks_template_path (default: bootstrap-blocks/)
	if ( ! $template_path ) {
		$template_path = apply_filters( 'bootstrap_blocks_template_path', 'bootstrap-blocks/' );
	}

	// If default path is not set, get template from plugin directory
	if ( ! $default_path ) {
		$default_path = untrailingslashit( plugin_dir_path( BOOTSTRAP_BLOCKS_PLUGIN_FILE ) ) . '/src/templates/';
	}

	// Add template file extension if missing
	if ( ! preg_match('/(\.php)$/i', $template_name ) ) {
		$template_name .= '.php';
	}

	// Look for template within passed path in current theme or in root of the theme
	$template = locate_template(
		array(
			trailingslashit( $template_path ) . $template_name,
			$template_name,
		)
	);

	// Get template from plugin directory
	if ( ! $template ) {
		$template = $default_path . $template_name;
	}

	return apply_filters( 'bootstrap_blocks_locate_template', $template, $template_name, $template_path );
}
