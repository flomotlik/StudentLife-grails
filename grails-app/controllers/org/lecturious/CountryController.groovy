package org.lecturious

import org.lecturious.Country

class CountryController {

  def persistenceService

  static def allowedMethods = [add:'POST', list:'GET']

  def index = {
    redirect(action: 'list')
  }

  def add = {
    def country = new Country(name: params.name)
    persistenceService.makePersistent(country)
    render country.id
  }

  def list = {
    def allCountries = persistenceService.loadAll(Country.class)
    render(builder: "json", contentType: "application/json") {
      countries {
        allCountries.each {
          count(id: it.id, name: it.name)
        }
      }
    }
  }
}
