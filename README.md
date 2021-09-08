# XSpeedIt - small test application

This repo contains both front-end (`/client` folder) and back-end (`/server` folder).

Logic is mostly in server, client is just a small UI.

## Install dependencies

run `yarn install` in `/client` then in `/server`

## Run project

run `yarn start` in `/client` then in `/server`
You should now be able to access to the front-end on `localhost:4200` in your browser and it should call
the backend on `localhost:8200`

## Tests

run `yarn run test` in `/server` to launch a few jest units tests.

nb: Don't bother with client test, that's just default files generated with create-react-app
