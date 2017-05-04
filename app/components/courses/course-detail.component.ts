app.component('courseDetail', {
  templateUrl: '/components/courses/course-detail.component.html',
  controller: ($scope, $http, $routeParams, $location, apiService) => {
    apiService.getCourse($routeParams.id).then((response) => {
      $scope.course = response.data;
    }).then(() => {
      apiService.getModule($scope.course.moduleId).then((response) => {
          $scope.module = response.data;
        });
      }
    );

    $scope.deleteCourse = function(id: Number) {
      apiService.deleteCourse(id).then(() => {
        $location.path('/courses');
      });
    }
  }
});