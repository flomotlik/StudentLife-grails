package org.lecturious

import org.lecturious.Country

class StateController {

  def index = { }

  def persistenceManager

  def add = {
    def country = getCountry()
    def state = new State(name: params.name)
    persistenceManager.makePersistent(state)
    country.states << state
    persistenceManager.makePersistent(country)
    render state.id
  }

  def list = {
    log.debug("Country: ${params.country}")
    def country = getCountry()
    render(builder: "json", contentType: "application/json") {
      states {
        country.states.each {
          state(id: it.id.getId(), name: it.name)
        }
      }
    }
  }

  private def getCountry() {
    persistenceManager.getObjectById(Country.class, Long.valueOf(params.country))
  }
}
