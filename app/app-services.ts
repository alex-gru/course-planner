app.factory('apiService', ['$http', ($http) => {

  function getCourses() {
    return $http.get("/api/courses");
  }

  function getCourse(id) {
    return $http.get("/api/course/" + id);
  }

  function getModules() {
    return $http.get("/api/modules");
  }

  function getModule(id) {
    return $http.get("/api/module/" + id);
  }

  function getCoursesOfModule(moduleId) {
    return $http.get("/api/module/" + moduleId + "/courses");
  }

  function deleteCourse(id) {
    return $http.delete("/api/course/" + id);
  }

  function deleteModule(id) {
    return $http.delete("/api/module/" + id);
  }

  return {
    getCourses: getCourses,
    getCourse: getCourse,
    getModules: getModules,
    getModule: getModule,
    getCoursesOfModule: getCoursesOfModule,
    deleteCourse: deleteCourse,
    deleteModule: deleteModule
  }
}]);