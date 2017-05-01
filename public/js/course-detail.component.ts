angular.module("app").component('courseDetail', {
  templateUrl: '/views/course-detail.component.html',
  controller: ($scope, $http, $routeParams) => {
    $http.get("/api/course/" + $routeParams.id).then((response) => {
      $scope.course = response.data;
    });
  }
});