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
    render workflowService.listWithParent(params.id, City, University, ["id", "name"])
  }
}
