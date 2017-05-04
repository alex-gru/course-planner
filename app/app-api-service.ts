app.factory('apiService', ['$http', ($http) => {

  function getCourses() {
    return $http.get("/api/courses");
  }

  function getCourse(id: Number) {
    return $http.get("/api/course/" + id);
  }

  function getModules() {
    return $http.get("/api/modules");
  }

  function getModule(id: Number) {
    return $http.get("/api/module/" + id);
  }

  function getCoursesOfModule(moduleId: Number) {
    return $http.get("/api/module/" + moduleId + "/courses");
  }

  function createCourse(id: Number, name: String, number: String, ects: Number, type: String, lecturer: String, moduleId: Number, description: String, objective: String) {
    const data = JSON.stringify({
      id: id,
      name: name,
      number: number,
      ects: ects,
      type: type,
      lecturer: lecturer,
      moduleId: moduleId,
      description: description,
      objective: objective
    });
    return $http.put("/api/course", data);
  }

  function createModule(id: Number, name: String, compulsory: Boolean, description: String, objective: String) {
    const data = JSON.stringify({
      id: id,
      name: name,
      compulsory: compulsory,
      description: description,
      objective: objective
    });
    return $http.put("/api/module", data);
  }

  function deleteCourse(id: Number) {
    return $http.delete("/api/course/" + id);
  }

  function deleteModule(id: Number) {
    return $http.delete("/api/module/" + id);
  }

  return {
    getCourses: getCourses,
    getCourse: getCourse,
    getModules: getModules,
    getModule: getModule,
    getCoursesOfModule: getCoursesOfModule,
    createCourse: createCourse,
    createModule: createModule,
    deleteCourse: deleteCourse,
    deleteModule: deleteModule
  }
}]);