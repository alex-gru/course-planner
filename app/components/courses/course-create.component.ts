angular.module("app").component('courseCreate', {
  templateUrl: '/components/courses/course-create.component.html',
  controller: ($scope, $http, $routeParams) => {
    $http.get("/api/modules").then((response) => {
      $scope.modules = response.data;
    });
  }
});