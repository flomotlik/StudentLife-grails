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
    def calendar = new GregorianCalendar()
    def model = controller.index()
    assert model.year == calendar.get(Calendar.YEAR)
    assert model.month == calendar.get(Calendar.MONTH)
  }

  void testCourseElements() {
    def user = createUser()
    def calendar = new GregorianCalendar(2010, 0, 1)
    mockParams.date_year = calendar.get(Calendar.YEAR)
    mockParams.date_month = calendar.get(Calendar.MONTH)
    mockParams.date_day = calendar.get(Calendar.DAY_OF_MONTH)
    mockSession.user = user.id
    controller.calendarService = new CalendarService()
    controller.courseElements(new HasDateCommand(date:calendar.time))
    assert renderArgs.template == "/calendar/courseElements"
    assert renderArgs.model.year == 2010
    assert renderArgs.model.month == 1
    assert renderArgs.model.day == 1
  }
}