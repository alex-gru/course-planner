app.component('moduleCreate', {
  templateUrl: '/components/modules/module-create.component.html',
  controller: ($scope, $location, $routeParams, apiService) => {

    if ($routeParams._id) {
      $scope.isNew = false;
      apiService.getModule($routeParams._id).then((response) => {
        if (response.data == null) {
          $location.path('/not-found');
        }
        $scope.module = response.data;
        $scope.compulsory = $scope.module.compulsory;
      });
    } else {
      $scope.isNew = true;
      $scope.compulsory = true;
    }

    $scope.submit = () => {
      if ($scope.isNew) {
        // create
        apiService.createModule($scope.module.name, $scope.compulsory, $scope.module.description, $scope.module.objective)
          .then(() => {
            $location.path('/modules');
          });
      } else {
        // update
        apiService.updateModule($routeParams._id, $scope.module.name, $scope.compulsory, $scope.module.description, $scope.module.objective)
          .then(() => {
            $location.path('/module/' + $routeParams._id);
          });
      }
    }

  }
});