#!/bin/bash
set -e

function e2e_setup {
    npm run build
    mv ./dist ./dist_e2e
    npm run e2e-setup
    npm run e2e-create-accounts
    nohup npm run e2e-selenium-server -Djava.security.egd=file:/dev/./urandom > ./reports/selenium-server.log 2>&1&
    nohup npm run e2e-selenium-chromedriver -Djava.security.egd=file:/dev/./urandom > ./reports/selenium-chrome.log 2>&1&
    nohup npm run e2e-http-server > ./reports/http-server.log 2>&1&
    sleep 5
}

function e2e_cleanup {
    rm -rf ./dist_e2e
    npm run e2e-remove-certificate
}

mkdir reports/
touch ./reports/docker-entropy.log
nohup ./check_entropy.sh > ./reports/docker-entropy.log 2>&1&
npm run lint
STRIPE_PUBLISHABLE_KEY=$STAGING_STRIPE_PUBLISHABLE_KEY
export STRIPE_PUBLISHABLE_KEY
e2e_setup

case "$CIRCLE_NODE_INDEX" in
    0) npm run e2e ;;
    1) npm run e2e-1 ;;
    2) npm run e2e-2 ;;
    *) npm run e2e ;;
esac

e2e_cleanup
