#!/bin/bash
set -e

function run_unit_tests {
    npm run test
}

function e2e_setup {
    npm run build
    mv ./dist ./dist_e2e
    npm run e2e-setup
    nohup npm run e2e-http-server > ./reports/http-server.log 2>&1&
    nohup npm run e2e-selenium-server > ./reports/selenium-server.log 2>&1&
    nohup npm run oauth-server > ./reports/oauth-server.log 2>&1&
    sleep 5
}

function e2e_cleanup {
    rm -rf ./dist_e2e
    npm run e2e-remove-certificate
}

npm run lint
e2e_setup
npm run e2e-create-accounts

case "$CIRCLE_NODE_INDEX" in
    0) npm run e2e ;;
    1) npm run e2e-1 ;;
    2) npm run e2e-2 ;;
    *) npm run e2e ;;
esac

e2e_cleanup
