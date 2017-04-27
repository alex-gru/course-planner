# Starter project for a dockerized MEAN webapp (+Typescript)
This repository provides an out-of-the-box environment for a fully dockerized web application. 

`CAUTION:` not production-ready yet!

## Application Stack
![image](http://i65.tinypic.com/atvtl.jpg)

* `Docker`, `docker-compose` container platform, orchestration
* `Typescript` code frontend, backend
* `MongoDB` document database
* `Express` web server
* `AngularJS` frontend js/ts framework
* `Node.js` backend
* `Pug` template engine for Node.js

#### Call for PRs regarding Angular upgrade
With this established environment, I could not get Angular (4) running, so I use AngularJS for now. 
Any ideas would be appreciated - just create a PR.

## Features
zero downtime development with Docker, hot code reload, browser auto-refresh, debugging

## Build & Run
First, install dependencies locally. 

`npm install`

Now, we use `docker-compose` for orchestration of the 3 docker containers used:

- `web` is the node.js web server (based on the slim [mhart/alpine-node](https://hub.docker.com/r/mhart/alpine-node/))
- `mongo` is the mongoDB database (based on [mongo](https://hub.docker.com/_/mongo/))
- `mongo-import` feeds the db in `mongo` with some dummy data (see sub-directory `mongo-import`, also based on [mongo](https://hub.docker.com/_/mongo/))

### Environments

To separate development features from the actual application, three docker-compose configs are used.

- `base.yml` is the base config

- `dev.yml` should only be used for development environment, since it mounts the project directory, starts file watchers, enables auto-restarts and exposes debugging ports

- `prod.yml` production-safe config

##### Run Production
`docker-compose -f compose-base.yml -f compose-prod.yml up`

##### Run Dev
`docker-compose -f compose-base.yml -f compose-dev.yml up --build`

`-build` rebuilds the image if changes are detected

optional: `-d` makes the container running in the background (use `docker stop` to stop)


## Display the app in your browser

[http://localhost:8080](http://localhost:8080)

## Debug the dockerized node.js application
The repository contains a [debug configuration](.idea/runConfigurations/node_debug_5858.xml) which you can use with `WebStorm` for example. 
See more details about remote node.js debugging [here](https://www.jetbrains.com/help/webstorm/2017.1/run-debug-configuration-node-js-remote-debug.html)

## TDD with Karma/Jasmine

For testing Typescript implementations, [Karma](https://karma-runner.github.io/1.0/index.html) as a testing framework is used, combined with [Jasmine](https://jasmine.github.io/2.5/node.html) as assertion library. 

Trigger the (continuous) testing for your TDD environment by the provided [Karma Run configuration](.idea/runConfigurations/karma_test.xml), or just use

`npm test`