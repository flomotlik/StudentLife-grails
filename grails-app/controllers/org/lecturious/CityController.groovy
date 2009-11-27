package org.lecturious

class CityController {

  def index = { }

  def persistenceService

  def keyService

  def add = {
    def state = loadState()
    def city = new City(name: params.name)
    persistenceService.makePersistent(city)
    state.cities << city
    persistenceService.makePersistent(state)
    render city.id
  }

  def list = {
    def state = loadState()
    render(builder: "json", contentType:"application/json") {
      cities {
        state.cities.each {
          city(id: it.id.getId(), name: it.name)
        }
      }
    }
  }

  private def loadState() {
    persistenceService.getObjectById(State.class, keyService.stateKey(params.country, params.state))
  }
}
