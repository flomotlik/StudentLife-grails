package org.lecturious

import grails.test.*

class TodoControllerTests extends StudentLifeControllerTest {
  protected void setUp() {
    super.setUp()
  }

  protected void tearDown() {
    super.tearDown()
  }

  void testAdd() {
    def course = createCourse().id
    def date = new Date()
    assert Todo.count() == 0
    def desc = "Description"
    def user = createUser()
    mockSession.user = user.id
    controller.add(new TodoAddCommand(description: desc, date: date, courseId: course))
    assert redirectArgs.controller == "calendar"
    assert redirectArgs.action == "index"
    println(Todo.count())
    assert Todo.count() == 1
    def todo = Todo.list()[0]
    assert todo.date == date
    assert todo.description == desc
  }

  void testAddCourseDoesntExist() {
    assert Course.count() == 0
    controller.add(new TodoAddCommand(description: "desc", courseId: 1, date: new Date()))
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
    controller.add(new TodoAddCommand())
    assert renderArgs.template == "/errors"
    def allErrors = renderArgs.model.errors.errors.allErrors
    assert allErrors.size() == 4
    assert allErrors*.code == ["nullable", "min.notmet", "course.exists.false", "nullable"]
    assert allErrors*.field == ["description", "courseId", "courseId", "date"]
  }

  private void setMockParams() {
    println controller
    def c = new GregorianCalendar()
    controller.params.date_year = c.get(Calendar.YEAR).toString()
    controller.params.date_month = c.get(Calendar.MONTH).toString()
    controller.params.date_day = c.get(Calendar.DAY_OF_MONTH).toString()
    controller.params.date_hour = c.get(Calendar.HOUR_OF_DAY).toString()
    controller.params.date_minute = c.get(Calendar.MINUTE).toString()
    def desc = "Description"
    controller.params.description = desc
    def course = createCourse()
    println course.id
    assert Course.exists(course.id)
    controller.params.courseId = course.id.toString()
    println "Mockparams.courseId $controller.params.courseId"
  }
}
