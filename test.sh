
#!/bin/bash
set -e

function e2e_setup {
    npm run build
    mv ./dist ./dist_e2e
    npm run e2e-setup
    npm run e2e-create-accounts
    nohup npm run e2e-selenium-server > ./reports/selenium-server.log 2>&1&
    nohup npm run e2e-selenium-chromedriver > ./reports/selenium-chrome.log 2>&1&
    nohup npm run e2e-http-server > ./reports/http-server.log 2>&1&
    sleep 5
}

function e2e_cleanup {
    rm -rf ./dist_e2e
    npm run e2e-remove-certificate
}

MESSAGE=$(git log --pretty=format:%s -n 1 "$CIRCLE_SHA1")

if [[ "$MESSAGE" == *\[E2E-SKIP\]* ]]; then
    npm run lint
    echo "[WARN] Skipping E2E tests !!!"
else
    mkdir -p reports/
    nohup ./check_docker.sh > ./reports/docker-stats.log 2>&1&
    npm run lint
    e2e_setup

    case "$CIRCLE_NODE_INDEX" in
        0) npm run e2e ;;
        1) npm run e2e-1 ;;
        2) npm run e2e-2 ;;
        *) npm run e2e ;;
    esac

    e2e_cleanup
fi
