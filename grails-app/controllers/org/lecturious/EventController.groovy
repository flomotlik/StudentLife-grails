package org.lecturious

class EventController {
  
  def add = {
    def year = params.year.toInteger()
    def month = params.month.toInteger() - 1
    def day = params.day.toInteger()
    def hour = params.hour.toInteger()
    def minute = params.minute.toInteger()
    def calendar = new GregorianCalendar(year, month, day, hour, minute);
    def event = new Event(description:params.description, date:calendar.time, duration:params.duration.toInteger())
    def course= Course.get(params.courseId)
    course.addToEvents(event)
    course.save()
    redirect(controller:"menu", action:"agenda")
  }
}
