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
    if(params.id && Course.exists(params.id)){
      def course = Course.get(params.id)
      def todos = Todo.findAllByCourse(course)
      render todos.collect{[id: it.id, description: it.description, date:it.date]
      } as JSON
    }else{
      render(status:400)     
    }
  }
}
