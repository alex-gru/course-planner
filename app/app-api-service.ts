app.factory('apiService', ['$http', ($http) => {

  function getCourses() {
    return $http.get("/api/courses");
  }

  function getCourse(_id: Number) {
    return $http.get("/api/course/" + _id);
  }

  function getModules() {
    return $http.get("/api/modules");
  }

  function getModule(_id: Number) {
    return $http.get("/api/module/" + _id);
  }

  function getCoursesOfModule(moduleId: Number) {
    return $http.get("/api/module/" + moduleId + "/courses");
  }

  function createCourse(name: String, number: String, ects: Number, type: String, lecturer: String, moduleId: Number, description: String, objective: String) {
    const data = JSON.stringify({
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

  function createModule(name: String, compulsory: Boolean, description: String, objective: String) {
    const data = JSON.stringify({
      name: name,
      compulsory: compulsory,
      description: description,
      objective: objective
    });
    return $http.put("/api/module", data);
  }

function updateCourse(_id: Number, name: String, number: String, ects: Number, type: String, lecturer: String, moduleId: Number, description: String, objective: String) {
    const data = JSON.stringify({
      _id: _id,
      name: name,
      number: number,
      ects: ects,
      type: type,
      lecturer: lecturer,
      moduleId: moduleId,
      description: description,
      objective: objective
    });
    return $http.post("/api/course", data);
  }

  function updateModule(_id: Number, name: String, compulsory: Boolean, description: String, objective: String) {
    const data = JSON.stringify({
      _id: _id,
      name: name,
      compulsory: compulsory,
      description: description,
      objective: objective
    });
    return $http.post("/api/module", data);
  }

  function deleteCourse(_id: Number) {
    return $http.delete("/api/course/" + _id);
  }

  function deleteModule(_id: Number) {
    return $http.delete("/api/module/" + _id);
  }

  return {
    getCourses: getCourses,
    getCourse: getCourse,
    getModules: getModules,
    getModule: getModule,
    getCoursesOfModule: getCoursesOfModule,
    createCourse: createCourse,
    createModule: createModule,    
    updateCourse: updateCourse,
    updateModule: updateModule,
    deleteCourse: deleteCourse,
    deleteModule: deleteModule
  }
}]);