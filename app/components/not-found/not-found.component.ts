app.component('notFound', {
  templateUrl: '/components/not-found/not-found.component.html',
  controller: ($scope, $window) =>

    $scope.back = () => {
      $window.history.go(-2); // -1 = led to not-found, -2 = last correct site
  }
});