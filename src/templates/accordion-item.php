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

$title = '';
if (array_key_exists('title', $attributes)) {
	$title = $attributes['title'];
}


$column_content_classes = apply_filters('wp_bootstrap_blocks_column_content_classes', '', $attributes);
$accordionItemId ='btn-' .  $attributes['clientId'];
$accordionItemContentId = 'content-' . $attributes['clientId'] ;
$accordionId = 'accordion-' . $attributes['parentClientId'];
$alwaysOpen =  $attributes['alwaysOpen'];


?>
<div class="accordion-item">
	<h2 class="accordion-header" id="<?php echo $accordionItemId; ?>">
		<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
				data-bs-target="#<?php echo $accordionItemContentId; ?>" aria-expanded="true"
				aria-controls="<?php echo $accordionItemContentId; ?>">
			<?php echo $title; ?>
		</button>
	</h2>
	<div id="<?php echo $accordionItemContentId; ?>" class="accordion-collapse collapse"
		 aria-labelledby="<?php echo $accordionItemId; ?>" <?php echo ($accordionId && !$alwaysOpen ) ? 'data-bs-parent="#' . $accordionId . '"' : '' ?>>
		<div
			class="accordion-body">
			<?php echo $content; // phpcs:ignore ?>
		</div>
	</div>
</div>
