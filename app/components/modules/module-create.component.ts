app.component('moduleCreate', {
  templateUrl: '/components/modules/module-create.component.html',
  controller: ($scope, $location, apiService) => {

    $scope.createModule = () => {
      apiService.createModule($scope.id, $scope.name, $scope.compulsory, $scope.description, $scope.objective)
        .then(() => {
          $location.path('/modules');
        });
    }

  }
});