HERE=`dirname $0`
ROOT="$HERE/../.."
for file in `find "$ROOT/languages" -name "*.po"` ; do msgfmt -o ${file/.po/.mo} $file ; done
php $ROOT/wp-cli.phar i18n make-json $ROOT/languages/wp-bootstrap-blocks-de_DE.po --no-purge
