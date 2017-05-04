app.component('moduleDetail', {
  templateUrl: '/components/modules/module-detail.component.html',
  controller: ($scope, $http, $routeParams, apiService) => {
    apiService.getModule($routeParams.id).then((response) => {
      $scope.module = response.data;
    });
    apiService.getCoursesOfModule($routeParams.id).then((response) => {
      $scope.courses = response.data;
    });
  }
});