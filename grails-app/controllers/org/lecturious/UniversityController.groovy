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
  
  def joinFlow = {
    initialize {
      action {
        def countries = Country.list()
        log.debug(countries)
        [ collection:countries]
      }
      on ("success").to "showCountries"      
    }
    
    showCountries {
      render(view:"/university/show")
      on("select"){
        def country = Country.get(params.item)
        flow.country = country
        [selected:country, collection:country.states]
      } .to "showStates"
      on("add"){
        def country = new Country(params)
        log.debug(country)
        flow.country = country
        [selected:country, collection:country.states]
      }.to "showStates"
    }
    showStates{
      render(view:"/university/show")
      on("select"){
        def state = State.get(params.item)
        flow.state = state
        [selected:state, collection:state.cities]
      } .to "showCities"
      on("add"){
        def state = new State(params)
        def country = flow.country
        country.addToStates(state)
        flow.state = state
        log.debug("state - $state.name")
        [selected:state, collection:state.cities]
      }.to "showCities"
    }
    showCities{
      render(view:"/university/show")
      on("select"){
        def city = City.get(params.item)
        flow.city = city
        def collection = city.universities.collect {[name:it.name]
        }
        log.debug("Collection: $collection")
        [selected:city, collection:collection]
      } .to "showUniversities"
      on("add"){
        def city = new City(params)
        def state = flow.state
        state.addToCities(city)
        log.debug(city)
        flow.city = city
        [selected:city, collection:[]]
      }.to "showUniversities"
    }
    showUniversities{
      render(view:"/university/show")
      on("select"){
        log.debug("Item: $params.item")
        def universityKey = flow.city.universities.find{it.name == params.item
        }
        log.debug("University: $universityKey")
        def user = User.get(session.user)
        if (!user.universities?.contains(universityKey) && flow.country.save()) {
          user.addToUniversities(universityKey)
          user.save()
        }else{
          log.debug("Not joining")
        }
        [user:user]
      } .to "joined"
      on("add"){
        def university = new University(params)
        def city = flow.city
        city.addToUniversities(university)
        log.debug(city)
        [selected:city, collection:city.universities]
      }.to "showUniversities"
    }
    joined{
      render(view:"/settings/_index")
    }
  }
}
