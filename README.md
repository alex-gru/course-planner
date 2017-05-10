# Course Planner

Plan your curriculum with this tool. The webapp is a MEAN-TS application, based on my [starter project I provide here](https://github.com/alex-gru/docker-MEAN-ts-starter). 

### Documentation
This project was realized for the course ``Selected Topics in Software Engineering`` (Supervisor: [Dr. Andreas Naderlinger](http://www.softwareresearch.net/team/researchers/andreas-naderlinger/)), Dept. of CS, University of Salzburg, Austria.

Further notes can be found [here](https://docs.google.com/document/d/1RymleWm07xmH_LnFB5_LOq7yFwj1wB7OvTax7AeAAUc/edit?usp=sharing).


## Application Stack
For the full list of features, check the README of my [docker-mean-ts-starter repo](https://github.com/alex-gru/docker-MEAN-ts-starter).

## Build & Run
First, install dependencies locally. 

`npm install`

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
