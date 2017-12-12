#!/bin/bash

if [ -z "$TRAVIS_TAG" ]; then
    curl https://nightly.dgraph.io -sSf | bash
else
    curl https://get.dgraph.io -sSf | bash
fi
