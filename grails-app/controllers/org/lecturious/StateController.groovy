package org.lecturious

import grails.converters.JSON 


class StateController {
  
  static def allowedMethods = [add:'POST', list:'GET']
  
  def workflowService
  
  def add = {
    render workflowService.saveWithParent(params.id, Country, {
      def state = new State(name: params.name)
      def country = Country.get(params.id)
      country.addToStates(state)
    })
  }
  
  def list = {
    if(params.id && Country.exists(params.id)){
      def country = Country.get(params.id)
      def states = State.findAllByCountry(country)
      render states.collect{[id:it.id, name:it.name]
      } as JSON
    }else{
      render(status:400)     
    }
  }
}
