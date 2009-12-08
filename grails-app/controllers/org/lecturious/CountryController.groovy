package org.lecturious

class CountryController {
  
  //  static def allowedMethods = [add:'POST', list:'GET']
  
  def index = {
    redirect(action: 'list')
  }
  
  def add = {
    def country = new Country(name: params.name)
    if(!country.save()){
      country.errors.each{
        println it
      }
      render "Not Working"
    }else{
      log.debug("Saved: $country")
      render country.id
    }
  }
  
  def list = {
    def allCountries = Country.list()
    render(builder: "json", contentType: "application/json") {
      countries {
        allCountries.each {
          count(id: it.id, name: it.name)
        }
      }
    }
  }
}
