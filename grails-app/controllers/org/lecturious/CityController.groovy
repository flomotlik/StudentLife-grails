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
    if(params.id && State.exists(params.id)){
      def state = State.get(params.id)
      def cities = City.findAllByState(state)
      render cities.collect{[id:it.id, name:it.name]
      } as JSON
    }else{
      render(status:400)     
    }
  }
}
