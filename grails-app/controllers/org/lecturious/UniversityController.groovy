package org.lecturious

import grails.converters.JSON;

class UniversityController {
  
  static def allowedMethods = [add:'POST', list:'GET']
  
  def add = {
    def status = 200
    def text = ""
    if(params.id && City.exists(params.id)){
      def university= new University(name: params.name)
      def city = City.get(params.id)
      city.addToUniversities(university)
      city.save(flush:true) ? (text = university.id.toString()) : (status = 400)
    }else{
      status = 400
    }
    log.debug("Text: $text Status: $status")
    render(text:text, status:status)
  }
  
  def list = {
    if(params.id && City.exists(params.id)){
      def city = City.get(params.id)
      render city.universities.collect{[id:it.id, name:it.name]
      } as JSON
    }else{
      render(status:400)     
    }
  }
}
