angular.module("app").component('modules', {
  templateUrl: '/views/modules.component.html',
  controller: ($scope, $http) => {
    $http.get("/api/modules").then((response) => {
      $scope.modules = response.data;
    });
  }
});