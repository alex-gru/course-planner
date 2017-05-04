app.component('courseCreate', {
  templateUrl: '/components/courses/course-create.component.html',
  controller: ($scope, $http, $routeParams, apiService) => {
    apiService.getModules().then((response) => {
      $scope.modules = response.data;
    });
  }
});