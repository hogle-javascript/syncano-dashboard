#!/bin/bash
set -euo pipefail

# deploy static files to s3 bucket
npm install webpack -g -p
sed -i "s/https:\/\/api.syncano.rocks/https:\/\/api.syncano.io/g" src/js/constants/Constants.js
PRODUCTION=true webpack

# the easiest way to get the versioned bundle.js hash
# http://webpack.github.io/docs/long-term-caching.html
JSBUNDLE_NAME=`ls public/js`
sed -i "s/bundle.js/$JSBUNDLE_NAME/g" public/index.html

S3_BUCKET='syncano-dashboard-production'
BUILD_BUNDLE="public"

aws s3 cp ${BUILD_BUNDLE} s3://$S3_BUCKET/ --recursive

# export AWS_REGION='us-east-1'
# export DISTRIBUTION_ID='E3GVWH8UCCSHQ7'
# node invalidate_cloudfront.js

# notify slack
TARGET="PRODUCTION"
MESSAGE="Deployed $TARGET of dashboard, branch: $(git rev-parse --abbrev-ref HEAD)"
./notify_slack.sh $MESSAGE
