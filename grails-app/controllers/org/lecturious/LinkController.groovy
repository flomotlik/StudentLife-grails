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
    render workflowService.listWithParent(params.id, Course, Link, ["id", "description", "link"])
  }
}
