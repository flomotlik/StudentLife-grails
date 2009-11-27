package org.lecturious

import org.lecturious.Country

class StateController {

  def index = { }

  def persistenceService

  def add = {
    def country = loadCountry()
    def state = new State(name: params.name)
    country.states << state
    persistenceService.makePersistent(country)
    render state.id
  }

  def list = {
    log.debug("Country: ${params.country}")
    def country = loadCountry()
    render(builder: "json", contentType: "application/json") {
      states {
        country.states.each {
          state(id: it.id.getId(), name: it.name)
        }
      }
    }
  }
  def loadCountry() {
    persistenceService.getObjectById(Country.class, Long.valueOf(params.country))
  }
}
