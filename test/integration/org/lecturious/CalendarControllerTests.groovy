package org.lecturious

import grails.test.ControllerUnitTestCase

class CalendarControllerTests extends StudentLifeControllerTest {
  protected void setUp() {
    super.setUp()
  }

  protected void tearDown() {
    super.tearDown()
  }

  void testIndex() {
    def user = createUser()
    mockSession.user = user.id
    def course = createCourse()
    def date = new Date()
    user.addToInscriptions course: course
    //7 times, so ones is too early and one is not shown, because of max value
    7.times {
      course.addToEvents(description: "Desc", duration: 1, date: date + it)
    }
    7.times {
      course.addToTodos(description: "Desc", date: date + it)
    }
    course.save()
    def calendar = new GregorianCalendar()
    def model = controller.index()
    assert model.year == calendar.get(Calendar.YEAR)
    assert model.month == calendar.get(Calendar.MONTH)
    assert model.events.size() == 5
    assert model.todos.size() == 5
    def dates = (1..5).collect {date + it}
    println dates
    println model.events*.date
    println model.todos*.date
    assert model.events*.date == dates
    assert model.todos*.date == dates
  }

  void testCourseElements() {
    def calendar = new GregorianCalendar(2010, 0, 1)
    def calendarForEvents = new GregorianCalendar(2010, 0, 1, 10, 10).time
    def user = createUser()
    def course = createCourse()
    user.addToInscriptions(course: course)
    assert user.save()
    course.addToEvents(description: "Desc", date: calendarForEvents, duration: 5)
    course.addToTodos(description: "Desc", date: calendarForEvents)
    assert course.save()
    mockParams.date_year = calendar.get(Calendar.YEAR)
    mockParams.date_month = calendar.get(Calendar.MONTH)
    mockParams.date_day = calendar.get(Calendar.DAY_OF_MONTH)
    mockSession.user = user.id
    controller.calendarService = new CalendarService()
    controller.courseElements(new HasDateCommand(date: calendar.time))
    def model = renderArgs.model
    assert renderArgs.template == "/calendar/courseElements"
    assert model.year == 2010
    assert model.month == 1
    assert model.day == 1
    def todos = model.todos
    def events = model.events
    assert todos.size() == 1
    assert events.size() == 1
    assert todos*.description == ["Desc"]
    assert events*.description == ["Desc"]
    assert todos*.date == [calendarForEvents]
    assert events*.date == [calendarForEvents]
  }

  void testCourseElementsOnlySameDay() {
    //Dates or events that are at 0.0 shouldn't be shown on last day
    def calendarForEvents = new GregorianCalendar(2010, 1, 2, 0, 0).time
    def user = createUser()
    def course = createCourse()
    user.addToInscriptions(course: course)
    def desc = "Description"
    mockSession.user = user.id
    mockLogging CalendarController
    course.addToEvents(description: desc, duration: 2, date: calendarForEvents)
    course.addToTodos(description: desc, date: calendarForEvents)
    assert course.save()
    println(course.events*.date)
    println(course.todos*.date)
    controller.calendarService = new CalendarService()
    controller.courseElements(new HasDateCommand(date: calendarForEvents - 1))
    def model = renderArgs.model
    println model
    assert model.events.size() == 0
    assert model.todos.size() == 0
  }
}