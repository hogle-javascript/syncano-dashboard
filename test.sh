#!/bin/bash
set -e

function run_unit_tests {
    npm run-script eslint
}

function e2e_setup {
    npm run-script build
    mv ./dist ./dist_e2e
    npm run-script e2e-setup
    nohup npm run-script e2e-http-server &
    nohup npm run-script oauth-server &
    sleep 5
}

function run_e2e_tests {
    npm run-script e2e
}

function run_e2e_tests_0 {
    npm run-script e2e-instances
}

function run_e2e_tests_1 {
    npm run-script e2e-navigation
    npm run-script e2e-settings
    npm run-script e2e-signup-logins
}

function run_e2e_screenshots {
    npm run-script e2e-screenshots
    npm run-script upload-screenshots
}

function sync_with_master_branch {
    git fetch --all
    git reset --hard origin/master
}

function e2e_cleanup {
    rm -rf ./dist_e2e
}
case "$CIRCLE_NODE_INDEX" in
    0)
        run_unit_tests
        run_e2e_tests_0
        e2e_cleanup
        ;;
    1)
        if [[ "$CIRCLE_BRANCH" == "screenshots" ]]; then
            sync_with_master_branch
            e2e_setup
            run_e2e_screenshots
            e2e_cleanup
        else
            e2e_setup
            run_e2e_tests_1
            e2e_cleanup
        fi
        ;;
    *)
        run_unit_tests
        e2e_setup
        run_e2e_tests
        e2e_cleanup
        ;;
esac
