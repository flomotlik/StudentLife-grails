package org.lecturious

import grails.converters.JSON 


class LinkController {
  
  static def allowedMethods = [add:'POST', list:'GET']
  
  def workflowService
  
  def add = {
    render workflowService.saveWithParent(params.id, Course, {
      def link = new Link(description:params.description, link:params.link)
      def course= Course.get(params.id)
      course.addToLinks(link) 
    } )
  }
  
  def list = {
    if(params.id && Course.exists(params.id)){
      def course = Course.get(params.id)
      render course.links.collect{[id: it.id, description: it.description, link:it.link]
      } as JSON
    }else{
      render(status:400)     
    }
  }
}
