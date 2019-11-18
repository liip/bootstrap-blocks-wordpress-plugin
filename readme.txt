=== Bootstrap Blocks ===
Contributors: liip, tschortsch
Donate link: https://liip.ch/
Tags: gutenberg, blocks, bootstrap
Requires at least: 5.0
Tested up to: 5.3.0
Requires PHP: 5.6
Stable tag: 1.4.0
License: GPLv2
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Bootstrap 4 Gutenberg Blocks for WordPress.

== Description ==

This plugin adds Bootstrap components and layout options as Gutenberg blocks.

The following blocks are currently available:

* Container
* Grid (Row / Column)
* Button

= Bootstrap library =

Please be aware that this plugin does not include the Bootstrap library in your website. You need to do this for yourself. We decided not to include the library so that you can modify Bootstrap to your own needs before loading it.

The easiest way to do this is to add the following to your theme's `function.php`. You'll find an example for that in the [documentation](https://github.com/liip/bootstrap-blocks-wordpress-plugin).

= Templates =

All blocks are implemented as [dynamic blocks](https://wordpress.org/gutenberg/handbook/designers-developers/developers/tutorials/block-tutorial/creating-dynamic-blocks/). This makes it possible to overwrite the template of a block in your theme.

To overwrite a block template create a folder called `wp-bootstrap-blocks/` in your theme directory. You can copy the original template from `wp-bootstrap-blocks/src/templates/<blockname>.php` as a starting point and adjust it to your needs.

= Requirements =

* WordPress >= 5.0
* PHP >= 5.6

= Further Information =

* Documentation: [https://github.com/liip/bootstrap-blocks-wordpress-plugin](https://github.com/liip/bootstrap-blocks-wordpress-plugin)
* WordPress Plugin: [https://wordpress.org/plugins/wp-bootstrap-blocks](https://wordpress.org/plugins/wp-bootstrap-blocks)
* GitHub Repository: [https://github.com/liip/bootstrap-blocks-wordpress-plugin](https://github.com/liip/bootstrap-blocks-wordpress-plugin)
* Changelog: [https://github.com/liip/bootstrap-blocks-wordpress-plugin/releases](https://github.com/liip/bootstrap-blocks-wordpress-plugin/releases)
* Issue tracker: [https://github.com/liip/bootstrap-blocks-wordpress-plugin/issues](https://github.com/liip/bootstrap-blocks-wordpress-plugin/issues)

== Installation ==

1. Upload the `wp-bootstrap-blocks` directory into the `/wp-content/plugins/` directory
1. Activate the plugin through the `Plugins` menu in WordPress
1. Start adding blocks from the `Bootstrap Blocks` category

== Frequently Asked Questions ==

= Is Bootstrap included? =

No. This plugin doesn't load the Bootstrap library for you. You have to do this for yourself in your theme. Please read more about this in the [documentation](https://github.com/liip/bootstrap-blocks-wordpress-plugin).

= Have you found a bug or do you have a feature request? =

Please create a new GitHub issue and let us know: [https://github.com/liip/bootstrap-blocks-wordpress-plugin/issues](https://github.com/liip/bootstrap-blocks-wordpress-plugin/issues)

== Screenshots ==

1. Bootstrap Blocks in Gutenberg editor

== Changelog ==

= 1.4.0 =

* [CHANGE] Decrease loading priority of block editor assets to ensure that custom block filters are executed.
* [CHANGE] Add custom classes of row block to row-div instead of wrapper-div.
* [FEATURE] Added possibility to define equal-width columns.
* [IMPROVEMENT] Improve template selection button styling when using a custom icon.
* [IMPROVEMENT] Optimized editor styling of grid.
* [IMPROVEMENT] Do not limit the width of child blocks inside the container block.
* Modified Templates: `column.php`, `row.php`

= 1.3.1 =

* [FIX] Fix meaning of `wpBootstrapBlocks.row.useOldObjectTemplateStructure` filter. In v1.3.0 boolean value was inverted.
* [FIX] Fix add default icon to template if it's missing.

= 1.3.0 =

In this release we changed the template structure for the `row` block form object to array (see [template update guide](https://github.com/liip/bootstrap-blocks-wordpress-plugin#update-template-structure-from-120-to-130)). With this change we try to move towards the new template structure which will be introduced by the `InnerBlocks` template selector feature.

If you used the `wpBootstrapBlocks.row.templates` filter to modify the existing row templates please update your template structure accordingly (see [filter documentation](https://github.com/liip/bootstrap-blocks-wordpress-plugin#wpbootstrapblocksrowtemplates)). The old structure will still work but is deprecated.

As soon as you have updated your template structure you need to disable the old object template structure with the [`wpBootstrapBlocks.row.useOldObjectTemplateStructure` filter](https://github.com/liip/bootstrap-blocks-wordpress-plugin#wpbootstrapblocksrowuseoldobjecttemplatestructure).

* [IMPROVEMENT] Improve template selection in row block. Added possibility to set an icon for each template.
* [IMPROVEMENT] Use withSelect / withDispatch HOCs in row block.

= 1.2.0 =

* [FEATURE] Added new filter `wp_bootstrap_blocks_enqueue_block_assets` to disable enqueuing block assets.
* [FIX] Fix enqueuing of script and style dependencies.

= 1.1.0 =

* [FEATURE] Added possibility to set background color on column block.
* [IMPROVEMENT] Optimized editor styling of row block.
* Modified Templates: `button.php`, `column.php`, `row.php`

= 1.0.0 =

* Initial release of this plugin

== Upgrade Notice ==

= 1.0.0 =

Initial release.
