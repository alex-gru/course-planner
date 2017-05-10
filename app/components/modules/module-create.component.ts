app.component('moduleCreate', {
  templateUrl: '/components/modules/module-create.component.html',
  controller: ($scope, $location, apiService) => {
    $scope.compulsory = "true";
    $scope.createModule = () => {
      apiService.createModule($scope.name, $scope.compulsory, $scope.description, $scope.objective)
        .then(() => {
          $location.path('/modules');
        });
    }

  }
});