#!/bin/bash

# GENERIC IMAGES

# build ui
cd ./UI
npm install
npm run build
rm -Rf ../Docker/build
cp -fR build/ ../Docker/build/

#docker compose
cd ../Docker
docker-compose up --build