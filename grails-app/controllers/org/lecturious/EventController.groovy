package org.lecturious

import grails.converters.JSON;

class EventController {
  
  static def allowedMethods = [add:'POST', list:'GET']
  
  def add = {
    def status = 200
    def text = ""
    if(params.id && Course.exists(params.id)){
      def event = new Event(description:params.description, date:params.date, duration:params.duration)
      def course= Course.get(params.id)
      course.addToEvents(event)
      course.save(flush:true) ? (text = event.id.toString()) : (status = 400)
    }else{
      status = 400
    }
    log.debug("Text: $text Status: $status")
    render(text:text, status:status)
  }
  
  def list = {
    if(params.id && Course.exists(params.id)){
      def course = Course.get(params.id)
      render course.events.collect{[id: it.id, description: it.description, date:it.date, duration:it.duration]
      } as JSON
    }else{
      render(status:400)     
    }
  }
}
