#!/bin/bash

mkdir -p private
openssl rand -out ./private/auth.key -base64 1024

npx prisma migrate deploy
