package org.lecturious

class CountryController {
  
  //  static def allowedMethods = [add:'POST', list:'GET']
  
  def add = {
    def country = new Country(name: params.name)
    if(!country.save()){
      log.debug("Country wasn't saved $params.name")
      render(status:400)
    }else{
      log.debug("Saved: $country")
      render country.id.toString()
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
