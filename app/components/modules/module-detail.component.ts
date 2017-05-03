angular.module("app").component('moduleDetail', {
  templateUrl: '/components/modules/module-detail.component.html',
  controller: ($scope, $http, $routeParams) => {
    $http.get("/api/module/" + $routeParams.id).then((response) => {
      $scope.module = response.data;
    });
    $http.get("/api/module/" + $routeParams.id + "/courses").then((response) => {
      $scope.courses = response.data;
    });
  }
});