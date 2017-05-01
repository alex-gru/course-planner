angular.module("app").component('courseDetail', {
  templateUrl: '/views/course-detail.component.html',
  controller: ($scope, $http, $routeParams) => {
    $http.get("/api/course/" + $routeParams.id).then((response) => {
      $scope.course = response.data;
    }).then(() => {
        $http.get("/api/module/" + $scope.course.moduleId).then((response) => {
          $scope.module = response.data;
        });
      }
    );
  }
});