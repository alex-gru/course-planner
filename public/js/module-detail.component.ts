angular.module("app").component('moduleDetail', {
  templateUrl: '/views/module-detail.component.html',
  controller: ($scope, $http, $routeParams) => {
    $http.get("/api/module/" + $routeParams.id).then((response) => {
      $scope.module = response.data;
    });
  }
});