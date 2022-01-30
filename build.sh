#!/bin/bash

mkdir -p private
openssl rand -out ./private/auth.key -base64 1024

docker build --tag gdsc_movie_api:latest .
