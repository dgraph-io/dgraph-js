#!/bin/bash

sleepTime=5
if [[ "$TRAVIS" == true ]]; then
    sleepTime=30
fi

function quit {
    echo "Shutting down Dgraph Alpha and zero."
    curl -s localhost:8080/admin/shutdown
    # Kill Dgraph zero.
    kill -9 $(pgrep -f "dgraph zero") > /dev/null

    if pgrep -x dgraph > /dev/null
    then
        while pgrep dgraph;
        do
            echo "Sleeping for 5 secs so that Dgraph can shutdown."
            sleep 5
        done
    fi

    echo "Clean shutdown done."
    return $1
}

function start {
    echo -e "Starting first Alpha."
    dgraph alpha -p data/p -w data/w --lru_mb 4096 --zero localhost:5080 > data/alpha.log 2>&1 &
    # Wait for membership sync to happen.
    sleep $sleepTime
    return 0
}

function startZero {
    echo -e "Starting Dgraph zero.\n"
    dgraph zero -w data/wz > data/zero.log 2>&1 &
    # To ensure Dgraph doesn't start before Dgraph zero.
    # It takes time for zero to start on travis mac.
    sleep $sleepTime
}

function init {
    echo -e "Initializing.\n"
    mkdir data
}
