package org.lecturious

class UniversityController {

  def index = {
    [user: Student.get(session.user)]
  }

  def search = {
    def qString = params.q;
    log.debug("Search for '${qString}'");
    if (qString.size() == 0) {
      qString = "%"
    }
    else {
      qString = "%" + qString + "%"
    }
    def universities = University.findAllByNameIlike(qString, [max: 15]);
    log.debug("Found universities:" + universities)
    render(template: "/university/searchResults", model: [universities: universities])
  }

  def joinFlow = {
    initialize {
      action {
        def countries = Country.list()
        log.debug(countries)
        [collection: countries, currentType: "Country"]
      }
      on("success").to "showCountries"
    }

    showCountries {
      render(view: "/university/show")
      on("select") {
        def country = Country.get(params.item)
        flow.country = country
        [selected: country, collection: country.states, currentType: "State"]
      }.to "showStates"
      on("add") {
        def country = new Country(params)
        log.debug(country)
        flow.country = country
        [selected: country, collection: country.states, currentType: "State"]
      }.to "showStates"
    }
    showStates {
      render(view: "/university/show")
      on("select") {
        def state = State.get(params.item)
        flow.state = state
        [selected: state, collection: state.cities, currentType: "City"]
      }.to "showCities"
      on("add") {
        def state = new State(params)
        def country = flow.country
        country.addToStates(state)
        flow.state = state
        log.debug("state - $state.name")
        [selected: state, collection: state.cities, currentType: "City"]
      }.to "showCities"
    }
    showCities {
      render(view: "/university/show")
      on("select") {
        def city = City.get(params.item)
        flow.city = city
        def collection = city.universities.collect {
          [name: it.name]
        }
        log.debug("Collection: $collection")
        [selected: city, collection: collection, currentType: "University"]
      }.to "showUniversities"
      on("add") {
        def city = new City(params)
        def state = flow.state
        state.addToCities(city)
        log.debug(city)
        flow.city = city
        [selected: city, collection: [], currentType: "University"]
      }.to "showUniversities"
    }
    showUniversities {
      render(view: "/university/show")
      on("select") {
        log.debug("Item: $params.item")
        def universityKey = flow.city.universities.find {
          it.name == params.item
        }
        log.debug("University: $universityKey")
        def user = Student.get(session.user)
        if (!user.universities?.contains(universityKey) && flow.country.save()) {
          user.addToUniversities(universityKey)
          user.save()
        } else {
          log.debug("Not joining")
        }
        [user: user]
      }.to "joined"
      on("add") {
        def university = new University(params)
        def city = flow.city
        city.addToUniversities(university)
        log.debug(city)
        [selected: city, collection: city.universities]
      }.to "showUniversities"
    }
    joined {
      render(view: "/settings/_index")
    }
  }
}
