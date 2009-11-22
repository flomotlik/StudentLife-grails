package org.lecturious

class CityController {

  def index = { }

  def persistenceService

  def keyService

  def add = {
    def state = stateKey()
    def city = new City(name: params.name)
    persistenceService.makePersistent(city)
    state.cities << city
    persistenceService.makePersistent(state)
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
    persistenceService.getObjectById(State.class, keyService.stateKey(params.country, params.state))
  }
}
