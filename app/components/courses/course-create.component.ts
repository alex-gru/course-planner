app.component('courseCreate', {
  templateUrl: '/components/courses/course-create.component.html',
  controller: ($scope, $http, $routeParams, $location, apiService) => {
    apiService.getModules().then((response) => {
      $scope.modules = response.data;
      $scope.moduleId = $scope.modules[0]._id;
    });

    $scope.createCourse = () => {
      apiService.createCourse($scope.name, $scope.number, $scope.ects, $scope.type, $scope.lecturer, $scope.moduleId, $scope.description, $scope.objective)
        .then(() => {
        $location.path('/courses');
      });
    }
  }
});