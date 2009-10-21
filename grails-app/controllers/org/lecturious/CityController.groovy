package org.lecturious

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

class CityController {

  def index = { }

  def persistenceManager

  def add = {
    def state = persistenceManager.getObjectById(State.class, getStateKey())
    def city = new City(name: params.name)
    persistenceManager.makePersistent(city)
    state.cities << city
    persistenceManager.makePersistent(state)
    render city.id
  }

  def list = {
    def state = persistenceManager.getObjectById(State.class, getStateKey())
    render(builder: "json", contentType:"application/json") {
      cities {
        state.cities.each {
          city(id: it.id.getId(), name: it.name)
        }
      }
    }
  }

  private def getStateKey() {
    def countryId = Long.valueOf(params.country)
    def stateId = Long.valueOf(params.state)
    def key = new KeyFactory.Builder(Country.class.simpleName, countryId).
            addChild(State.class.simpleName, stateId).key
  }
}
