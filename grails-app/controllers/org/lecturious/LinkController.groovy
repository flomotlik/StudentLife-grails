package org.lecturious

import grails.converters.JSON;

class LinkController {
  
  static def allowedMethods = [add:'POST', list:'GET']
  
  def add = {
    def status = 200
    def text = ""
    if(params.id && Course.exists(params.id)){
      def link = new Link(description:params.description, link:params.link)
      def course= Course.get(params.id)
      course.addToLinks(link)
      course.save(flush:true) ? (text = link.id.toString()) : (status = 400)
    }else{
      status = 400
    }
    log.debug("Text: $text Status: $status")
    render(text:text, status:status)
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
