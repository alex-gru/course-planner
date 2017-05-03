angular.module("app").component('courseCreate', {
  templateUrl: '/views/course-create.component.html',
  controller: ($scope, $http, $routeParams) => {
    $http.get("/api/modules").then((response) => {
      $scope.modules = response.data;
    });
  }
});