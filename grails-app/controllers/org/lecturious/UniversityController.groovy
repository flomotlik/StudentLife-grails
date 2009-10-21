package org.lecturious

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

class UniversityController {

  def index = { }

  def persistenceManager

  def keyService

  def add = {
    def city = cityKey()
    def university = new University(name: params.name)
    persistenceManager.makePersistent(university)
    city.universities << university
    persistenceManager.makePersistent(city)
    render university.id
  }

  def list = {
    def city = cityKey()
    render(builder: "json", contentType: "application/json") {
      universities {
        city.universities.each {
          university(id: it.id.getId(), name: it.name)
        }
      }
    }
  }

  private def cityKey() {
    persistenceManager.getObjectById(City.class, keyService.cityKey(params.country, params.state, params.city))
  }
}
