package org.lecturious

import grails.converters.JSON
import java.util.GregorianCalendar;

class TodoController {
  
  static def allowedMethods = [add:'POST', list:'GET']
  
  def workflowService
  
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
  
  def list = {
    render workflowService.listWithParent(params.id, Course, Todo, ["id", "description", "date"])
  }
}
