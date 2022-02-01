#!/bin/bash

mkdir -p ./dist/private
openssl rand -out ./dist/private/auth.key -base64 1024

mkdir -p ./dist/templates
cp ./src/templates/* ./dist/templates

mkdir -p ./dist/static
cp ./public/* ./dist/static

npm run build:style
npm run build:script
npm run migrate:prod
