package org.lecturious

import org.lecturious.Country

class StateController {
  
//  static def allowedMethods = [add:'POST', list:'GET']
  
  def index = { }

  def add = {
    def country = Country.get(params.id)
    def state = new State(name: params.name)
    state.save()
    country.addToStates(state)
    country.save()
    render state.id
  }

  def list = {
    def country = Country.get(params.id)
    render(builder: "json", contentType: "application/json") {
      states {
        country.states.each {
          state(id: it.id, name: it.name)
        }
      }
    }
  }
}
