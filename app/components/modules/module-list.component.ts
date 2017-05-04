app.component('moduleList', {
  templateUrl: '/components/modules/module-list.component.html',
  controller: ($scope, $http) => {
    $http.get("/api/modules").then((response) => {
      $scope.modules = response.data;
    });
  }
});