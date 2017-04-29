declare let greeting: any;

const app = angular.module("app", []);

app.controller("ctrl", ($scope, $http) => {

    $scope.greeting = greeting;
    $scope.name = "Jane Doe";
    $scope.description = "This is a dockerized MEAN webapp, implemented in Typescript, with full support for hot code reload and debugging with an IDE.";

    $http.get("/api/courses").then((response) => {
        $scope.courses = response.data;
    });
});
