package org.lecturious

class TodoController {
  
  def add = {
    log.debug("Adding Todo")
    def year = params.year.toInteger()
    def month = params.month.toInteger() - 1
    def day = params.day.toInteger()
    def hour = params.hour.toInteger()
    def minute = params.minute.toInteger()
    log.debug("$year - $month - $day")
    def calendar = new GregorianCalendar(year, month, day, hour, minute);
    def todo = new Todo(description:params.description, date:calendar.time)
    def course= Course.get(params.courseId)
    course.addToTodos(todo)
    log.debug("Course saved: ${course.save()}")
    log.debug(Todo.list().size())
    redirect(controller:"calendar", action:"index")
  }
}
