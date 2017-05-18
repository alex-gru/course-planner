app.component('courseEdit', {
  templateUrl: '/components/courses/course-edit.component.html',
  controller: ($scope, $http, $routeParams, $location, apiService) => {
    apiService.getModules().then((response) => {
      $scope.modules = response.data;
    }).then(() => {
      if ($routeParams._id) {
        $scope.isNew = false;
        apiService.getCourse($routeParams._id).then((response) => {
          if (response.data == null) {
            $location.path('/not-found');
          }
          $scope.course = response.data;
          $scope.moduleId = $scope.course.moduleId;
        });
      } else {
        $scope.isNew = true;
        $scope.moduleId = $scope.modules[0]._id;
      }
    });

    $scope.submit = () => {
      if ($scope.isNew) {
        // create
        apiService.createCourse($scope.course.name, $scope.course.number, $scope.course.ects, $scope.course.type, $scope.course.lecturer, $scope.moduleId, $scope.course.description, $scope.course.objective)
          .then(() => {
            $location.path('/courses');
          });
      } else {
        // update
        apiService.updateCourse($routeParams._id, $scope.course.name, $scope.course.number, $scope.course.ects, $scope.course.type, $scope.course.lecturer, $scope.moduleId, $scope.course.description, $scope.course.objective)
          .then(() => {
            $location.path('/course/' + $routeParams._id);
          });
      }
    }
  }
});