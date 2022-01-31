#!/bin/bash

mkdir -p ./dist/private
openssl rand -out ./dist/private/auth.key -base64 1024

mkdir -p ./dist/templates
cp ./src/templates/* ./dist/templates

npm run build
npm run migrate:prod
