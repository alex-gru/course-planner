describe('Course', function() {
  it('should have ECTS, which can be modified', function() {
    var ects = 4;
    var course = new Course(ects);
    course.ects = ects;
    expect(course.ects).toBe(ects);
  })
})