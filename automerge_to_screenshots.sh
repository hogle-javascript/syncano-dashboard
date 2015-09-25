#!/bin/sh

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
LAST_COMMIT=$(git rev-list -1 HEAD)

echo Automatically merging commit $LAST_COMMIT from $CURRENT_BRANCH to screenshots branch

git checkout screenshots && git merge master
git checkout $CURRENT_BRANCH