#!/bin/bash

if [ -z "$TRAVIS_TAG" ]; then
    curl https://get.dgraph.io -sSf | bash -s nightly
else
    curl https://get.dgraph.io -sSf | bash
fi
