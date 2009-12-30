package org.lecturious

import grails.converters.JSON 


class TodoController {
  
  static def allowedMethods = [add:'POST', list:'GET']
  
  def workflowService
  
  def add = {
    render workflowService.saveWithParent(params.id, Course, {
      def todo = new Todo(description:params.description, date:params.date)
      def course= Course.get(params.id)
      course.addToTodos(todo)
    } )
  }
  
  def list = {
    render workflowService.listWithParent(params.id, Course, Todo, ["id", "description", "date"])
  }
}
