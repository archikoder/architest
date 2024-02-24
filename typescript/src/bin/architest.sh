#!/bin/bash

if [[ "$*" == *"--watch"* ]]; then
    /usr/bin/env tsx watch --tsconfig $(pwd)/tsconfig.architest.json $(pwd)/dist/bin/architest.js "${@/ --watch/}"
else
    /usr/bin/env tsx --tsconfig $(pwd)/tsconfig.architest.json $(pwd)/dist/bin/architest.js "$@"
fi
