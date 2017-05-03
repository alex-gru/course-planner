angular.module("app").component('menu', {
  templateUrl: '/views/menu.component.html',
  controller: ($scope, $http, $location) => {
    $scope.getClass = function (path) {
      return ($location.path().substr(0, path.length) === path) ? 'active' : '';
    }
  }

});