package org.lecturious

import grails.util.GrailsUtil
import org.lecturious.User

class CalendarController {
  
  def courseElements = {
    def cal = new GregorianCalendar(params.year.toInteger(), params.month.toInteger(), params.day.toInteger()).time
    log.debug(cal.class)
    def between = [cal, cal+1]
    log.debug(between)
    def courses = User.get(session.user).inscriptions*.course
    def todos = Todo.findAllByCourseInListAndDateBetween(courses, *between)
    def events = Event.findAllByCourseInListAndDateBetween(courses, *between)
    render(template:"/calendar/courseElements", model:[todos:todos, events:events])
  }
}