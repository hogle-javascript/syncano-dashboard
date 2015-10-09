#!/bin/sh
set -e

git config --global user.email "ci@syncano.com"
git config --global user.name "CI"

git fetch origin
git checkout screenshots 
git merge master
git push origin screenshots
