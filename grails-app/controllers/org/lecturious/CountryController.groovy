package org.lecturious

import grails.converters.JSON 

class CountryController{
  
  static def allowedMethods = [add:'POST', list:'GET']
  
  def workflowService
  
  def add = {
    render workflowService.save(params.name, {new Country(name: params.name)
    })
  }
  
  def list = {
    def allCountries = Country.list()
    render allCountries.collect{
      [id:it.id, name:it.name]
    } as JSON
  }
}
