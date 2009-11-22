package org.lecturious

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

class UniversityController {

  def index = { }

  def persistenceService

  def keyService

  def add = {
    def city = cityKey()
    def university = new University(name: params.name)
    city.universities << university
    persistenceService.makePersistent(city)
    render university.id
  }

  def list = {
    def city = persistenceService.getObjectById(City.class, keyService.cityKey(params.country, params.state, params.city))
    render(builder: "json", contentType: "application/json") {
      universities {
        city.universities.each {
          university(id: it.id.getId(), name: it.name)
        }
      }
    }
  }
}
