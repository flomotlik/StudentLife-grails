package org.lecturious

import grails.util.GrailsUtil

class CalendarController {
  
  def calendarService
  
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
    def year = params.year.toInteger()
    def month =  params.month.toInteger()
    log.debug("$year - $month")
    def model = calendarService.calendar(session.user,year,month)
    log.debug("$model.year - $model.month")
    render(template:"/calendar/calendar", model:model)
  }
  
  def addCourseDate = {
    render(template:"/calendar/addCourseDate", model:[year:params.year, month:params.month, 
    day:params.day, courses:Student.get(session.user).inscriptions*.course])
  }
  
  def addDeadline = {
    render(template:"/calendar/addTodo", model:[year:params.year, month:params.month, 
    day:params.day, courses:Student.get(session.user).inscriptions*.course])
  }
}