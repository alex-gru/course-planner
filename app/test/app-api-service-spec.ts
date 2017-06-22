let inject: any;

describe("Check api-service used in angular app", function () {
  let apiService, $httpBackend;

  const TEST_ID = 3;
  const URL_GET_COURSES = '/api/courses';
  const URL_GET_COURSE = '/api/course/' + TEST_ID;
  const URL_GET_MODULES = '/api/modules';
  const URL_GET_MODULE = '/api/module/' + TEST_ID;
  const URL_GET_MODULE_COURSES = '/api/module/' + TEST_ID + '/courses';
  const URL_PUT_COURSE = '/api/course';
  const URL_PUT_MODULE = '/api/module';
  const URL_DELETE_COURSE = '/api/course/' + TEST_ID;
  const URL_DELETE_MODULE = '/api/module/' + TEST_ID;

  beforeEach(() => angular.module('app'));
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 8000;
  });

  beforeEach(() => {
    inject(($injector) => {
      apiService = $injector.get('apiService');
      $httpBackend = $injector.get('$httpBackend');
    });

    // return just empty response = mocking the server for $http requests in api-service

    $httpBackend.when('GET', URL_GET_COURSES).respond([]);
    $httpBackend.when('GET', URL_GET_COURSE).respond([]);
    $httpBackend.when('GET', URL_GET_MODULES).respond([]);
    $httpBackend.when('GET', URL_GET_MODULE).respond([]);
    $httpBackend.when('GET', URL_GET_MODULE_COURSES).respond([]);
    $httpBackend.when('PUT', URL_PUT_COURSE).respond([]);
    $httpBackend.when('PUT', URL_PUT_MODULE).respond([]);
    $httpBackend.when('DELETE', URL_DELETE_COURSE).respond([]);
    $httpBackend.when('DELETE', URL_DELETE_MODULE).respond([]);
  });


  // check if angular api-service calls the expected URLs

  it("works for getCourses",() => {
    $httpBackend.expect('GET', URL_GET_COURSES);
    apiService.getCourses();
    $httpBackend.flush();
  });

  it("works for getCourse",() => {
    $httpBackend.expect('GET', URL_GET_COURSE);
    apiService.getCourse(TEST_ID);
    $httpBackend.flush();
  });

  it("works for getModules",() => {
    $httpBackend.expect('GET', URL_GET_MODULES);
    apiService.getModules();
    $httpBackend.flush();
  });

  it("works for getModule",() => {
    $httpBackend.expect('GET', URL_GET_MODULE);
    apiService.getModule(TEST_ID);
    $httpBackend.flush();
  });

  it("works for getCoursesOfModule",() => {
    $httpBackend.expect('GET', URL_GET_MODULE_COURSES);
    apiService.getCoursesOfModule(TEST_ID);
    $httpBackend.flush();
  });

  it("works for createCourse",() => {
    $httpBackend.expect('PUT', URL_PUT_COURSE);
    apiService.createCourse();
    $httpBackend.flush();
  });

  it("works for createModule",() => {
    $httpBackend.expect('PUT', URL_PUT_MODULE);
    apiService.createModule();
    $httpBackend.flush();
  });

  it("works for deleteCourse",() => {
    $httpBackend.expect('DELETE', URL_DELETE_COURSE);
    apiService.deleteCourse(TEST_ID);
    $httpBackend.flush();
  });

  it("works for deleteModule",() => {
    $httpBackend.expect('DELETE', URL_DELETE_MODULE);
    apiService.deleteModule(TEST_ID);
    $httpBackend.flush();
  });

});