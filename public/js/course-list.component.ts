angular.module('app').component('courseList', {
  templateUrl: '/views/course-list.component.html',
  controller: ($scope, $http) => {
    $http.get("/api/courses").then((response) => {
      $scope.courses = response.data;
    });
  }
});