#! /bin/bash
# Author: Juerg Hunziker <juerg.hunziker@liip.ch>
#
# This script has been created based on the wordpress-plugin-git-flow-svn-deploy script from Gary Jones (Thx!).
# See https://github.com/GaryJones/wordpress-plugin-git-flow-svn-deploy for instructions and credits.

echo
echo "WordPress Plugin Git to SVN release script - v1.0.0"
echo

HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# All paths have to be absolute!
# Set SVNPASSWORD environment variable to not promt password during deployment
PLUGINSLUG="bootstrap-blocks"
SVNURL="https://plugins.svn.wordpress.org/$PLUGINSLUG"
SVNUSER=liip
SOURCEPATH="$HERE/.." # this file should be in the base of your git repository
BUILDPATH="$SOURCEPATH/build"
MAINFILE="$PLUGINSLUG.php"

echo "Deploy with following configuration"
echo
echo "Slug: $PLUGINSLUG"
echo "Build path: $BUILDPATH"
echo "Remote SVN repo: $SVNURL"
echo "SVN username: $SVNUSER"
echo "Source path: $SOURCEPATH"
echo "Main file: $MAINFILE"
echo

# Let's begin...
echo ".........................................."
echo
echo "Preparing to deploy WordPress plugin"
echo
echo ".........................................."
echo

# Check version in readme.txt is the same as plugin file after translating both to unix line breaks to work around grep's failure to identify mac line breaks
PLUGINVERSION=`grep "Version:" $SOURCEPATH/$MAINFILE | awk -F' ' '{print $NF}' | tr -d '\r'`
echo "$MAINFILE version: $PLUGINVERSION"
READMEVERSION=`grep "^Stable tag:" $SOURCEPATH/readme.txt | awk -F' ' '{print $NF}' | tr -d '\r'`
echo "readme.txt version: $READMEVERSION"

if [ "$READMEVERSION" = "trunk" ]; then
	echo "Version in readme.txt & $MAINFILE don't match, but Stable tag is trunk. Let's proceed..."
elif [ "$PLUGINVERSION" != "$READMEVERSION" ]; then
	echo "Version in readme.txt & $MAINFILE don't match. Exiting...."
	exit 1;
elif [ "$PLUGINVERSION" = "$READMEVERSION" ]; then
	echo "Versions match in readme.txt and $MAINFILE. Let's proceed..."
fi

echo
echo "Creating local copy of SVN repo trunk ..."
svn checkout $SVNURL $BUILDPATH --depth immediates
svn update --quiet $BUILDPATH/trunk --set-depth infinity
echo "Clearing SVN repo trunk so we can overwrite it"
rm -rf $BUILDPATH/trunk/*

echo "Ignoring os specific files"
svn propset svn:ignore ".DS_Store
Thumbs.db" "$BUILDPATH/trunk/"

echo "Copying required plugin files to SVN trunk"
cp $SOURCEPATH/readme.txt $BUILDPATH/trunk/
cp $SOURCEPATH/bootstrap-blocks.php $BUILDPATH/trunk/
cp $SOURCEPATH/screenshot* $BUILDPATH/trunk/
cp -R $SOURCEPATH/dist $BUILDPATH/trunk/
cp -R $SOURCEPATH/languages $BUILDPATH/trunk/
cp -R $SOURCEPATH/src $BUILDPATH/trunk/

echo "Changing directory to SVN and committing to trunk"
cd $BUILDPATH/trunk/

# Delete all files that should not now be added.
svn status | grep -v "^.[ \t]*\..*" | grep "^\!" | awk '{print $2"@"}' | xargs svn del
# Add all new files that are not set to be ignored
svn status | grep -v "^.[ \t]*\..*" | grep "^?" | awk '{print $2"@"}' | xargs svn add
# Fix image mime-types (see: https://developer.wordpress.org/plugins/wordpress-org/plugin-assets/)
svn propset svn:mime-type image/png *.png

# Commit all changes
# If password is set as environment variable ($SVNPASSWORD) use it otherwise promt password
if [ ! -z "$SVNPASSWORD" ]; then
	svn commit --username=$SVNUSER --password=$SVNPASSWORD -m "Preparing for $PLUGINVERSION release" --no-auth-cache
else
	svn commit --username=$SVNUSER -m "Preparing for $PLUGINVERSION release" --no-auth-cache
fi

# Update WordPress plugin assets
# Make the directory if it doesn't already exist
mkdir -p $BUILDPATH/assets/
svn update --quiet $BUILDPATH/assets --set-depth infinity
echo "Clearing SVN repo assets so we can overwrite it"
rm -rf $BUILDPATH/assets/*
echo "Copying assets fiels to SVN assets"
cp -R $SOURCEPATH/.wordpress/* $BUILDPATH/assets/

echo "Updating WordPress plugin assets and committing"
cd $BUILDPATH/assets/
# Delete all new files that are not set to be ignored
svn status | grep -v "^.[ \t]*\..*" | grep "^\!" | awk '{print $2"@"}' | xargs svn del
# Add all new files that are not set to be ignored
svn status | grep -v "^.[ \t]*\..*" | grep "^?" | awk '{print $2"@"}' | xargs svn add
#svn update --accept mine-full $BUILDPATH/assets/*
# Fix image mime-types (see: https://developer.wordpress.org/plugins/wordpress-org/plugin-assets/)
svn propset svn:mime-type image/png *.png

# Commit all changes
# If password is set as environment variable ($SVNPASSWORD) use it otherwise promt password
if [ ! -z "$SVNPASSWORD" ]; then
	svn commit --username=$SVNUSER --password=$SVNPASSWORD -m "Updating assets" --no-auth-cache
else
	svn commit --username=$SVNUSER -m "Updating assets" --no-auth-cache
fi

echo "Creating new SVN tag and committing it"
cd $BUILDPATH
svn update --quiet $BUILDPATH/tags/$PLUGINVERSION

# if tag already exists update sources otherwise create new
if [ -d "$BUILDPATH/tags/$PLUGINVERSION/" ]; then
	cd $BUILDPATH/tags/$PLUGINVERSION
	cp -R $BUILDPATH/trunk/* $BUILDPATH/tags/$PLUGINVERSION/
	# Delete all files that should not now be added.
	svn status | grep -v "^.[ \t]*\..*" | grep "^\!" | awk '{print $2"@"}' | xargs svn del
	# Add all new files that are not set to be ignored
	svn status | grep -v "^.[ \t]*\..*" | grep "^?" | awk '{print $2"@"}' | xargs svn add
	# Fix image mime-types (see: https://developer.wordpress.org/plugins/wordpress-org/plugin-assets/)
	svn propset svn:mime-type image/png *.png
else
	svn copy --quiet $BUILDPATH/trunk/ $BUILDPATH/tags/$PLUGINVERSION/
	cd $BUILDPATH/tags/$PLUGINVERSION
fi

# Commit plugin version
# If password is set as environment variable ($SVNPASSWORD) use it otherwise promt password
if [ ! -z "$SVNPASSWORD" ]; then
	svn commit --username=$SVNUSER --password=$SVNPASSWORD -m "Tagging version $PLUGINVERSION" --no-auth-cache
else
	svn commit --username=$SVNUSER -m "Tagging version $PLUGINVERSION" --no-auth-cache
fi

echo "Successfully released v$PLUGINVERSION of the $PLUGINSLUG plugin!"
echo
echo "*** FIN ***"
