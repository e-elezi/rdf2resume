#!/bin/bash

# GENERIC IMAGES

# build ui
cd ./UI
npm install
npm run build
rm -Rf ../Docker/build
cp -fR build/ ../Docker/build/
mkdir ../Docker/build/static/media/html
cp -fR ../websiteTemplate/* ../Docker/build/static/media/html/

#docker compose
cd ../Docker
docker-compose up --build