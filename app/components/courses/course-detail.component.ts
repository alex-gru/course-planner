app.component('courseDetail', {
  templateUrl: '/components/courses/course-detail.component.html',
  controller: ($scope, $http, $routeParams, apiService) => {
    apiService.getCourse($routeParams.id).then((response) => {
      $scope.course = response.data;
    }).then(() => {
      apiService.getModule($scope.course.moduleId).then((response) => {
          $scope.module = response.data;
        });
      }
    );
  }
});