#!/bin/bash

cd frontend/net-scan-view/ \
 && yarn \
 && yarn build \

cd ../..

docker build -t net-scan .
docker run -d --network host --name net-scan-client net-scan

