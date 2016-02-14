# blockwelt

[![Build Status](https://travis-ci.org/just-kile/blockwelt.svg)](https://travis-ci.org/just-kile/blockwelt/)
[![Coverage Status](https://coveralls.io/repos/just-kile/blockwelt/badge.svg?branch=master&service=github)](https://coveralls.io/github/just-kile/blockwelt?branch=master)

This project is for visualizing your Google location data. 

## Build process

* install node.js
* `cd /path/to/<git-root>`
* `npm install bower -g`
* `npm install -q`

## Setup

* Setup a mongodb on localhost:27017
* ... e.g. via docker: `docker run -p 27017:27017 --name blockwelt-db -d mongo`

## Start
* `npm start`
* open `localhost:9003` in browser
