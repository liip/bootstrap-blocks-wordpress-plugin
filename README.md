# Bootstrap 4 Gutenberg Blocks for WordPress

[![Build Status](https://travis-ci.org/liip/bootstrap-blocks-wordpress-plugin.svg?branch=master)](https://travis-ci.org/liip/bootstrap-blocks-wordpress-plugin)

This plugin adds Bootstrap components and layout options as Gutenberg blocks.

The following blocks are currently available:

* Container
* Grid (Row / Column)
* Button

## Further Information

* Documentation: [https://github.com/liip/bootstrap-blocks-wordpress-plugin](https://github.com/liip/bootstrap-blocks-wordpress-plugin)
* WordPress Plugin: [https://wordpress.org/plugins/wp-bootstrap-blocks](https://wordpress.org/plugins/wp-bootstrap-blocks)
* Changelog: [https://github.com/liip/bootstrap-blocks-wordpress-plugin/releases](https://github.com/liip/bootstrap-blocks-wordpress-plugin/releases)
* Issue tracker: [https://github.com/liip/bootstrap-blocks-wordpress-plugin/issues](https://github.com/liip/bootstrap-blocks-wordpress-plugin/issues)

## Bootstrap library

Please be aware that this plugin does not include the Bootstrap library in your website. You need to do this for yourself. 
We decided not to include the library so that you can modify Bootstrap to your own needs before loading it.

The easiest way to do this is to add the following to your theme's `function.php`:

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

### wp_bootstrap_blocks_template_path

Changes the default theme directory name (`wp-bootstrap-blocks/`).

#### Usage:

```php
add_filter( 'wp_bootstrap_blocks_template_path', 'my_template_path', 10, 1 );

function my_template_path( $template_path ) {
    return 'block-templates/';
}
```

#### Parameters:

* `$template_path` (`string`) Template directory name in theme. (Default: `'wp-bootstrap-blocks/'`)

### wp_bootstrap_blocks_get_template

Possibility to overwrite the located template path before it gets loaded.

#### Parameters:

* `$located` (`string`) located file path.
* `$template_name` (`string`) template name which was requested.
* `$template_path` (`string`) path to template directory.
* `$default_path` (`string`) default template directory path.

#### Usage:

```php
add_filter( 'wp_bootstrap_blocks_get_template', 'my_located_template', 10, 4 );

function my_located_template( $located, $template_name, $template_path, $default_path ) {
    return 'mytheme/special-templates/block.php';
}
```

### wp_bootstrap_blocks_locate_template

Possibility to overwrite the located template path.

#### Parameters:

* `$template` (`string`) located file path.
* `$template_name` (`string`) template name which was requested.
* `$template_path` (`string`) path to template directory.

#### Usage:

```php
add_filter( 'wp_bootstrap_blocks_locate_template', 'my_template_locater', 10, 3 );

function my_template_locater( $template, $template_name, $template_path ) {
    return 'mytheme/special-templates/block.php';
}
```

### wp_bootstrap_blocks_row_classes

Change classes of row block.

#### Parameters:

* `$classes` (`array`) Classes which are added to the block template.
* `$attributes` (`array`) Attributes of the block.

#### Usage:

```php
add_filter( 'wp_bootstrap_blocks_row_classes', 'my_custom_row_classes', 10, 2 );

function my_custom_row_classes( $classes, $attributes ) {
    return [ 'my', 'custom', 'classes' ];
}
```

### wp_bootstrap_blocks_column_classes

Change classes of column block.

#### Parameters:

* `$classes` (`array`) Classes which are added to the block template.
* `$attributes` (`array`) Attributes of the block.

#### Usage:

```php
add_filter( 'wp_bootstrap_blocks_column_classes', 'my_custom_column_classes', 10, 2 );

function my_custom_column_classes( $classes, $attributes ) {
    return [ 'my', 'custom', 'classes' ];
}
```

### wp_bootstrap_blocks_column_content_classes

Change classes of the inner content of the column block.

#### Parameters:

* `$classes` (`array`) Classes which are added to the block template.
* `$attributes` (`array`) Attributes of the block.

#### Usage:

```php
add_filter( 'wp_bootstrap_blocks_column_content_classes', 'my_custom_column_content_classes', 10, 2 );

function my_custom_column_content_classes( $classes, $attributes ) {
    return [ 'my', 'custom', 'classes' ];
}
```

### wp_bootstrap_blocks_container_classes

Change classes of container block.

#### Parameters:

* `$classes` (`array`) Classes which are added to the block template.
* `$attributes` (`array`) Attributes of the block.

#### Usage:

```php
add_filter( 'wp_bootstrap_blocks_container_classes', 'my_custom_container_classes', 10, 2 );

function my_custom_container_classes( $classes, $attributes ) {
    return [ 'my', 'custom', 'classes' ];
}
```

### wp_bootstrap_blocks_button_classes

Change classes of button block.

#### Parameters:

* `$classes` (`array`) Classes which are added to the block template.
* `$attributes` (`array`) Attributes of the block.

#### Usage:

```php
add_filter( 'wp_bootstrap_blocks_button_classes', 'my_custom_button_classes', 10, 2 );

function my_custom_button_classes( $classes, $attributes ) {
    return [ 'my', 'custom', 'classes' ];
}
```

### wp_bootstrap_blocks_button_wrapper_classes

Change classes of button block wrapper.

#### Parameters:

* `$classes` (`array`) Classes which are added to the block template.
* `$attributes` (`array`) Attributes of the block.

#### Usage:

```php
add_filter( 'wp_bootstrap_blocks_button_wrapper_classes', 'my_custom_button_wrapper_classes', 10, 2 );

function my_custom_button_wrapper_classes( $classes, $attributes ) {
    return [ 'my', 'custom', 'classes' ];
}
```

### wp_bootstrap_blocks_row_default_attributes

Modify default attributes of the row block.

#### Parameters:

* `$default_attributes` (`array`) Default attributes of row block.
    * `template` (`string`) Name of default template of row block (Default: `'1-1'`)
    * `noGutters` (`boolean`) Defines if noGutters option should be selected or not (Default: `false`)
    * `alignment` (`string`) Default horizontal alignment of inner columns (Default: `''`)
    * `verticalAlignment` (`string`) Default vertical alignment of inner columns (Default: `''`)

#### Usage:

```php
add_filter( 'wp_bootstrap_blocks_row_default_attributes', 'my_row_default_attributes', 10, 1 );

function my_row_default_attributes( $default_attributes ) {
    $default_attributes['template'] = '1-2';
    $default_attributes['noGutters'] = true;
    $default_attributes['alignment'] = 'right';
    $default_attributes['verticalAlignment'] = 'bottom';
    return $default_attributes;
}
```

### wp_bootstrap_blocks_column_default_attributes

Modify default attributes of the column block.

#### Parameters:

* `$default_attributes` (`array`) Default attributes of column block.
    * `sizeXl` (`int`) Default xl column size (Default: `0`)
    * `sizeLg` (`int`) Default lg column size (Default: `0`)
    * `sizeMd` (`int`) Default md column size (Default: `0`)
    * `sizeSm` (`int`) Default sm column size (Default: `0`)
    * `sizeXs` (`int`) Default xs column size (Default: `12`))
    * `equalWidthXl` (`boolean`) Defines if equal-width xl option should be selected or not (Default: `false`)
    * `equalWidthLg` (`boolean`) Defines if equal-width lg option should be selected or not (Default: `false`)
    * `equalWidthMd` (`boolean`) Defines if equal-width md option should be selected or not (Default: `false`)
    * `equalWidthSm` (`boolean`) Defines if equal-width sm option should be selected or not (Default: `false`)
    * `equalWidthXs` (`boolean`) Defines if equal-width xs option should be selected or not (Default: `false`)
    * `bgColor` (`string`) Background color of column (Default: `''`)
    * `centerContent` (`boolean`) Defines if center content inside column should be selected or not (Default: `false`)
    * `padding` (`string`) Padding inside column (Default: `''`)

#### Usage:

```php
add_filter( 'wp_bootstrap_blocks_column_default_attributes', 'my_column_default_attributes', 10, 1 );

function my_column_default_attributes( $default_attributes ) {
    $default_attributes['sizeLg'] = '4';
    $default_attributes['sizeMd'] = '6';
    $default_attributes['equalWidthXl'] = true;
    $default_attributes['bgColor'] = 'primary';
    $default_attributes['padding'] = 'p-3';
    $default_attributes['centerContent'] = true;
    return $default_attributes;
}
```

### wp_bootstrap_blocks_container_default_attributes

Modify default attributes of the container block.

#### Parameters:

* `$default_attributes` (`array`) Default attributes of container block.
    * `isFluid` (`boolean`) Defines if container should be fluid or not (Default: `false`)
    * `marginAfter` (`string`) Default margin after container block (Default: `'mb-2'`)

#### Usage:

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

#### Parameters:

* `$default_attributes` (`array`) Default attributes of button block.
    * `url` (`string`) Default url of the button (Default: `''`)
    * `text` (`string`) Default text of the button (Default: `''`)
    * `style` (`string`) Default style of the button (Default: `''`)
    * `alignment` (`string`) Default alignment of the button (Default: `''`)

#### Usage:

```php
add_filter( 'wp_bootstrap_blocks_button_default_attributes', 'my_button_default_attributes', 10, 1 );

function my_button_default_attributes( $default_attributes ) {
    $default_attributes['url'] = 'https://getbootstrap.com/';
    $default_attributes['text'] = 'Bootstrap';
    $default_attributes['style'] = 'secondary';
    $default_attributes['alignment'] = 'right';
    return $default_attributes;
}
```

### wp_bootstrap_blocks_enqueue_block_assets

Possibility to disable enqueuing block assets.

#### Parameters:

* `$enqueue_block_assets` (`boolean`) Defines if block assets should be enqueued. (Default: `true`)

#### Usage:

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
    echo "wp-bootstrap-blocks got updated from v" . $new_version . " to v" . $old_version;
}
```

## JavaScript Filters

### wpBootstrapBlocks.button.styleOptions

Modify available button styles.

#### Usage:

```javascript
function myButtonStyleOptions( styleOptions ) {
    styleOptions.push( { label: 'My Option', value: 'my-option' } );
    return styleOptions;
}
wp.hooks.addFilter( 'wpBootstrapBlocks.button.styleOptions', 'myplugin/wp-bootstrap-blocks/button/styleOptions', myButtonStyleOptions );
```

#### Parameters:

* `styleOptions` (`Array`) Array with button style options.

### wpBootstrapBlocks.container.marginAfterOptions

Modify margin after options.

#### Usage:

```javascript
function myMarginAfterOptions( marginAfterOptions ) {
    marginAfterOptions.push( { label: 'Huge', value: 'mb-8' } );
    return marginAfterOptions;
}
wp.hooks.addFilter( 'wpBootstrapBlocks.container.marginAfterOptions', 'myplugin/wp-bootstrap-blocks/container/marginAfterOptions', myMarginAfterOptions );
```

#### Parameters:

* `marginAfterOptions` (`Array`) Array margin options.

### wpBootstrapBlocks.row.templates

Define block templates.

#### Usage:

```javascript
function myRowTemplates( templates ) {
    templates.push( {
        name: '1-3',
        title: '2 Columns (1:3)',
        icon: <SVG />,
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
wp.hooks.addFilter( 'wpBootstrapBlocks.row.templates', 'myplugin/wp-bootstrap-blocks/row/templates', myRowTemplates );
```

#### Parameters:

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

#### Usage:

```javascript
// Disable custom row template
wp.hooks.addFilter( 'wpBootstrapBlocks.row.enableCustomTemplate', 'myplugin/wp-bootstrap-blocks/row/enableCustomTemplate', () => false );
```

#### Parameters:

* `enableCustomTemplate` (`boolean`) Return true if custom row template should be enabled. (Default: `true`)

### wpBootstrapBlocks.column.bgColors

Modify available background colors for column block.

#### Usage:

```javascript
function myColumnBgColorOptions( bgColorOptions ) {
    bgColorOptions.push({
        name: 'brand',
        color: '#6EA644',
    });
    return bgColorOptions;
}
wp.hooks.addFilter( 'wpBootstrapBlocks.column.bgColorOptions', 'myplugin/wp-bootstrap-blocks/column/bgColorOptions', myColumnBgColorOptions );
```

#### Parameters:

* `bgColorOptions` (`Array`) Array of available background colors. Each element should be an object containing the `name` of the color and the `color` itself (see: https://github.com/WordPress/gutenberg/tree/master/packages/components/src/color-palette).

### wpBootstrapBlocks.column.paddingOptions

Modify available padding options for column block.

#### Usage:

```javascript
function myColumnPaddingOptions( paddingOptions ) {
    paddingOptions.push( { label: 'Huge', value: 'p-8' } );
    return paddingOptions;
}
wp.hooks.addFilter( 'wpBootstrapBlocks.column.paddingOptions', 'myplugin/wp-bootstrap-blocks/column/paddingOptions', myColumnPaddingOptions );
```

#### Parameters:

* `paddingOptions` (`Array`) Array of padding options.

## Developer information

### Requirements

* Node.js >= 10.x
* Docker

### Installation

1. Clone this repository

1. Install composer dependencies

    ```
    $ curl -s https://getcomposer.org/installer | php
    $ php composer.phar install
    ```

1. Install Node dependencies

    ```
    $ npm install
    ```

### Compile assets

The build process is based on the official [`@wordpress/scripts`](https://developer.wordpress.org/block-editor/packages/packages-scripts/) package.

* `npm start`: Compiles the block in development mode. Watches for any changes and reports back any errors in your code.
* `npm run lint`: Lints JavaScript, CSS and package.json files.
* `npm run build`: Use to build production code for your block inside `build` folder.

### Extract labels

To extract the labels and generate the `languages/wp-bootstrap-blocks.pot` file run the following command:

```
$ curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
$ php wp-cli.phar i18n make-pot --exclude="wordpress" . languages/wp-bootstrap-blocks.pot
```

### Setup local dev environment

The following commands can be used to setup a local dev environment. See the official [documentation of `@wordpress/scripts`](https://developer.wordpress.org/block-editor/packages/packages-scripts/#available-sub-scripts) for a complete list of commands.

* `scripts/install-wp.sh [wp-version]`: Install local WordPress environment
* `npm run env start`: Starts the Docker containers.
* `npm run env stop`: Stops the Docker containers.

### Testing

There are two types of tests for this plugin:

* PHPUnit Tests: Used to validate generated block output. Since this plugin uses dynamic blocks which are rendered on the server side we need to test them with PHPUnit tests.
* Puppeteer E2E Tests: Used to validate block behaviour in the editor.

#### PHPUnitTests

The PHPUnit tests are stored in the `phpunit/` directory.
They use fixtures to validate the block output.
Each block variant which should be tested needs a manually created file called `blockname__variant.html`.
This file contains the block presentation in the editor (a.k.a. the HTML comment presentation) and needs to be stored in the following folder:

`phpunit/blockname/fixtures/blockname_variant.html`

The second fixture of each variant is the `blockname_variant.output.html` file.
This file gets automatically generated if the test runs for the first time and the environment variable `WP_BOOTSTRAP_BLOCKS_RECORD` in the `phpunit.xml.dist` file is set to `true`.

To run the tests use the following command:

```
$ npm run env test-php
```

or the following command to run a specific test:

```
$ npm run env test-php -- --filter 'my_test'
```

#### Puppeteer E2E Tests

The Puppeteer E2E Tests are stored in the `e2e-tests` directory.

To run the tests use the following command:

```
$ npm run test:e2e
```

or the following command to run a specific test:

```
$ npm run test:e2e -- -t 'my test'
```
