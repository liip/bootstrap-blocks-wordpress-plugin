<?php
get_header();
?>

	<section>

		<?php
		if ( have_posts() ) {

			// Load posts loop.
			while ( have_posts() ) {
				the_post();
				?>
				<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
					<header class="entry-header">
						<?php the_title( '<h1>', '</h1>' ); ?>
					</header>

					<div class="excerpt">
						<?php the_excerpt(); ?>
					</div>

					<div class="entry-content">
						<?php the_content(); ?>
					</div>
				</article>
				<?php
			}

		}
		?>

	</section>

	<?php dynamic_sidebar( 'home_right_1' ); ?>

<?php
get_footer();
