package org.lecturious

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

class UniversityController {

  def index = { }

  def persistenceService

  def keyService

  def add = {
    def city = loadCity()
    def university = new University(name: params.name)
    city.universities << university
    persistenceService.makePersistent(city)
    render university.id.id
  }

  def list = {
    def city = loadCity()
    render(builder: "json", contentType: "application/json") {
      universities {
        city.universities.each {
          university(id: it.id.getId(), name: it.name)
        }
      }
    }
  }
  
  def loadCity(){
    persistenceService.getObjectById(City.class, keyService.cityKey(params.country, params.state, params.city))
  }
}
