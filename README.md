# Bootstrap Gutenberg Blocks for WordPress

[![Build Status](https://github.com/liip/bootstrap-blocks-wordpress-plugin/workflows/Lint%20Test%20Deploy/badge.svg?branch=master)](https://github.com/liip/bootstrap-blocks-wordpress-plugin/actions?query=workflow%3A%22Lint+Test+Deploy%22+branch%3Amaster)

Bootstrap Gutenberg Blocks for WordPress. This plugin adds Bootstrap components and layout options as Gutenberg blocks.

## Features

* Supports Bootstrap v5 and v4
* Support for CSS grid (experimental)
* Fully customizable with filters
* Configuration via option page or programmatically with constants
* Block templates can be overwritten in your theme

## Available blocks

### Container

#### Options

* Fluid: If enabled the container will use the full available width, spanning the entire width of the viewport.
* Fluid Breakpoint: Used to enable [responsive containers](https://getbootstrap.com/docs/4.4/layout/overview/#responsive). This feature only works with Bootstrap v4.4+. The container will use 100% of the width until the specified breakpoint is reached, after which the defined max-widths will apply for each of the higher breakpoints.
* Margin After: Define a margin which should be added after the container.

### Row

#### Options

* Template: Choose from a predefined template for the inner `column` blocks.
* No Gutters: Disable gutters between columns.
* Alignment: Horizontal alignment of inner `column` blocks.
* Vertical Alignment: Vertical alignment of inner `column` blocks.
* Editor stack columns: Displays stacked columns in the editor to enhance readability of block content.
* Horizontal Gutters: Size of horizontal gutters.
* Vertical Gutters: Size of vertical gutters.
* CSS Grid Gutters: Size of gutters when CSS grid is used.

### Column

#### Options

* Sizes for all breakpoints (xxl, xl, lg, md, sm, xs): How much space the column should use for the given breakpoint.
* Equal width for all breakpoints (xxl, xl, lg, md, sm, xs): If enabled column will spread width evenly with other columns.
* Background Color: Set background color to column.
* Content vertical alignment: Align content vertically in column. This option is only needed if a background color is set. Otherwise use the **Alignment** option of the outer `row` block.
* Padding: Define padding inside the column.

### Button

#### Options

* Style: Choose the styling of the button.
* Open in new tab: Choose if link should be opened in a new tab.
* Rel: Set rel attribute of the link.
* Alignment: Horizontal alignment of the button.

## Further Information

* Documentation: [https://github.com/liip/bootstrap-blocks-wordpress-plugin](https://github.com/liip/bootstrap-blocks-wordpress-plugin)
* WordPress Plugin: [https://wordpress.org/plugins/wp-bootstrap-blocks](https://wordpress.org/plugins/wp-bootstrap-blocks)
* Changelog: [https://github.com/liip/bootstrap-blocks-wordpress-plugin/releases](https://github.com/liip/bootstrap-blocks-wordpress-plugin/releases)
* Issue tracker: [https://github.com/liip/bootstrap-blocks-wordpress-plugin/issues](https://github.com/liip/bootstrap-blocks-wordpress-plugin/issues)

## Supported Bootstrap versions

This plugin supports Bootstrap v4 and v5.

The version can be selected in the plugin settings (Settings > Bootstrap Blocks) or by defining the `WP_BOOTSTRAP_BLOCKS_BOOTSTRAP_VERSION` constant in the `wp-config.php` file:

* Bootstrap 4 (default): `define( 'WP_BOOTSTRAP_BLOCKS_BOOTSTRAP_VERSION', '4' );`
* Bootstrap 5: `define( 'WP_BOOTSTRAP_BLOCKS_BOOTSTRAP_VERSION', '5' );`

Possible values right now are `'4'` or `'5'`. By default Bootstrap version **4** is selected.

## CSS Grid

The [CSS grid](https://getbootstrap.com/docs/5.1/layout/css-grid/) (supported with Bootstrap >= 5.1.0) can be enabled in the plugin settings (Settings > Bootstrap Blocks) or by defining the `WP_BOOTSTRAP_BLOCKS_ENABLE_CSS_GRID` constant in the `wp-config.php` file:

eg. `define( 'WP_BOOTSTRAP_BLOCKS_ENABLE_CSS_GRID', true );`

When the CSS grid is enabled the `row` and the `column` blocks will use custom templates for the rendering process:

* Row: `row-css.grid.php`
* Column: `column-css-grid.php`

The support is still experimental since it's also marked as experimental in the Bootstarp library. Please read the official [Bootstrap documentation](https://getbootstrap.com/docs/5.1/layout/css-grid/) to get more information on how to use it.

## Bootstrap library

Please be aware that this plugin does not include the Bootstrap library in your website. You need to do this by yourself. 
We decided not to include the library so that you can modify Bootstrap to your own needs before loading it.

The easiest way to do this is to add the following to your theme's `functions.php`:

```php
function mytheme_load_bootstrap() {
    if ( is_admin() ) {
        return;
    }

    wp_enqueue_style( 'bootstrap', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css', array(), '4.3.1' );
    wp_deregister_script( 'jquery' ); // Remove WP jQuery version
    wp_enqueue_script( 'jquery', 'https://code.jquery.com/jquery-3.3.1.slim.min.js', array(), '3.3.1', true );
    wp_enqueue_script( 'popper.js', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js', array(), '1.14.7', true );
    wp_enqueue_script( 'bootstrap', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js', array(), '4.3.1', true );
}
add_action( 'wp_enqueue_scripts', 'mytheme_load_bootstrap' );
```

## Templates

All blocks are implemented as [dynamic blocks](https://wordpress.org/gutenberg/handbook/designers-developers/developers/tutorials/block-tutorial/creating-dynamic-blocks/).
This makes it possible to overwrite the template of a block in your theme.

To overwrite a block template create a folder called `wp-bootstrap-blocks/` in your theme directory.
You can copy the original template from `wp-bootstrap-blocks/src/templates/<blockname>.php` as a starting point and adjust it to your needs.

## PHP Filters

The plugin provides the following PHP filters.
Please visit the following page to get more information about PHP filters: <https://developer.wordpress.org/reference/functions/add_filter/>.

### wp_bootstrap_blocks_template_path

Changes the default theme directory name (`wp-bootstrap-blocks/`).

#### Usage

```php
add_filter( 'wp_bootstrap_blocks_template_path', 'my_template_path', 10, 1 );

function my_template_path( $template_path ) {
    return 'block-templates/';
}
```

#### Parameters

* `$template_path` (`string`) Template directory name in theme. (Default: `'wp-bootstrap-blocks/'`)

### wp_bootstrap_blocks_get_template

Possibility to overwrite the located template path before it gets loaded.

#### Parameters

* `$located` (`string`) located file path.
* `$template_name` (`string`) template name which was requested.
* `$template_path` (`string`) path to template directory.
* `$default_path` (`string`) default template directory path.

#### Usage

```php
add_filter( 'wp_bootstrap_blocks_get_template', 'my_located_template', 10, 4 );

function my_located_template( $located, $template_name, $template_path, $default_path ) {
    return 'mytheme/special-templates/block.php';
}
```

### wp_bootstrap_blocks_locate_template

Possibility to overwrite the located template path.

#### Parameters

* `$template` (`string`) located file path.
* `$template_name` (`string`) template name which was requested.
* `$template_path` (`string`) path to template directory.

#### Usage

```php
add_filter( 'wp_bootstrap_blocks_locate_template', 'my_template_locater', 10, 3 );

function my_template_locater( $template, $template_name, $template_path ) {
    return 'mytheme/special-templates/block.php';
}
```

### wp_bootstrap_blocks_row_classes

Change classes of row block.

#### Parameters

* `$classes` (`array`) Classes which are added to the block template.
* `$attributes` (`array`) Attributes of the block.

#### Usage

```php
add_filter( 'wp_bootstrap_blocks_row_classes', 'my_custom_row_classes', 10, 2 );

function my_custom_row_classes( $classes, $attributes ) {
    return [ 'my', 'custom', 'classes' ];
}
```

### wp_bootstrap_blocks_row_css_grid_classes

Change classes of row block when CSS grid is enabled.

#### Parameters

* `$classes` (`array`) Classes which are added to the block template.
* `$attributes` (`array`) Attributes of the block.

#### Usage

```php
add_filter( 'wp_bootstrap_blocks_row_css_grid_classes', 'my_custom_row_css_grid_classes', 10, 2 );

function my_custom_row_css_grid_classes( $classes, $attributes ) {
    return [ 'my', 'custom', 'classes' ];
}
```

### wp_bootstrap_blocks_row_css_grid_styles

Change inline styles of row block when CSS grid is enabled.

#### Parameters

* `$styles` (`string`) Inline styles which are added to the block template.
* `$attributes` (`array`) Attributes of the block.

#### Usage

```php
add_filter( 'wp_bootstrap_blocks_row_css_grid_styles', 'my_custom_row_css_grid_styles', 10, 2 );

function my_custom_row_css_grid_styles( $styles, $attributes ) {
    return '--bs-gap: 3rem;';
}
```

### wp_bootstrap_blocks_column_classes

Change classes of column block.

#### Parameters

* `$classes` (`array`) Classes which are added to the block template.
* `$attributes` (`array`) Attributes of the block.

#### Usage

```php
add_filter( 'wp_bootstrap_blocks_column_classes', 'my_custom_column_classes', 10, 2 );

function my_custom_column_classes( $classes, $attributes ) {
    return [ 'my', 'custom', 'classes' ];
}
```

### wp_bootstrap_blocks_column_css_grid_classes

Change classes of column block when CSS grid is enabled.

#### Parameters

* `$classes` (`array`) Classes which are added to the block template.
* `$attributes` (`array`) Attributes of the block.

#### Usage

```php
add_filter( 'wp_bootstrap_blocks_column_css_grid_classes', 'my_custom_column_css_grid_classes', 10, 2 );

function my_custom_column_css_grid_classes( $classes, $attributes ) {
    return [ 'my', 'custom', 'classes' ];
}
```

### wp_bootstrap_blocks_column_content_classes

Change classes of the inner content of the column block.

#### Parameters

* `$classes` (`array`) Classes which are added to the block template.
* `$attributes` (`array`) Attributes of the block.

#### Usage

```php
add_filter( 'wp_bootstrap_blocks_column_content_classes', 'my_custom_column_content_classes', 10, 2 );

function my_custom_column_content_classes( $classes, $attributes ) {
    return [ 'my', 'custom', 'classes' ];
}
```

### wp_bootstrap_blocks_column_css_grid_content_classes

Change classes of the inner content of the column block when CSS grid is enabled.

#### Parameters

* `$classes` (`array`) Classes which are added to the block template.
* `$attributes` (`array`) Attributes of the block.

#### Usage

```php
add_filter( 'wp_bootstrap_blocks_column_css_grid_content_classes', 'my_custom_column_css_grid_content_classes', 10, 2 );

function my_custom_column_css_grid_content_classes( $classes, $attributes ) {
    return [ 'my', 'custom', 'classes' ];
}
```

### wp_bootstrap_blocks_container_classes

Change classes of container block.

#### Parameters

* `$classes` (`array`) Classes which are added to the block template.
* `$attributes` (`array`) Attributes of the block.

#### Usage

```php
add_filter( 'wp_bootstrap_blocks_container_classes', 'my_custom_container_classes', 10, 2 );

function my_custom_container_classes( $classes, $attributes ) {
    return [ 'my', 'custom', 'classes' ];
}
```

### wp_bootstrap_blocks_button_classes

Change classes of button block.

#### Parameters

* `$classes` (`array`) Classes which are added to the block template.
* `$attributes` (`array`) Attributes of the block.

#### Usage

```php
add_filter( 'wp_bootstrap_blocks_button_classes', 'my_custom_button_classes', 10, 2 );

function my_custom_button_classes( $classes, $attributes ) {
    return [ 'my', 'custom', 'classes' ];
}
```

### wp_bootstrap_blocks_button_wrapper_classes

Change classes of button block wrapper.

#### Parameters

* `$classes` (`array`) Classes which are added to the block template.
* `$attributes` (`array`) Attributes of the block.

#### Usage

```php
add_filter( 'wp_bootstrap_blocks_button_wrapper_classes', 'my_custom_button_wrapper_classes', 10, 2 );

function my_custom_button_wrapper_classes( $classes, $attributes ) {
    return [ 'my', 'custom', 'classes' ];
}
```

### wp_bootstrap_blocks_row_default_attributes

Modify default attributes of the row block.

#### Parameters

* `$default_attributes` (`array`) Default attributes of row block.
    * `template` (`string`) Name of default template of row block (Default: `'1-1'`)
    * `noGutters` (`boolean`) Defines if noGutters option should be selected or not (Default: `false`)
    * `alignment` (`'left'` | `'center'` | `'right'`) Default horizontal alignment of inner columns (Default: `''`)
    * `verticalAlignment` (`'top'` | `'center'` | `'bottom'`) Default vertical alignment of inner columns (Default: `''`)
    * `editorStackColumns` (`boolean`) Defines if editorStackColumns option should be selected by default or not (Default: `false`)
    * `horizontalGutters` (`string`) Default horizontal gutters size (Default: `''`)
    * `verticalGutters` (`string`) Default vertical gutters size (Default: `''`)
    * `cssGridGutters` (`string`) Default gutters size when CSS grid is enabled (Default: `''`)

#### Usage

```php
add_filter( 'wp_bootstrap_blocks_row_default_attributes', 'my_row_default_attributes', 10, 1 );

function my_row_default_attributes( $default_attributes ) {
    $default_attributes['template'] = '1-2';
    $default_attributes['noGutters'] = true;
    $default_attributes['alignment'] = 'right';
    $default_attributes['verticalAlignment'] = 'bottom';
    $default_attributes['editorStackColumns'] = true;
    $default_attributes['horizontalGutters'] = 'gx-5';
    $default_attributes['verticalGutters'] = 'gy-3';
    return $default_attributes;
}
```

### wp_bootstrap_blocks_column_default_attributes

Modify default attributes of the column block.

#### Parameters

* `$default_attributes` (`array`) Default attributes of column block.
    * `sizeXxl` (`int`) Default xxl column size (Default: `0`)
    * `sizeXl` (`int`) Default xl column size (Default: `0`)
    * `sizeLg` (`int`) Default lg column size (Default: `0`)
    * `sizeMd` (`int`) Default md column size (Default: `0`)
    * `sizeSm` (`int`) Default sm column size (Default: `0`)
    * `sizeXs` (`int`) Default xs column size (Default: `12`))
    * `equalWidthXxl` (`boolean`) Defines if equal-width xxl option should be selected or not (Default: `false`)
    * `equalWidthXl` (`boolean`) Defines if equal-width xl option should be selected or not (Default: `false`)
    * `equalWidthLg` (`boolean`) Defines if equal-width lg option should be selected or not (Default: `false`)
    * `equalWidthMd` (`boolean`) Defines if equal-width md option should be selected or not (Default: `false`)
    * `equalWidthSm` (`boolean`) Defines if equal-width sm option should be selected or not (Default: `false`)
    * `equalWidthXs` (`boolean`) Defines if equal-width xs option should be selected or not (Default: `false`)
    * `bgColor` (`string`) Background color of column (Default: `''`)
    * `contentVerticalAlignment` (`'top'` | `'center'` | `'bottom'`) Default vertical alignment of content (Default: `''`)
    * `padding` (`string`) Padding inside column (Default: `''`)

#### Usage

```php
add_filter( 'wp_bootstrap_blocks_column_default_attributes', 'my_column_default_attributes', 10, 1 );

function my_column_default_attributes( $default_attributes ) {
    $default_attributes['sizeLg'] = 4;
    $default_attributes['sizeMd'] = 6;
    $default_attributes['equalWidthXl'] = true;
    $default_attributes['bgColor'] = 'primary';
    $default_attributes['padding'] = 'p-3';
    $default_attributes['contentVerticalAlignment'] = 'bottom';
    return $default_attributes;
}
```

### wp_bootstrap_blocks_container_default_attributes

Modify default attributes of the container block.

#### Parameters

* `$default_attributes` (`array`) Default attributes of container block.
    * `isFluid` (`boolean`) Defines if container should be fluid or not (Default: `false`)
    * `marginAfter` (`string`) Default margin after container block (Default: `'mb-2'`)

#### Usage

```php
add_filter( 'wp_bootstrap_blocks_container_default_attributes', 'my_container_default_attributes', 10, 1 );

function my_container_default_attributes( $default_attributes ) {
    $default_attributes['isFluid'] = true;
    $default_attributes['fluidBreakpoint'] = 'md';
    $default_attributes['marginAfter'] = 'mb-3';
    return $default_attributes;
}
```

### wp_bootstrap_blocks_button_default_attributes

Modify default attributes of the button block.

#### Parameters

* `$default_attributes` (`array`) Default attributes of button block.
    * `url` (`string`) Default url of the button (Default: `''`)
    * `linkTarget` (`string`) Default link target (Default: `''`). Possible values:
        * `''`: Target attribute empty
        * `_blank`: Target attribute is set to `_blank`
    * `rel` (`string`) Default rel attribute of the link (Default: `''`)
    * `text` (`string`) Default text of the button (Default: `''`)
    * `style` (`string`) Default style of the button (Default: `''`)
    * `alignment` (`string`) Default alignment of the button (Default: `''`)

#### Usage

```php
add_filter( 'wp_bootstrap_blocks_button_default_attributes', 'my_button_default_attributes', 10, 1 );

function my_button_default_attributes( $default_attributes ) {
    $default_attributes['url'] = 'https://getbootstrap.com/';
    $default_attributes['linkTarget'] = '_blank';
    $default_attributes['rel'] = 'noreferrer noopener';
    $default_attributes['text'] = 'Bootstrap';
    $default_attributes['style'] = 'secondary';
    $default_attributes['alignment'] = 'right';
    return $default_attributes;
}
```

### wp_bootstrap_blocks_enqueue_block_assets

Possibility to disable enqueuing block assets.

#### Parameters

* `$enqueue_block_assets` (`boolean`) Defines if block assets should be enqueued. (Default: `true`)

#### Usage

```php
add_filter( 'wp_bootstrap_blocks_enqueue_block_assets', 'disable_enqueue_block_assets', 10, 1 );

function disable_enqueue_block_assets( $enqueue_block_assets ) {
    // Disable enqueuing block assets
    return false;
}
```

## PHP Actions

### wp-bootstrap-blocks_updated

Fires when a new version of the plugin is used for the first time.

#### Parameters

* `$new_version` (`string`) New version number.
* `$old_version` (`string`) Old version number.

#### Usage

```php
add_action( 'wp-bootstrap-blocks_updated', 'my_after_plugin_update', 10, 2 );

function my_after_plugin_update( $new_version, $old_version ) {
    echo "wp-bootstrap-blocks got updated from v" . $old_version . " to v" . $new_version;
}
```

## JavaScript Filters

The plugin provides the following JavaScript filters.
They can be used by enqueuing a custom JavaScript file which implements those filters.

Example:

If you have a script called `block-filters.js` inside your theme root you can enqueue it by adding the following code to your `functions.php` file.

```php
function mytheme_enqueue_block_editor_assets() {
	wp_enqueue_script( 'block-filters', get_stylesheet_directory_uri() . '/block-filters.js', array( 'wp-hooks' ), '1.0.0', true );
}
add_action( 'enqueue_block_editor_assets', 'mytheme_enqueue_block_editor_assets' );
```

Please visit the following page to get further instructions on how to use JavaScript filters: <https://developer.wordpress.org/block-editor/developers/filters/block-filters/>.

### wpBootstrapBlocks.button.styleOptions

Modify available button styles.

#### Usage

```javascript
function myButtonStyleOptions( styleOptions ) {
	styleOptions.push( { label: 'My Option', value: 'my-option' } );
	return styleOptions;
}
wp.hooks.addFilter(
	'wpBootstrapBlocks.button.styleOptions',
	'myplugin/wp-bootstrap-blocks/button/styleOptions',
	myButtonStyleOptions
);
```

#### Parameters

* `styleOptions` (`Array`) Array with button style options.

### wpBootstrapBlocks.container.marginAfterOptions

Modify margin after options.

#### Usage

```javascript
function myMarginAfterOptions( marginAfterOptions ) {
	marginAfterOptions.push( { label: 'Huge', value: 'mb-8' } );
	return marginAfterOptions;
}
wp.hooks.addFilter(
	'wpBootstrapBlocks.container.marginAfterOptions',
	'myplugin/wp-bootstrap-blocks/container/marginAfterOptions',
	myMarginAfterOptions
);
```

#### Parameters

* `marginAfterOptions` (`Array`) Array margin options.

### wpBootstrapBlocks.row.templates

Define block templates.

#### Usage

```javascript
function myRowTemplates( templates ) {
	templates.push( {
		name: '1-3',
		title: '2 Columns (1:3)',
		icon: 'layout',
		templateLock: 'all',
		template: [
			[
				'wp-bootstrap-blocks/column',
				{
					sizeMd: 3,
				},
			],
			[
				'wp-bootstrap-blocks/column',
				{
					sizeMd: 9,
				},
			],
		],
	} );
	return templates;
}
wp.hooks.addFilter(
	'wpBootstrapBlocks.row.templates',
	'myplugin/wp-bootstrap-blocks/row/templates',
	myRowTemplates
);
```

#### Parameters

* `templates` (`array`) List of template objects.

Each template has the following attributes:

* `name` (`string`) Unique identifier of the template
* `title` (`string`) Name of template
* `icon` (`WPElement|string`) An element or [Dashicon](https://developer.wordpress.org/resource/dashicons/) slug to show as a visual approximation of the template.
* `templateLock` (`string|false`)
    * `false`: Columns can be added and removed
    * `all`: Columns can't be changed
* `template` (`Array<Array>`) see [template documentation](https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-templates/#api)
    * Name of block. (Only `wp-bootstrap-blocks/column` supported!)
    * Attributes of column

### wpBootstrapBlocks.row.enableCustomTemplate

Enable/Disable custom option in row templates.

#### Usage

```javascript
// Disable custom row template
wp.hooks.addFilter(
	'wpBootstrapBlocks.row.enableCustomTemplate',
	'myplugin/wp-bootstrap-blocks/row/enableCustomTemplate',
	() => false
);
```

#### Parameters

* `enableCustomTemplate` (`boolean`) Return true if custom row template should be enabled. (Default: `true`)

### wpBootstrapBlocks.row.horizontalGuttersOptions

Modify available horizontal gutters options for row block.

#### Usage

```javascript
function myRowHorizontalGuttersOptions( horizontalGuttersOptions ) {
	horizontalGuttersOptions.push( { label: 'Medium', value: 'gx-4' } );
	return horizontalGuttersOptions;
}
wp.hooks.addFilter(
	'wpBootstrapBlocks.row.horizontalGuttersOptions',
	'myplugin/wp-bootstrap-blocks/row/horizontalGuttersOptions',
	myRowHorizontalGuttersOptions
);
```

#### Parameters

* `horizontalGuttersOptions` (`Array`) Array of horizontal gutters options.

### wpBootstrapBlocks.row.verticalGuttersOptions

Modify available vertical gutters options for row block.

#### Usage

```javascript
function myRowVerticalGuttersOptions( verticalGuttersOptions ) {
	verticalGuttersOptions.push( { label: 'Medium', value: 'gy-4' } );
	return verticalGuttersOptions;
}
wp.hooks.addFilter(
	'wpBootstrapBlocks.row.verticalGuttersOptions',
	'myplugin/wp-bootstrap-blocks/row/verticalGuttersOptions',
	myRowVerticalGuttersOptions
);
```

#### Parameters

* `verticalGuttersOptions` (`Array`) Array of vertical gutters options.

### wpBootstrapBlocks.row.cssGridGuttersOptions

Modify available CSS grid gutters options for row block.

#### Usage

```javascript
function myRowCssGridGuttersOptions( cssGridGuttersOptions ) {
	cssGridGuttersOptions.push( { label: 'Medium', value: '1.5rem' } );
	return cssGridGuttersOptions;
}
wp.hooks.addFilter(
	'wpBootstrapBlocks.row.cssGridGuttersOptions',
	'myplugin/wp-bootstrap-blocks/row/cssGridGuttersOptions',
	myRowCssGridGuttersOptions
);
```

#### Parameters

* `cssGridGuttersOptions` (`Array`) Array of CSS grid gutters options.

### wpBootstrapBlocks.column.bgColors

Modify available background colors for column block.

#### Usage

```javascript
function myColumnBgColorOptions( bgColorOptions ) {
	bgColorOptions.push( {
		name: 'brand',
		color: '#6EA644',
	} );
	return bgColorOptions;
}
wp.hooks.addFilter(
	'wpBootstrapBlocks.column.bgColorOptions',
	'myplugin/wp-bootstrap-blocks/column/bgColorOptions',
	myColumnBgColorOptions
);
```

#### Parameters

* `bgColorOptions` (`Array`) Array of available background colors. Each element should be an object containing the `name` of the color and the `color` itself (see: <https://github.com/WordPress/gutenberg/tree/master/packages/components/src/color-palette>).

### wpBootstrapBlocks.column.paddingOptions

Modify available padding options for column block.

#### Usage

```javascript
function myColumnPaddingOptions( paddingOptions ) {
	paddingOptions.push( { label: 'Huge', value: 'p-8' } );
	return paddingOptions;
}
wp.hooks.addFilter(
	'wpBootstrapBlocks.column.paddingOptions',
	'myplugin/wp-bootstrap-blocks/column/paddingOptions',
	myColumnPaddingOptions
);
```

#### Parameters

* `paddingOptions` (`Array`) Array of padding options.

## Developer information

### Requirements

* Node.js >= 16.x
* Docker

### Installation

1. Clone this repository

1. Install composer dependencies

    ```bash
    curl -s https://getcomposer.org/installer | php
    php composer.phar install
    ```

1. Install Node dependencies

    ```bash
    npm install
    ```

### Compile assets

The build process is based on the official [`@wordpress/scripts`](https://developer.wordpress.org/block-editor/packages/packages-scripts/) package.

* `npm start`: Compiles the block in development mode. Watches for any changes and reports back any errors in your code.
* `npm run lint`: Lints JavaScript, CSS and package.json files.
* `npm run build`: Build production code of your blocks inside `build` folder.

### Generate translation files

1. To extract the labels and generate the `languages/wp-bootstrap-blocks.pot` file run the following command:

    ```bash
    ./scripts/translations/extract-messages.sh
    ```

1. To update the translation files (`*.po`) run the following command:

    ```bash
    ./scripts/translations/update-translation-files.sh
    ```

1. To generate the `*.mo` and `*.json` translation files run the following command:

    ```bash
    ./scripts/translations/compile-translation-files.sh
    ```

### Setup local dev environment

The following commands can be used to set up a local dev environment. See the official [documentation of `@wordpress/env`](https://developer.wordpress.org/block-editor/packages/packages-env/#command-reference) for a complete list of commands.

* `npm run wp-env start`: Starts the Docker containers.
* `npm run wp-env stop`: Stops the Docker containers.

### Testing

There are two types of tests for this plugin:

* PHPUnit Tests: Used to validate generated block output. Since this plugin uses dynamic blocks which are rendered on the server side we need to test them with PHPUnit tests.
* Cypress E2E Tests: Used to validate block behaviour in the editor.

#### PHPUnitTests

The PHPUnit tests are stored in the `phpunit/` directory.
They use fixtures to validate the block output.
Each block variant which should be tested needs a manually created file called `blockname__variant.html`.
This file contains the block presentation in the editor (a.k.a. the HTML comment presentation) and needs to be stored in the following folder:

`phpunit/blockname/fixtures/blockname_variant.html`

The second fixture of each variant is the `blockname_variant.output.html` file.
This file gets automatically generated if the test runs for the first time and the environment variable `WP_BOOTSTRAP_BLOCKS_RECORD` in the `phpunit.xml.dist` file is set to `true`.

To run the tests use the following command:

```bash
npm run test:unit:php
```

or the following command to run a specific test:

```bash
npm run test:unit:php -- --filter 'my_test'
```

#### Cypress E2E Tests

The Cypress E2E Tests are stored in the `cypress` directory.

To run the tests use the following command:

```bash
npm run test:e2e
```
