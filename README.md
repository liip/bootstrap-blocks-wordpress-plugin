# Bootstrap 4 Gutenberg Blocks for WordPress

[![Build Status](https://travis-ci.org/liip/bootstrap-blocks-wordpress-plugin.svg?branch=master)](https://travis-ci.org/liip/bootstrap-blocks-wordpress-plugin)

This plugin adds Bootstrap components and layout options as Gutenberg blocks.

The following blocks are currently available:

* Container
* Grid (Row / Column)
* Button

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
add_filter( 'wp_bootstrap_blocks_template_path', 'block-templates/' );
```

### wp_bootstrap_blocks_get_template

Possibility to overwrite the located template path before it gets loaded.

#### Parameters:

* `$located` (string) located file path.
* `$template_name` (string) template name which was requested.
* `$template_path` (string) path to template directory.
* `$default_path` (string) default template directory path.

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

* `$template` (string) located file path.
* `$template_name` (string) template name which was requested.
* `$template_path` (string) path to template directory.

#### Usage:

```php
add_filter( 'wp_bootstrap_blocks_locate_template', 'my_template_locater', 10, 3 );

function my_template_locater( $template, $template_name, $template_path ) {
    return 'mytheme/special-templates/block.php';
}
```

### wp_bootstrap_blocks_&lt;blockname&gt;_classes

Change classes of &lt;blockname&gt;.

#### Parameters:

* `$classes` (array) Classes which are added to the block template.
* `$attributes` (array) Attributes of the block.

#### Usage:

```php
add_filter( 'wp_bootstrap_blocks_container_classes', 'my_custom_container_classes', 10, 2 );

function my_custom_container_classes( $classes, $attributes ) {
    return [ 'my', 'custom', 'classes' ];
}
```

### wp_bootstrap_blocks_&lt;blockname&gt;_default_attributes

Modify default attributes of &lt;blockname&gt;.

#### Parameters:

* `$default_attributes` (array) Default attributes of block.

#### Usage:

```php
add_filter( 'wp_bootstrap_blocks_row_default_attributes', 'my_row_default_attributes', 10, 1 );

function my_row_default_attributes( $default_attributes ) {
    $default_attributes['alignment'] = 'center';
    return $default_attributes;
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

* `styleOptions` (array) Array with button style options

### wpBootstrapBlocks.container.useFluidContainerPerDefault

Enable/Disable fluid layout of container per default.

#### Usage:

```javascript
// Enable fluid layout of container by default
wp.hooks.addFilter( 'wpBootstrapBlocks.container.useFluidContainerPerDefault', 'myplugin/wp-bootstrap-blocks/container/useFluidContainerPerDefault', true );
```

#### Parameters:

* `useFluidContainerPerDefault` (boolean) Return true if fluid layout of containers should be enabled by default.

### wpBootstrapBlocks.container.customMarginOptions

Modify margin options.

#### Usage:

```javascript
function myCustomMarginOptions( customMarginOptions ) {
    customMarginOptions.push( { label: 'Margin huge', value: 'mb-8' } );
    return customMarginOptions;
}
wp.hooks.addFilter( 'wpBootstrapBlocks.container.customMarginOptions', 'myplugin/wp-bootstrap-blocks/container/styleOptions', myCustomMarginOptions );
```

#### Parameters:

* `customMarginOptions` (array) Array margin options.

### wpBootstrapBlocks.row.templates

Define block templates.

#### Usage:

```javascript
function myRowTemplates( templates ) {
    templates['1-3'] = {
        label: '2 Columns (1:3)',
        templateLock: 'all',
        blocks: [
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
    };
    return templates;
}
wp.hooks.addFilter( 'wpBootstrapBlocks.row.templates', 'myplugin/wp-bootstrap-blocks/row/templates', myRowTemplates );
```

#### Parameters:

* `templates` (object) List of template objects.

Each template has the following attributes:

* `label` (string) Name of template
* `templateLock` (string|false)
    * `false`: Columns can be added and removed
    * `all`: Columns can't be changed
* `blocks` (array) see: https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-templates/#api
    * Name of block. (Only `wp-bootstrap-blocks/column` supported!)
    * Attributes of column

### wpBootstrapBlocks.row.enableCustomTemplate

Enable/Disable custom option in row templates.

#### Usage:

```javascript
// Disable custom row template
wp.hooks.addFilter( 'wpBootstrapBlocks.row.enableCustomTemplate', 'myplugin/wp-bootstrap-blocks/row/enableCustomTemplate', false );
```

#### Parameters:

* `enableCustomTemplate` (boolean) Return true if custom row template should be enabled.

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

* `bgColorOptions` (array) Array of available background colors. Each element should be an object containing the `name` of the color and the `color` itself (see: https://github.com/WordPress/gutenberg/tree/master/packages/components/src/color-palette).

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

* `paddingOptions` (array) Array of padding options.

## Developer information

### Installation

1. Clone this repository

1. Install composer dependencies

    ```
    $ curl -s https://getcomposer.org/installer | php
    $ php composer.phar install
    $ vendor/bin/phpcs --config-set installed_paths vendor/wp-coding-standards/wpcs
    ```

1. Install Node dependencies

    ```
    $ npm install
    ```

### Compile assets

This project was bootstrapped with [Create Guten Block](https://github.com/ahmadawais/create-guten-block).

#### `npm start`
- Use to compile and run the block in development mode.
- Watches for any changes and reports back any errors in your code.

#### `npm run build`
- Use to build production code for your block inside `dist` folder.
- Runs once and reports back the gzip file sizes of the produced code.

#### `npm run eject`
- Use to eject your plugin out of `create-guten-block`.
- Provides all the configurations so you can customize the project as you want.
- It's a one-way street, `eject` and you have to maintain everything yourself.
- You don't normally have to `eject` a project because by ejecting you lose the connection with `create-guten-block` and from there onwards you have to update and maintain all the dependencies on your own.

### Extract labels

To extract the labels and generate the `languages/wp-bootstrap-blocks.pot` file run the following command:

```
$ curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
$ php wp-cli.phar i18n make-pot . languages/wp-bootstrap-blocks.pot
```
