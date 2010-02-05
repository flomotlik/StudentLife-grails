package org.lecturious

import grails.util.GrailsUtil

class CalendarController {
  
  def calendarService

  def index = {
    //Returning current year and month so include tag in index can call calendar action of this controller
    //with correct year and month
    def gregorian = new GregorianCalendar()
    [year:gregorian.get(Calendar.YEAR), month:gregorian.get(Calendar.MONTH)]
  }

  def courseElements = {
    def cal = new GregorianCalendar(params.year.toInteger(), params.month.toInteger(), params.day.toInteger()).time
    log.debug(cal.class)
    def between = [cal, cal+1]
    log.debug(between)
    def model = calendarService.courseElements(session.user, *between)
    model.year = params.year
    model.month = params.month
    model.day = params.day
    render(template:"/calendar/courseElements", model:model)
  }
  
  def calendar = {
    log.debug("Year: ${params.year?.toInteger()} - Month: ${params.month?.toInteger()}")
    def year = params.year?.toInteger()
    def month =  params.month?.toInteger()
    log.debug("Variables: $year - $month")
    def model = calendarService.calendar(session.user,year,month)
    log.debug("Model: $model.year - $model.month")
    render(template:"/calendar/calendar", model:model)
  }
  
  def addCourseDate = {
    render(template:"/calendar/addCourseDate", model:[year:params.year.toInteger(), month:params.month.toInteger(),
    day:params.day.toInteger(), courses:Student.get(session.user).inscriptions*.course])
  }
  
  def addDeadline = {
    render(template:"/calendar/addTodo", model:[year:params.year.toInteger(), month:params.month.toInteger(), 
    day:params.day.toInteger(), courses:Student.get(session.user).inscriptions*.course])
  }
}