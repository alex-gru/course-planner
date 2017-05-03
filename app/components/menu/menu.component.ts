angular.module("app").component('menu', {
  templateUrl: '/components/menu/menu.component.html',
  controller: ($scope, $http, $location) => {
    $scope.getClass = function (path) {
      return ($location.path().substr(0, path.length) === path) ? 'active' : '';
    }
  }

});