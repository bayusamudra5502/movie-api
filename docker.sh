#!/bin/bash

if [[ -d /app/dist ]]
then
  ./start.sh
else
  ./start.sh --build
fi
