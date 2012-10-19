#!/bin/sh

cd /deploy/dir
git fetch origin
git reset --hard origin/master
npm install
