#!/bin/bash

HERE=`dirname $0`
ROOT="$HERE/../.."
php $ROOT/wp-cli.phar i18n make-pot --exclude="wordpress" . $ROOT/languages/wp-bootstrap-blocks.pot
