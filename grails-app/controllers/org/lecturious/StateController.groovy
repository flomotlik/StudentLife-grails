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
    render workflowService.listWithParent(params.id, Country, State, ["id", "name"])
  }
}
