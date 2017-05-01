const app = angular.module("app", ["ngRoute"])
  .config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
    $routeProvider
      .when("/", {
        redirectTo: "/home",
      })
      .when("/home", {
        template: "<home></home>"
      })
      .when("/courses/new", {
        template: "<course-create></course-create>"
      })
      .when("/courses", {
        template: "<courses></courses>"
      })
      .when("/course/:id", {
        template: "<course-detail></course-detail>"
      })
      .when("/modules", {
        template: "<modules></modules>"
      })
      .when("/module/:id", {
        template: "<module-detail></module-detail>"
      });
    $locationProvider.html5Mode(true);
  }]);