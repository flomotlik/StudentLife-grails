package org.lecturious

class CityController {

  def index = { }

  def persistenceManager

  def keyService

  def add = {
    def state = stateKey()
    def city = new City(name: params.name)
    persistenceManager.makePersistent(city)
    state.cities << city
    persistenceManager.makePersistent(state)
    render city.id
  }

  def list = {
    def state = stateKey()
    render(builder: "json", contentType:"application/json") {
      cities {
        state.cities.each {
          city(id: it.id.getId(), name: it.name)
        }
      }
    }
  }

  private def stateKey() {
    persistenceManager.getObjectById(State.class, keyService.stateKey(params.country, params.state))
  }
}
