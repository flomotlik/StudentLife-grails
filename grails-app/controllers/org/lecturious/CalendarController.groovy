package org.lecturious

import grails.util.GrailsUtil
import org.lecturious.User

class CalendarController {
  
  def calendarService
  
  def courseElements = {
    def cal = new GregorianCalendar(params.year.toInteger(), params.month.toInteger(), params.day.toInteger()).time
    log.debug(cal.class)
    def between = [cal, cal+1]
    log.debug(between)
    render(template:"/calendar/courseElements", model:calendarService.courseElements(session.user, *between))
  }
  
  def calendar = {
    def year = params.year.toInteger()
    def month =  params.month.toInteger()
    log.debug("$year - $month")
    def model = calendarService.calendar(session.user,year,month)
    log.debug("$model.year - $model.month")
    render(template:"/calendar/calendar", model:model)
  }
}