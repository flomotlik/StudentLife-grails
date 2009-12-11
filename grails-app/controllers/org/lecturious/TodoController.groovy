package org.lecturious

import grails.converters.JSON;

class TodoController {
  
  static def allowedMethods = [add:'POST', list:'GET']
  
  def add = {
    def status = 200
    def text = ""
    if(params.id && Course.exists(params.id)){
      def todo = new Todo(description:params.description, date:params.date)
      def course= Course.get(params.id)
      course.addToTodos(todo)
      course.save(flush:true) ? (text = todo.id.toString()) : (status = 400)
    }else{
      status = 400
    }
    log.debug("Text: $text Status: $status")
    render(text:text, status:status)
  }
  
  def list = {
    if(params.id && Course.exists(params.id)){
      def course = Course.get(params.id)
      render course.todos.collect{[id: it.id, description: it.description, date:it.date]
      } as JSON
    }else{
      render(status:400)     
    }
  }
}
