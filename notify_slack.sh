#!/bin/bash

MESSAGE=$1

SLACK_WEBHOOK="${SLACK_WEBHOOK:-}"
if [[ -n ${SLACK_WEBHOOK} ]] ; then
    MESSAGE=$MESSAGE
    PAYLOAD='{"channel": "#dev-team", "username": "circledeploy", "icon_emoji": ":rocket:", '
    PAYLOAD+="\"text\": \"${MESSAGE}\"}"

    curl -X POST --data-urlencode \
        "payload=${PAYLOAD}" \
        ${SLACK_WEBHOOK}
fi
