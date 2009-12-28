package org.lecturious

import grails.converters.JSON 


class UniversityController {
  
  static def allowedMethods = [add:'POST', list:'GET']
  
  def workflowService
  
  def add = {
    render workflowService.saveWithParent(params.id, City, {
      def university= new University(name: params.name)
      def city = City.get(params.id)
      city.addToUniversities(university)
    })
  }
  
  def list = {
    if(params.id && City.exists(params.id)){
      def city = City.get(params.id)
      def universities = University.findAllByCity(city)
      render universities.collect{[id:it.id, name:it.name]
      } as JSON
    }else{
      render(status:400)     
    }
  }
}
