#!/bin/bash

executable_path=$(dirname $(readlink -f "$0"))

if [[ "$*" == *"--watch"* ]]; then
    /usr/bin/env tsx watch --tsconfig $executable_path/../../tsconfig.architest.json $executable_path/architest.js "${@/ --watch/}"
else
    /usr/bin/env tsx --tsconfig $executable_path/../../tsconfig.architest.json $executable_path/architest.js "$@"
fi
