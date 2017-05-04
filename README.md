# Course Planner

Plan your curriculum with this tool. The webapp is a MEAN-TS application, based on my [starter project I provide here](https://github.com/alex-gru/docker-MEAN-ts-starter). 

## Application Stack
For the full list of features, check the README of my [docker-mean-ts-starter repo](https://github.com/alex-gru/docker-MEAN-ts-starter).

## Build & Run
First, install dependencies locally. 

`npm install`

Now, we use `docker-compose` for orchestration of the 3 docker containers used:

- `web` is the node.js web server (based on the slim [mhart/alpine-node](https://hub.docker.com/r/mhart/alpine-node/))
- `mongo` is the mongoDB database (based on [mongo](https://hub.docker.com/_/mongo/))
- `mongo-import` feeds the db in `mongo` with some dummy data (see sub-directory `mongo-import`, also based on [mongo](https://hub.docker.com/_/mongo/))

##### Run Production
`docker-compose -f compose-base.yml -f compose-prod.yml up`

##### Run Dev
`docker-compose -f compose-base.yml -f compose-dev.yml up --build`


## Display the app in your browser

[http://localhost:8080](http://localhost:8080)

## TDD with Karma/Jasmine

For testing Typescript implementations, [Karma](https://karma-runner.github.io/1.0/index.html) as a testing framework is used, combined with [Jasmine](https://jasmine.github.io/2.5/node.html) as assertion library. 

Trigger the (continuous) testing for your TDD environment by the provided [Karma Run configuration](.idea/runConfigurations/karma_test.xml), or just use

`npm test`
