#!/bin/bash
set -e

function cleanup {
  message "Closing selenium server. Please wait..."
  kill $(ps aux | grep '[.]selenium' | awk '{print $2}')
  sleep 5
  message "Done"
}

function message() {
  echo -e ""
  echo -e "######################################################"
  echo -e "#                                                     "
  echo -e "#  "$@"                                               "
  echo -e "#                                                     "
  echo -e "######################################################"
}

trap cleanup EXIT

message "Creating temporary accounts for tests..."
npm run e2e-create-accounts
message "Starting Selenium in background..."
nohup npm run e2e-selenium-server > ./reports/selenium-server.log 2>&1&
nohup npm run e2e-selenium-chromedriver > ./reports/selenium-chrome.log 2>&1&


if [ -n "$1" ]
  then
    message "Custom local tests starts..."
    npm run e2e-custom $1
  else
    message "Full local tests starts..."
    npm run e2e-local
fi
