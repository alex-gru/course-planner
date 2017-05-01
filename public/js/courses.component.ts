angular.module("app").component('courses', {
  templateUrl: '/views/courses.component.html',
  controller: ($scope, $http) => {
    $http.get("/api/courses").then((response) => {
      $scope.courses = response.data;
    });
  }
});