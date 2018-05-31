#!/bin/bash

yarn build
cd build
cp ../manifest.yml .
cf push
