#!/bin/sh

# check the sourse atainst eslint rules
./node_modules/eslint/bin/eslint.js -c tests/.eslintrc.json .

# check the stub definitions for problems
node ./tests/check_stubs.js

# run the unit tests
JASMINE_CONFIG_PATH=tests/jasmine.json ./node_modules/jasmine/bin/jasmine.js
