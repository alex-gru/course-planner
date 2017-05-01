const app = angular.module("app", ["ngRoute"])
  .config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
    $routeProvider
    .when("/", {
      redirectTo: "/home",
    })
    .when("/courses", {
      template : "<courses></courses>"
    });
    $locationProvider.html5Mode(true);
  }]);