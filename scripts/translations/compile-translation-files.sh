HERE=`dirname $0`
ROOT="$HERE/../.."
DOCKER_ROOT="/var/www/html/wp-content/plugins/wp-bootstrap-blocks"

for file in `find "$ROOT/languages" -name "*.po"`
do
  echo "Creating *.mo file from $file..."
  msgfmt -o ${file/.po/.mo} $file
  echo "Success!"
  echo ""
  echo "Creating *.json file from $file..."
  npm run wp-env run cli "wp i18n make-json $DOCKER_ROOT/$file --no-purge"
done
