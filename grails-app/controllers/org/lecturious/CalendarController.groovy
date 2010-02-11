package org.lecturious

import grails.util.GrailsUtil

class CalendarController {

  def calendarService

  def index = {
    //Returning current year and month so include tag in index can call calendar action of this controller
    //with correct year and month
    def gregorian = new GregorianCalendar()
    [year: gregorian.get(Calendar.YEAR), month: gregorian.get(Calendar.MONTH)]
  }

  def courseElements = {HasDateCommand cmd ->
    if (cmd.validate()) {
      def between = [cmd.date, cmd.date + 1]
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