package org.lecturious

class TodoController {
  
  def add = {
    def year = params.year.toInteger()
    def month = params.month.toInteger() - 1
    def day = params.day.toInteger()
    def hour = params.hour.toInteger()
    def minute = params.minute.toInteger()
    def calendar = new GregorianCalendar(year, month, day, hour, minute);
    def todo = new Todo(description:params.description, date:calendar.time)
    def course= Course.get(params.courseId)
    course.addToTodos(todo)
    course.save()
    redirect(controller:"menu", action:"agenda")
  }
}
