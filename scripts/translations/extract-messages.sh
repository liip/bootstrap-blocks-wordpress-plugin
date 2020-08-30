#!/bin/bash

HERE=`dirname $0`
ROOT="$HERE/../.."

# Create non-minified build to be able to extract labels
(cd $ROOT && NODE_ENV=development npm run build)

php $ROOT/wp-cli.phar i18n make-pot --include="build,wp-bootstrap-blocks.php,src/*.php" . $ROOT/languages/wp-bootstrap-blocks.pot

(cd $ROOT && npm run build)
