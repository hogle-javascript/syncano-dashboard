#!/bin/bash
set -e

function run_unit_tests {
    npm run-script test
}

function e2e_setup {
    npm run-script build
    mv ./dist ./dist_e2e
    npm run-script e2e-setup
    nohup npm run-script e2e-http-server &
    nohup npm run-script oauth-server &
    sleep 5
}

function e2e_cleanup {
    rm -rf ./dist_e2e
    npm run-script e2e-remove-certificate
}

npm run lint
e2e_setup
npm run-script e2e-create-accounts

case "$CIRCLE_NODE_INDEX" in
    0)
        npm run-script e2e
        ;;
    1)
        npm run-script e2e-1
        ;;
    2)
        npm run-script e2e-2
        ;;
    *)
        npm run-script e2e
        ;;
esac

e2e_cleanup
