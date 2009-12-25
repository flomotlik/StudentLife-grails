package org.lecturious

import grails.converters.JSON;

class MessageController {
  
  static def allowedMethods = [add:'POST', list:'GET']
  
  def add = {
    def status = 200
    def text = ""
    if(params.id && Course.exists(params.id)){
      def message = new Message(message:params.message)
      def course= Course.get(params.id)
      course.addToMessages(message)
      course.save(flush:true) ? (text = message.id.toString()) : (status = 400)
    }else{
      status = 400
    }
    log.debug("Text: $text Status: $status")
    render(text:text, status:status)
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
