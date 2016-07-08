
#!/bin/bash
set -e

function docker_healthcheck {
    while true;
    do
      echo "Top five CPU consuming processes: " \
              && ps -eo pcpu,pid,user,args| sort -t. -nk1,2 -k4,4 -r |head -n 5
      echo ""
      echo -n "Entropy available: " && cat /proc/sys/kernel/random/entropy_avail
      echo -n "Ram usage: " && free | grep Mem | awk '{print $3/$2 * 100.0"%"}'
      echo -n "CPU usage: " && top -bn1 | grep load | awk '{printf  "%.2f\n", $(NF-2)}'
      echo "======================================================="
      echo ""
      sleep 5
    done
}

function message {
    echo ""
    printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -
    echo "#"  "$@"
    printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -
    echo ""
}

function selenium_install {
    SELENIUM_DIR="./node_modules/selenium-standalone/.selenium/"

    if [ ! -d "$SELENIUM_DIR" ]; then

      if [ "$CI" != true ]; then
      message "Installing selenium..."
      fi

      gulp selenium-install
      mkdir -p reports/
    fi
}

function selenium_start {
    nohup npm run e2e-selenium-server > ./reports/selenium-server.log 2>&1&
    nohup npm run e2e-selenium-chromedriver > ./reports/selenium-chrome.log 2>&1&
    sleep 5
}

function ci_cleanup {
    rm -rf ./dist_e2e
    npm run e2e-remove-certificate
}

function ci_setup {
    selenium_install
    docker_healthcheck > ./reports/docker-stats.log 2>&1&

    npm run build
    mv ./dist ./dist_e2e

    npm run e2e-create-accounts
    selenium_start

    nohup npm run e2e-http-server > ./reports/http-server.log 2>&1&
    sleep 5
}

function ci_tests {
    MESSAGE=$(git log --pretty=format:%s -n 1 "$CIRCLE_SHA1")

    if [[ "$MESSAGE" == *\[e2e-skip\]* ]]; then
        npm run lint
        echo "[WARN] Skipping E2E tests !!!"
    else
        npm run lint
        ci_setup

        if [ $CIRCLE_BRANCH = 'master' ] || [ $CIRCLE_BRANCH = 'devel' ]; then
            npm run e2e-master-devel
        else
            npm run e2e
        fi

        ci_cleanup
    fi
}

function local_cleanup {
    message "Closing selenium server. Please wait..."
    kill $(ps aux | grep '[.]selenium' | awk '{print $2}')
    sleep 5 && message "Done"
}

function local_setup {
    selenium_install

    message "Creating temporary accounts for tests..."
    npm run e2e-create-accounts

    message "Starting Selenium in background..."
    trap local_cleanup EXIT
    selenium_start
    sleep 5
}

function local_tests {
    local_setup

    if [ -n "$1" ]; then
        message "Custom local tests starts..."
        npm run e2e-custom $1
    else
        message "Full local tests starts..."
        npm run e2e-local
    fi
}

if [ "$CI" = true ]; then
    ci_tests $@
else
    local_tests $@
fi
