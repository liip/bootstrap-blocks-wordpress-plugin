# Bootstrap 4 Gutenberg Blocks for WordPress

[![Build Status](https://travis-ci.org/liip/bootstrap-blocks-wordpress-plugin.svg?branch=master)](https://travis-ci.org/liip/bootstrap-blocks-wordpress-plugin)

Currently available blocks:

* Container
* Grid (Row / Column)
* Button

## Templates

All blocks are implemented as [dynamic blocks](https://wordpress.org/gutenberg/handbook/designers-developers/developers/tutorials/block-tutorial/creating-dynamic-blocks/).
This makes it possible to overwrite the template of a block in your theme.

To overwrite a block template create a folder called `bootstrap-blocks/` in your theme directory.
You can copy the original template from `bootstrap-blocks/src/templates/<blockname>.php` as a starting point and adjust it to your needs.

## Filters

### bootstrap_blocks_template_path

Changes the default theme directory name (`bootstrap-blocks/`).

#### Usage:

```php
add_filter( 'bootstrap_blocks_template_path', 'block-templates' );
```

### bootstrap_blocks_get_template

Possibility to overwrite the located template path before it gets loaded.

#### Parameters:

* `$located` (string) located file path.
* `$template_name` (string) template name which was requested.
* `$template_path` (string) path to template directory.
* `$default_path` (string) default template directory path.

#### Usage:

```php
add_filter( 'bootstrap_blocks_get_template', 'my_located_template', 10, 4 );

function my_located_template( $located, $template_name, $template_path, $default_path ) {
	return 'mytheme/special-templates/block.php';
}
```

### bootstrap_blocks_locate_template

Possibility to overwrite the located template path.

#### Parameters:

* `$template` (string) located file path.
* `$template_name` (string) template name which was requested.
* `$template_path` (string) path to template directory.

#### Usage:

```php
add_filter( 'bootstrap_blocks_locate_template', 'my_template_locater', 10, 4 );

function my_template_locater( $template, $template_name, $template_path ) {
	return 'mytheme/special-templates/block.php';
}
```

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

To extract the labels and generate the `languages/bootstrap-blocks.pot` file run the following command:

```
$ curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
$ php wp-cli.phar i18n make-pot .
```
