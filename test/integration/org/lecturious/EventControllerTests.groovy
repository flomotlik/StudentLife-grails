package org.lecturious

class EventControllerTests extends StudentLifeControllerTest {
  protected void setUp() {
    super.setUp()
  }

  protected void tearDown() {
    super.tearDown()
  }

  void testAdd() {
    def course = createCourse().id
    def date = new Date()
    assert Event.count() == 0
    def desc = "Description"
    def duration = 60
    def user = createUser()
    mockSession.user = user.id
    controller.add(new EventAddCommand(description: desc, date: date, courseId: course, duration: duration))
    assert redirectArgs.controller == "calendar"
    assert redirectArgs.action == "index"
    assert Event.count() == 1
    def event = Event.list()[0]
    assert event.date == date
    assert event.description == desc
    assert event.duration == duration
  }

  void testAddCourseDoesntExist() {
    assert Course.count() == 0
    controller.add(new EventAddCommand(description: "desc", courseId: 1, date: new Date(), duration: 1))
    assert renderArgs.template == "/errors"
    def allErrors = renderArgs.model.errors.errors.allErrors
    //Check that only one Error is found and that it is due to nonexistent course
    assert allErrors.size() == 1
    def courseError = allErrors[0]
    println courseError.code
    assert courseError.code == "course.exists.false"
    assert courseError.field == "courseId"
  }

  void testConstraints() {
    controller.add(new EventAddCommand())
    assert renderArgs.template == "/errors"
    def allErrors = renderArgs.model.errors.errors.allErrors
    assert allErrors.size() == 5
    println allErrors*.code
    println allErrors*.field
    assert allErrors*.code == ["min.notmet", "nullable", "min.notmet", "course.exists.false", "nullable"]
    assert allErrors*.field == ["duration", "description", "courseId", "courseId", "date"]
  }
}