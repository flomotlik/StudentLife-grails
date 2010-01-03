package org.lecturious

import grails.converters.JSON 


class MessageController {
  
  static def allowedMethods = [add:'POST', list:'GET']
  
  def workflowService
  
  def add = {
    def message = new Message(message:params.message)
    def course= Course.get(params.id)
    course.addToMessages(message)
    course.save()
    render (template:"/course/showCourse", model:[course:course])
  }
  
  def list = {
    render workflowService.listWithParent(params.id, Course, Message, ["id", "message"])
  }
}
