package org.lecturious

import grails.converters.JSON 

class CityController {
  
  static def allowedMethods = [add:'POST', list:'GET']
  
  def workflowService
  
  def add = {
    render workflowService.saveWithParent(params.id, State, {
      def city = new City(name: params.name)
      def state = State.get(params.id)
      state.addToCities(city)
    } )
  }
  
  def list = {
    render workflowService.listWithParent(params.id, State, City, ["id", "name"])
  }
}
