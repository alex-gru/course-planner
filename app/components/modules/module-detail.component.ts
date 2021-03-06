app.component('moduleDetail', {
  templateUrl: '/components/modules/module-detail.component.html',
  controller: ($scope, $http, $routeParams, $location, apiService) => {
    apiService.getModule($routeParams._id).then((response) => {
      if (response.data == null) {
        $location.path('/not-found');
      }
      $scope.module = response.data;
    }).then(
    apiService.getCoursesOfModule($routeParams._id).then((response) => {
      $scope.courses = response.data;
    }));

    $scope.deleteModule = (_id: Number) => {
      if (confirm("Sure? Module and linked courses will be deleted.")) {
        apiService.deleteModule(_id).then(() => {
          $location.path('/modules');
        })
      }
    }
  }
});