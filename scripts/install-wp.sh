#! /bin/bash
###
# Installs local WordPress environemnt.
# Supported WordPress Versions: >=5.3
#
# Author: Juerg Hunziker <juerg.hunziker@liip.ch>
# Version: 1.0.0
###

echo "=========================================="
echo "Install WordPress Script - v1.0.0"
echo "=========================================="
echo

# Exit script immediately when en error occurs
set -e

HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT="$HERE/.."
WP_DIR_NAME="wordpress" # This needs to be hardcoded since @wordpress/scipts also hardcoded the directory name in env/install.js.
WP_DIR="${ROOT}/${WP_DIR_NAME}"
WP_VERSION=${1:-latest}

# Minor WordPress releases do not have a trailing 0 in the version number (eg. 5.3 not 5.3.0)
# But on the GitHub repository the version tags use semantic versioning (eg. 5.3.0)
WP_VERSION_WITHZERO=${WP_VERSION}
WP_VERSION_WITHOUTZERO=${WP_VERSION}

VERSION_WITHZERO_REGEX="^(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.0$"
if [[ ${WP_VERSION_WITHZERO} =~ ${VERSION_WITHZERO_REGEX} ]]; then
  WP_VERSION_WITHOUTZERO="${BASH_REMATCH[1]}.${BASH_REMATCH[2]}"
fi
VERSION_WITHOUTZERO_REGEX="^(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)$"
if [[ ${WP_VERSION_WITHOUTZERO} =~ ${VERSION_WITHOUTZERO_REGEX} ]]; then
  WP_VERSION_WITHZERO="${BASH_REMATCH[1]}.${BASH_REMATCH[2]}.0"
fi

WP_DEVELOP_REPO_VERSION=${WP_VERSION_WITHZERO}
if [ "${WP_VERSION}" = "latest" ]; then
  WP_DEVELOP_REPO_VERSION="master"
fi

# Bail out if wordpress directory already exists
if [ -d "${WP_DIR}" ]; then
    echo "It looks like WordPress is already installed, please delete the '${WP_DIR_NAME}' directory for a fresh install, or run 'npm run env start' to start the existing environment."
    echo "Exiting..."
    exit 1;
fi

echo "Installing WordPress ${WP_VERSION}..."
echo

mkdir -p ${WP_DIR}/src

# Download WP Version
# Grab the tools we need for WordPress' local-env.

echo "Downloading WordPress Develop Tools..."
echo

curl -sL https://github.com/WordPress/wordpress-develop/archive/${WP_DEVELOP_REPO_VERSION}.zip -o /tmp/wordpress-develop.zip
unzip -q /tmp/wordpress-develop.zip -d /tmp
mv \
  /tmp/wordpress-develop-${WP_DEVELOP_REPO_VERSION}/tools \
  /tmp/wordpress-develop-${WP_DEVELOP_REPO_VERSION}/tests \
  /tmp/wordpress-develop-${WP_DEVELOP_REPO_VERSION}/.env \
  /tmp/wordpress-develop-${WP_DEVELOP_REPO_VERSION}/docker-compose.yml \
  /tmp/wordpress-develop-${WP_DEVELOP_REPO_VERSION}/wp-cli.yml \
  /tmp/wordpress-develop-${WP_DEVELOP_REPO_VERSION}/*config-sample.php \
  /tmp/wordpress-develop-${WP_DEVELOP_REPO_VERSION}/package.json ${WP_DIR}

rm -rf /tmp/wordpress-develop-${WP_DEVELOP_REPO_VERSION}
rm /tmp/wordpress-develop.zip

echo "Starting Docker Containers..."
echo

cd $WP_DIR
# Install minimal set of npm packages which are used by the env:start command
npm install dotenv wait-on
npm run env:start

# Wait till docker containers are really started
sleep 10

echo "Downloading WordPress Core..."
echo

docker-compose run --rm cli core download --version=${WP_VERSION_WITHOUTZERO} --path=/var/www/src --force --quiet

cd $ROOT

echo "Installing WordPress Environment..."
echo
npm run env install -- --fast

echo "=========================================="
echo "Successfully installed WordPress ${WP_VERSION_WITHZERO}!"
echo "=========================================="
echo
