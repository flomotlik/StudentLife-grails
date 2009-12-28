package org.lecturious

import grails.converters.JSON 


class MessageController {
  
  static def allowedMethods = [add:'POST', list:'GET']
  
  def workflowService
  
  def add = {
    render workflowService.saveWithParent(params.id, Course, {
      def message = new Message(message:params.message)
      def course= Course.get(params.id)
      course.addToMessages(message)
    })
  }
  
  def list = {
    if(params.id && Course.exists(params.id)){
      def course = Course.get(params.id)
      render course.messages.collect{[id: it.id, message:it.message]
      } as JSON
    }else{
      render(status:400)     
    }
  }
}
