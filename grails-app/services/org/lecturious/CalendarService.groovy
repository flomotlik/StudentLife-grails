package org.lecturious;

import java.util.Calendar;
import java.util.GregorianCalendar;
import grails.util.GrailsNameUtils;

class CalendarService {
  
  def days = [6,0,1,2,3,4,5]
  
  def calendar(user) {
    def gregorian = new GregorianCalendar()
    def year = gregorian.get(Calendar.YEAR)
    def month = gregorian.get(Calendar.MONTH)
    this.calendar(user, year, month)
  }
  
  def calendar(user, year, month){
    def calendar = new GregorianCalendar(year, month, 1)
    def calendar2 = new GregorianCalendar(year, month + 1, 1)
    def daysOfLastMonth = days[calendar.get(Calendar.DAY_OF_WEEK) - 1];
    def daysInMonth = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
    def courseElements = courseElements(user, calendar.time, calendar2.time)
    calendar.add(Calendar.DATE, daysInMonth - 1)
    def ofDays = days[calendar.get(Calendar.DAY_OF_WEEK) - 1]
    def daysOfNextMonth = 6 - ofDays;
    calendar.add(Calendar.DATE, -1 - (daysInMonth - 1));
    def lastDayOfBeforeMonth = calendar.get(Calendar.DATE)
    
    def lastMonth = []
    (daysOfLastMonth).times{
      lastMonth << [day:(lastDayOfBeforeMonth - daysOfLastMonth + 1 + it)]
    }
    //    log.debug("LastMonth $lastMonth")
    def thisMonth = (1..daysInMonth).collect{[day:it] }
    //    log.debug("ThisMonth $thisMonth")
    def nextMonth = [] 
    daysOfNextMonth.times{
      nextMonth << [day:it+1]
    }
    //    log.debug("NextMonth $nextMonth")
    log.debug("ThisMonth $thisMonth")
    def each = { items ->
      items.each{
        def tmpGregorian = new GregorianCalendar()
        tmpGregorian.time = it.date
        def day = tmpGregorian.get(Calendar.DATE)
        log.debug("Day: $day - $it.description - $it.course.name")
        log.debug(it.class)
        def type = GrailsNameUtils.getShortName(it.class)
        log.debug(type)
        thisMonth[day-1].type ? thisMonth[day-1].type = "both" : (thisMonth[day-1].type = type)
      }
    }
    each(courseElements.events)
    each(courseElements.todos)
    log.debug("ThisMonth $thisMonth")
    log.debug("$year - $month")
    def rows = lastMonth + thisMonth + nextMonth
    def timesToSplit = rows.size() / 7
    def splittedRows = []
    timesToSplit.times{
      splittedRows << rows.subList(7 * it, 7 * (it+1))
    }
    log.debug("Rows: $splittedRows")
    [rows:splittedRows, todos:courseElements.todos, events:courseElements.events, year:year, month:month]
  }
  
  def courseElements(user, from, to){
    log.debug("From: $from")
    log.debug("To: $to")
    def courses = User.get(user).inscriptions*.course
    def todos = Todo.findAllByCourseInListAndDateBetween(courses, from, to)
    def events = Event.findAllByCourseInListAndDateBetween(courses, from, to)
    [todos:todos, events:events]
  }
}