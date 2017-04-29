declare let greeting: any;

angular.module('app').component('greeter', {
  templateUrl: '/views/greeter.component.html',
  controller: ($scope, $http) => {
    $scope.greeting = greeting;
    $scope.name = "Jane Doe";
    $scope.description = "This is a dockerized MEAN webapp, implemented in Typescript, with full support for hot code reload and debugging with an IDE.";
  }
});
