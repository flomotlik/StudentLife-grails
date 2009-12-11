package org.lecturious

import grails.converters.JSON;

class CountryController {
  
  static def allowedMethods = [add:'POST', list:'GET']
  
  def add = {
    def text = ""
    def status = 200
    if(params.name){
      def country = new Country(name: params.name)
      if(!country.save()){
        log.debug("Country wasn't saved $params.name")
        status = 400
      }else{
        log.debug("Saved: $country")
        text = country.id.toString()
      }
    }else{
      status = 400 
    }
    render(text:text, status:status)
  }
  
  def list = {
    def allCountries = Country.list()
    render allCountries.collect{
      [id:it.id, name:it.name]
    } as JSON
  }
}
