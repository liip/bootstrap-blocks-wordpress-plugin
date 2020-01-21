HERE=`dirname $0`
ROOT="$HERE/../.."
for file in `find "$ROOT/languages" -name "*.po"` ; do msgfmt -o ${file/.po/.mo} $file ; done
