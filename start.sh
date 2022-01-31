#!/bin/bash

if [[ $1 = "--build" ]] 
then
  ./build.sh
fi

node ./dist/index.js
