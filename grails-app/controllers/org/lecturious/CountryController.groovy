package org.lecturious

import org.lecturious.Country

class CountryController {

  def persistenceManager

  def index = {
    redirect(action: 'list')
  }

  def add = {
    def country = new Country(name: params.name)
    persistenceManager.makePersistent(country)
    render country.id
  }

  def list = {
    def allCountries = persistenceManager.newQuery(Country.class).execute()
    render(builder: "json", contentType: "application/json") {
      countries {
        allCountries.each {
          count(id: it.id, name: it.name)
        }
      }
    }
  }
}
