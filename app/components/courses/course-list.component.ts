angular.module("app").component('courseList', {
  templateUrl: '/components/courses/course-list.component.html',
  controller: ($scope, $http) => {
    $http.get("/api/courses").then((response) => {
      $scope.courses = response.data;
    });
  }
});