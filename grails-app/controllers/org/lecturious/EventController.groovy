package org.lecturious

import grails.converters.JSON 


class EventController {
  
  static def allowedMethods = [add:'POST', list:'GET']
  
  def workflowService
  
  def add = {
    render workflowService.saveWithParent(params.id, Course, {
      def event = new Event(description:params.description, date:params.date, duration:params.duration)
      def course= Course.get(params.id)
      course.addToEvents(event)
    })
  }
  
  def list = {
    if(params.id && Course.exists(params.id)){
      def course = Course.get(params.id)
      def events = Event.findAllByCourse(course)
      render events.collect{[id: it.id, description: it.description, date:it.date, duration:it.duration]
      } as JSON
    }else{
      render(status:400)     
    }
  }
}
