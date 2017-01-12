#!/bin/bash
noflow=$(git ls-files | egrep '^(src|test).*\.js$' | xargs grep --files-without-match '@flow')
if [ -n "$noflow" ]; then
  echo -e "\033[0;31mThese files are missing @flow annotations:\033[0m"
  echo "$noflow"
  exit 1
fi
