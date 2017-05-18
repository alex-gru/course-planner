app.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
  $routeProvider
    .when("/", {
      redirectTo: "/home",
    })
    .when("/home", {
      template: "<home></home>"
    })
    .when("/courses/new", {
      template: "<course-edit></course-edit>"
    })
    .when("/courses", {
      template: "<course-list></course-list>"
    })
    .when("/course/:_id", {
      template: "<course-detail></course-detail>"
    })
    .when("/course/:_id/edit", {
      template: "<course-edit></course-edit>"
    })
    .when("/modules", {
      template: "<module-list></module-list>"
    })
    .when("/modules/new", {
      template: "<module-create></module-create>"
    })
    .when("/module/:_id", {
      template: "<module-detail></module-detail>"
    })
    .when("/module/:_id/edit", {
      template: "<module-create></module-create>"
    })
    .when("/not-found", {
      template: "<not-found></not-found>"
    })
    .otherwise({
      redirectTo: "/home",
    });
  $locationProvider.html5Mode(true);
}]);