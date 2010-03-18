package org.lecturious

class CalendarController {
  
  def calendarService
  
  def index = {
    //Returning current year and month so include tag in index can call calendar action of this controller
    //with correct year and month
    def gregorian = new GregorianCalendar()
    def student = Student.get(session.user)
    assert student
    def courses = student.inscriptions*.course
    log.debug(courses)
    def requestParams = [sort: "date", order: "asc", max: 5]
    def events = []
    def todos = []
    if(courses){
      events = Event.findAllByCourseInListAndDateGreaterThan(courses, new Date(), requestParams)
      todos = Todo.findAllByCourseInListAndDateGreaterThan(courses, new Date(), requestParams)
    }
    [year: gregorian.get(Calendar.YEAR), month: gregorian.get(Calendar.MONTH), events: events, todos: todos]
  }
  
  def courseElements = {HasDateCommand cmd ->
    if (cmd.validate()) {
      //Only events from the same day should be loaded. Because of this we add one day to the given date
      // and subtract 1 from the milliseconds of the date. It therefore has to be on the day before
      def to = new Date((cmd.date + 1).time - 1)
      def between = [cmd.date, to]
      println between
      log.debug(between)
      def model = calendarService.courseElements(session.user, * between)
      def calendar = new GregorianCalendar()
      calendar.time = cmd.date
      //FIXME Helper method for getting dates out of calendar needed
      model.year = calendar.get(Calendar.YEAR)
      //Grails command objects parse the month incorrectly. They parse from 1-12 for months instead
      // of 0-11 like GregorianCalendar does. We have to add 1 to the month so when you add a deadline
      // or date the correct month is selected by g:datePicker
      model.month = calendar.get(Calendar.MONTH) + 1
      model.day = calendar.get(Calendar.DAY_OF_MONTH)
      log.debug(model)
      render(template: "/calendar/courseElements", model: model)
    }
  }

  def calendar = {
    log.debug("Year: ${params.year?.toInteger()} - Month: ${params.month?.toInteger()}")
    def year = params.year?.toInteger()
    def month = params.month?.toInteger()
    log.debug("Variables: $year - $month")
    def model = calendarService.calendar(session.user, year, month)
    log.debug("Model: $model.year - $model.month - $model")
    render(template: "/calendar/calendar", model: model)
  }

  def addCourseDate = {HasDateCommand cmd ->
    if (cmd.validate()) {
      render(template: "/calendar/addCourseDate", model: [date: cmd.date,
              courses: Student.get(session.user).inscriptions*.course])
    }
  }

  def addDeadline = {HasDateCommand cmd ->
    if (cmd.validate()) {
      render(template: "/calendar/addTodo", model: [date: cmd.date, courses: Student.get(session.user).inscriptions*.course])
    }
  }
}
class HasDateCommand {
  Date date

  static constraints = {
    date(nullable: false)
  }
}