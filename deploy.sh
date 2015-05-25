#!/bin/bash
set -euo pipefail

# deploy static files to s3 bucket
npm install webpack -g
STAGING=true webpack -p

# the easiest way to get the versioned bundle.js hash
# http://webpack.github.io/docs/long-term-caching.html
JSBUNDLE_NAME=`ls public/js | grep -v vendor`
sed -i "s/src=\"js\/bundle.js\"/src=\"js\/$JSBUNDLE_NAME\"/g" public/index.html

S3_BUCKET='syncano-gui-staging'
BUILD_BUNDLE="public"
aws s3 cp ${BUILD_BUNDLE} s3://$S3_BUCKET/ --recursive

export AWS_REGION='eu-west-1'
export DISTRIBUTION_ID='E10VUXJJFKD7D3'
node invalidate_cloudfront.js

# notify slack
TARGET="Staging"
MESSAGE="Deployed $TARGET of gui, branch: $(git rev-parse --abbrev-ref HEAD)"
./notify_slack.sh $MESSAGE
