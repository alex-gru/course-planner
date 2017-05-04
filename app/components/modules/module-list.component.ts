app.component('moduleList', {
  templateUrl: '/components/modules/module-list.component.html',
  controller: ($scope, $http, apiService) => {
    apiService.getModules().then((response) => {
      $scope.modules = response.data;
    });
  }
});