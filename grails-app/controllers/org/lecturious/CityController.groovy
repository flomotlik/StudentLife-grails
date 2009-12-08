package org.lecturious

class CityController {
  
//  static def allowedMethods = [add:'POST', list:'GET']
  
  def add = {
    def state = State.get(params.id)
    def city = new City(name: params.name)
    city.save()
    state.addToCities(city)
    state.save()
    render city.id
  }

  def list = {
    def state = State.get(params.id)
    render(builder: "json", contentType:"application/json") {
      cities {
        state.cities.each {
          city(id: it.id, name: it.name)
        }
      }
    }
  }
}
