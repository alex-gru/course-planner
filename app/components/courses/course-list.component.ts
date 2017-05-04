app.component('courseList', {
  templateUrl: '/components/courses/course-list.component.html',
  controller: ($scope, $http, apiService) => {
    apiService.getCourses().then((response) => {
      $scope.courses = response.data;
    })
  }
});