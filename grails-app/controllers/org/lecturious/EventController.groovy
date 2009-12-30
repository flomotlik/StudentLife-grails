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
    render workflowService.listWithParent(params.id, Course, Event, ["id", "description", "date", "duration"])
  }
}
