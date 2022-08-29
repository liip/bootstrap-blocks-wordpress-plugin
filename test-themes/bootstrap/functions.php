<?php
function bootstrap_theme_setup() {
	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		)
	);

	// Add support for Block Styles.
	add_theme_support( 'wp-block-styles' );

	// Add support for full and wide align images.
	add_theme_support( 'align-wide' );

	// Add support for editor styles.
	add_theme_support( 'editor-styles' );

	// Add support for editor styles.
	add_post_type_support( 'page', 'excerpt' );

	// Enqueue editor styles.
	add_editor_style( 'style-editor.css' );
}
add_action( 'after_setup_theme', 'bootstrap_theme_setup' );

/**
 * Enqueue scripts and styles.
 */
function bootstrap_scripts() {
	if ( \WP_Bootstrap_Blocks\Settings::is_bootstrap_5_active() ) {
		if ( \WP_Bootstrap_Blocks\Settings::is_css_grid_enabled() ) {
			wp_enqueue_script( 'popper.js', 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js', array(), '2.11.5', true );
			wp_enqueue_style( 'bootstrap5-styles', get_template_directory_uri() . '/bootstrap-with-cssgrid.css', array(), '5.2.0' );
			wp_enqueue_script( 'bootstrap5-scripts', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.min.js', array( 'popper.js' ), '5.2.0', true );
		} else {
			wp_enqueue_script( 'popper.js', 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js', array(), '2.11.5', true );
			wp_enqueue_style( 'bootstrap5-styles', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css', array(), '5.2.0' );
			wp_enqueue_script( 'bootstrap5-scripts', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.min.js', array( 'popper.js' ), '5.2.0', true );
		}
	} else {
		wp_enqueue_script( 'jQuery', 'https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js', array(), '3.5.1', true );
		wp_enqueue_script( 'popper.js', 'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js', array(), '1.16.1', true );
		wp_enqueue_style( 'bootstrap4-styles', 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css', array(), '4.6.2' );
		wp_enqueue_script( 'bootstrap4-scripts', 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js', array( 'jQuery', 'popper.js' ), '4.6.2', true );
	}
}
add_action( 'wp_enqueue_scripts', 'bootstrap_scripts' );

function bootstrap_register_sidebars() {
	register_sidebar( array(
		'name' => 'Home right sidebar',
		'id' => 'home_right_1',
		'before_widget' => '<div>',
		'after_widget' => '</div>',
		'before_title' => '<h2 class="rounded">',
		'after_title' => '</h2>',
	) );
}
add_action( 'widgets_init', 'bootstrap_register_sidebars' );
