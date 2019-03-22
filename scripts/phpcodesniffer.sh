#!/bin/sh

HERE=`dirname $0`
ROOT="$HERE/.."

files_to_check=$1
if [ -z "$1" ]; then
    files_to_check="${ROOT}"
fi

$ROOT/vendor/bin/phpcs -p --extensions=php --report-width=100 "$files_to_check"
exit $?
