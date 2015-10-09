#!/bin/bash
set -e

function run_unit_tests {
    npm run-script eslint
    npm test
}

function run_e2e_tests {
    npm run-script build
    mv ./dist ./dist_e2e
    npm run-script e2e-setup
    nohup npm run-script e2e-http-server &
    sleep 5
    npm run-script e2e-screenshots 2>&1 /dev/null
    rm -rf ./dist_e2e
}

if [[ "$CIRCLE_BRANCH" == "screenshots" && "$CIRCLE_NODE_INDEX" == 1 ]]; then
    git fetch --all
    git reset --hard origin/TNB-175
fi

case "$CIRCLE_NODE_INDEX" in
    0)
        run_unit_tests
        ;;
    1)
        run_e2e_tests
        ;;
    *)
        run_unit_tests
        run_e2e_tests
        ;;
esac

if [[ "$CIRCLE_BRANCH" == "screenshots" && "$CIRCLE_NODE_INDEX" == 1 ]]; then
    npm run-script upload-screenshots
fi
