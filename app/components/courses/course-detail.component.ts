app.component('courseDetail', {
  templateUrl: '/components/courses/course-detail.component.html',
  controller: ($scope, $http, $routeParams, $location, apiService) => {
    apiService.getCourse($routeParams._id).then((response) => {
      if (response.data == null) {
        $location.path('/not-found');
      }
      $scope.course = response.data;
    }).then(() => {
      apiService.getModule($scope.course.moduleId).then((response) => {
          $scope.module = response.data;
        });
      }
    );

    $scope.deleteCourse = (_id: Number) => {
      apiService.deleteCourse(_id).then(() => {
        $location.path('/courses');
      });
    }
  }
});