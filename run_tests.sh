#!/bin/sh

set -e
# check the sourse against eslint rules
./node_modules/eslint/bin/eslint.js -c tests/.eslintrc.json .

# check the stub definitions for problems that can cause exceptions
node ./tests/check_stubs.js

# run the unit tests
JASMINE_CONFIG_PATH=tests/jasmine.json ./node_modules/jasmine/bin/jasmine.js
