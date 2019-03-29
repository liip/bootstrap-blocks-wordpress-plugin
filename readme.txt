=== Bootstrap Blocks ===
Contributors: liip, tschortsch
Donate link: https://liip.ch/
Tags: gutenberg, blocks, bootstrap
Requires at least: 5.0
Tested up to: 5.1.1
Requires PHP: 5.6
Stable tag: 1.0.0
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
* WordPress Plugin: [https://wordpress.org/plugins/bootstrap-blocks/](https://wordpress.org/plugins/bootstrap-blocks/)
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

= 1.0.0 =

* Initial release of this plugin

== Upgrade Notice ==

= 1.0.0=

Initial release.
