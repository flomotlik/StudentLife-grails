package org.lecturious

import grails.converters.JSON;

class StateController {
  
  static def allowedMethods = [add:'POST', list:'GET']
  
  def add = {
    def status = 200
    def text = ""
    if(params.id && Country.exists(params.id)){
      def state = new State(name: params.name)
      def country = Country.get(params.id)
      country.addToStates(state)
      country.save(flush:true) ? (text = state.id.toString()) : (status = 400)
    }else{
      status = 400
    }
    log.debug("Text: $text Status: $status")
    render(text:text, status:status)
  }
  
  def list = {
    if(params.id && Country.exists(params.id)){
      def country = Country.get(params.id)
      render country.states.collect{[id:it.id, name:it.name]
      } as JSON
    }else{
      render(status:400)     
    }
  }
}
