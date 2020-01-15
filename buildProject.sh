#!/bin/bash

# GENERIC IMAGES

# fuseki
#docker run --name fuseki-data -v /fuseki busybox
#docker run -p 3030:3030 -e ADMIN_PASSWORD=pw123 stain/jena-fuseki

# build ui
cd ./UI
npm run build
rm -Rf ../Docker/build
cp -fR build/ ../Docker/build/

#docker compose
cd ../Docker
docker-compose up --build