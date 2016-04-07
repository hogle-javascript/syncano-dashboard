#!/bin/bash
set -e

function run_unit_tests {
    npm run-script lint
}

function e2e_setup {
    npm run-script build
    mv ./dist ./dist_e2e
    npm run-script e2e-setup
    nohup npm run-script e2e-http-server &
    nohup npm run-script oauth-server &
    sleep 5
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
        e2e_setup
        npm run-script e2e-0
        e2e_cleanup
        ;;
    1)
        if [[ "$CIRCLE_BRANCH" == "screenshots" ]]; then
            sync_with_master_branch
            e2e_setup
            npm run-script e2e-screenshots
            npm run-script upload-screenshots
            e2e_cleanup
        else
            e2e_setup
            npm run-script e2e-1
            e2e_cleanup
        fi
        ;;
    *)
        run_unit_tests
        e2e_setup
        npm run-script e2e
        e2e_cleanup
        ;;
esac
