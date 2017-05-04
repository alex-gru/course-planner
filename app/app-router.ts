app.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
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
      template: "<course-list></course-list>"
    })
    .when("/course/:id", {
      template: "<course-detail></course-detail>"
    })
    .when("/modules", {
      template: "<module-list></module-list>"
    })
    .when("/modules/new", {
      template: "<module-create></module-create>"
    })
    .when("/module/:id", {
      template: "<module-detail></module-detail>"
    });
  $locationProvider.html5Mode(true);
}]);