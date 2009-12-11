package org.lecturious

import grails.converters.JSON;

class CityController {
  
  static def allowedMethods = [add:'POST', list:'GET']
  
  def add = {
    def status = 200
    def text = ""
    if(params.id && State.exists(params.id)){
      def city = new City(name: params.name)
      def state = State.get(params.id)
      state.addToCities(city)
      state.save(flush:true) ? (text = city.id.toString()) : (status = 400)
    }else{
      status = 400
    }
    log.debug("Text: $text Status: $status")
    render(text:text, status:status)
  }
  
  def list = {
    if(params.id && State.exists(params.id)){
      def state = State.get(params.id)
      render state.cities.collect{[id:it.id, name:it.name]
      } as JSON
    }else{
      render(status:400)     
    }
  }
}
