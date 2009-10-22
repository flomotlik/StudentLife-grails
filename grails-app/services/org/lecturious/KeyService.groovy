package org.lecturious

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

class KeyService {

  boolean transactional = false

  private def createKey(country, state) {
    def countryId = Long.valueOf(country)
    def stateId = Long.valueOf(state)
    new KeyFactory.Builder(Country.class.simpleName, countryId).
            addChild(State.class.simpleName, stateId)
  }

  private def createKey(country, state, city){
    def cityId = Long.valueOf(city)
    createKey(country, state).addChild(City.class.simpleName, cityId)
  }

  private def createKey(country, state, city, university){
    def universityId = Long.valueOf(university)
    createKey(country, state, city).addChild(University.class.simpleName, universityId)
  }

  private def createKey(country, state, city, university, course){
    def courseId = Long.valueOf(course)
    createKey(country, state, city, university).addChild(Course.class.simpleName, courseId)
  }

  def stateKey(country, state){
     createKey(country, state).key
  }

  def  cityKey(country, state, city){
    createKey(country, state, city).key
  }

  def universityKey(country, state, city, university){
    createKey(country, state, city, university).key
  }

  def courseKey(country, state, city, university, course){
    createKey(country, state, city, university, course).key
  }
}
