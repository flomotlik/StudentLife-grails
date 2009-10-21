package org.lecturious

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

class UniversityController {

  def index = { }

  def persistenceManager

  def add = {
    def city = persistenceManager.getObjectById(City.class, getCityKey())
    def university = new University(name: params.name)
    persistenceManager.makePersistent(university)
    city.universities << university
    persistenceManager.makePersistent(city)
    render university.id
  }

  def list = {
    def city = persistenceManager.getObjectById(City.class, getCityKey())
    render(builder: "json", contentType: "application/json") {
      universities {
        city.universities.each {
          university(id: it.id.getId(), name: it.name)
        }
      }
    }
  }

  private def getCityKey() {
    def countryId = Long.valueOf(params.country)
    def stateId = Long.valueOf(params.state)
    def cityId = Long.valueOf(params.city)
    new KeyFactory.Builder(Country.class.simpleName, countryId).
            addChild(State.class.simpleName, stateId).addChild(City.class.simpleName, cityId).key
  }
}
