=== Bootstrap Blocks ===
Contributors: liip, tschortsch
Donate link: https://liip.ch/
Tags: gutenberg, blocks, bootstrap
Requires at least: 5.0
Tested up to: 5.5
Requires PHP: 5.6
Stable tag: 2.4.2
License: GPLv2
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Bootstrap 4 Gutenberg Blocks for WordPress.

== Description ==

This plugin adds Bootstrap components and layout options as Gutenberg blocks.

= Available Blocks =

**Container**

Options:

* Fluid: If enabled the container will use the full available width, spanning the entire width of the viewport.
* Fluid Breakpoint: Used to enable [responsive containers](https://getbootstrap.com/docs/4.4/layout/overview/#responsive). This feature only work with Bootstrap v4.4+. The container will use 100% of the width until the specified breakpoint is reached, after which the defined max-widths will apply for each of the higher breakpoints.
* Margin After: Define a margin which should be added after the container.

**Row**

Options:

* Template: Choose from a predefined template for the inner `column` blocks.
* No Gutters: Disable gutters between columns.
* Alignment: Horizontal alignment of inner `column` blocks.
* Vertical Alignment: Vertical alignment of inner `column` blocks.
* Editor stack columns: Displays stacked columns in the editor to enhance readability of block content.

**Column**

Options:

* Sizes for all breakpoints (xl, lg, md, sm, xs): How much space the column should use for the given breakpoint.
* Equal width for all breakpoints (xl, lg, md, sm, xs): If enabled column will spread width evenly with other columns.
* Background Color: Set background color to column.
* Center content: Center content vertically in column. This option is only needed if a background color is set. Otherwise use the **Alignment** option of the outer `row` block.
* Padding: Define padding inside the column.

**Button**

Options:

* Style: Choose the styling of the button.
* Alignment: Horizontal alignment of the button.

= Bootstrap library =

Please be aware that this plugin does not include the Bootstrap library in your website. You need to do this by yourself. We decided not to include the library so that you can modify Bootstrap to your own needs before loading it.

You'll find an example how to include it in your theme's `function.php` in the [documentation](https://github.com/liip/bootstrap-blocks-wordpress-plugin).

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

No. This plugin doesn't load the Bootstrap library for you. You have to do this by yourself in your theme. Please read more about this in the [documentation](https://github.com/liip/bootstrap-blocks-wordpress-plugin).

= Have you found a bug or do you have a feature request? =

Please create a new GitHub issue and let us know: [https://github.com/liip/bootstrap-blocks-wordpress-plugin/issues](https://github.com/liip/bootstrap-blocks-wordpress-plugin/issues)

== Screenshots ==

1. Row block
1. Column block
1. Column block (further settings)
1. Container block

== Changelog ==

= 2.4.2 =

* [FIX] Fix loading of translations.
* [TRANSLATION] Add Swiss-German translation.

= 2.4.1 =

* [FIX] Fix documentation of `wp_bootstrap_blocks_column_default_attributes` filter (see: https://github.com/liip/bootstrap-blocks-wordpress-plugin#wp_bootstrap_blocks_column_default_attributes). `sizeXY` attributes have been defined as `string` values instead of `int` values in example. If you're using this filter please check if you pass the values correctly. Passing `string` values to `int` attributes will stop working in WordPress 5.5.

= 2.4.0 =

* [FEATURE] Possibility to enable stacked layout for column blocks in editor to enhance readability of block content. This feature can be enabled by default by setting the `editorStackColumns` value to `true` in the `wp_bootstrap_blocks_row_default_attributes` PHP filter.

= 2.3.1 =

* [FIX] Regression in built assets which was introduced by the `@wordpress/scripts` package. Using multiple plugins which were built with the `@wordpress/scripts` `build`-script resulted in a JavaScript error.

= 2.3.0 =

* [FEATURE] Visually show all column background colors in editor (not only preconfigured).
* [DEVELOPMENT] Switch from @wordpress/scripts to @wordpress/env for local dev environment.
* [DEVELOPMENT] Use official webpack config from @wordpress/scripts to compile scss files.

= 2.2.0 =

* [IMPROVEMENT] Improve visibility of row, column and container blocks in editor.
* [IMPROVEMENT] Do not automatically insert default block in wrapper blocks (column and container) [WordPress >=5.3].
* [FIX] Replace usage of deprecated packages.

= 2.1.0 =

* **Breaking Change** [CHANGE] Do not render empty content `<div>` in `column` template. This is a rather small change but it could break your current design (if it relies on this `<div>`). Please verify that this isn't the case before updating.
* [FIX] Fix styling issues of column block with WordPress 5.4.
* Modified Templates: `column.php`

= 2.0.1 =

* [IMPROVEMENT] Do not run version check on every request.
* [FIX] Fix styling issues with Gutenberg plugin v7.2.
* [FIX] Fix loading of translation files.
* [FIX] Fix compatibility issues with WordPress <= v5.1.

= 2.0.0 =

This is a major update of the plugin. Please check if the mentioned **breaking changes** affect your code before updating to this version.

* **Breaking Change** [REMOVE] Old object template structure for row templates is not supported anymore! Please update your templates to the new array structure (see [filter documentation](https://github.com/liip/bootstrap-blocks-wordpress-plugin#wpbootstrapblocksrowtemplates)).
* **Breaking Change** [REMOVE] Removed unused `wpBootstrapBlocks.row.useOldObjectTemplateStructure` filter.
* **Breaking Change** [REMOVE] Removed `wpBootstrapBlocks.container.useFluidContainerPerDefault` filter. Please use `wp_bootstrap_blocks_container_default_attributes` filter instead.
* **Breaking Change** [CHANGE] Removed unused wrapper-div from `row` template. The `alignfull` class now gets added directly to the row.
* **Breaking Change** [CHANGE] Renamed `wpBootstrapBlocks.container.customMarginOptions` filter to `wpBootstrapBlocks.container.marginAfterOptions`.
* [FEATURE] Support for [responsive containers](https://getbootstrap.com/docs/4.4/layout/overview/#responsive) which were introduced in Bootstrap 4.4. Use them by setting the `Fluid Breakpoint` option in the container block.
* [FIX] Reset `centerContent` attribute of column block if background-color gets removed.
* [FIX] Check if className attribute isn't empty before adding it to template to avoid empty strings in classes array.
* [FIX] Fix filemtime() warning if asset version couldn't be found.
* Modified Templates: `container.php`, `row.php`, `column.php`, `button.php`

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
