package org.lecturious

class InscriptionController {

    def index = {
        def user = User.get(session.user.id)
        def countries = Country.list()
        flash.country = params.country?.toLong() ?: flash.country
        flash.state = params.state?.toLong() ?: flash.state
        flash.city = params.city?.toLong() ?: flash.city

        def selectedCountry = countries.find{c -> c.id == flash.country}
        def states = flash.country? State.findAllByCountry(selectedCountry) : null
        //states.each{log.debug("${it.id}:${flash.state} ${it.id == flash.state}")}
        def cities = flash.state? City.findAllByState(State.get(flash.state)) : null
        def universities = flash.city? University.findAllByCity(City.get(flash.city)) : null

        [userUniversities:user.universities, countries:countries, states:states,
            cities:cities, universities:universities, country:flash.country,
            state:flash.state, city:flash.city]
    }

    def addCountry = {
        if(!params.value){
            render (view:"add", model:[label:"Country", action:"addCountry"])
        }else{
            def countryInstance = new Country(name:params.value)
            if(!countryInstance.hasErrors() && countryInstance.save()) {
                flash.message = "Country ${countryInstance.name} created"
            }
            redirect(action:index)
        }
    }

    def addState = {
        if(!params.value){
            flash.country = params.country
            render (view:"add", model:[label:"State", action:"addState"])
        }else{
            def stateInstance = new State(name:params.value, country:Country.get(params.country))
            if(!stateInstance.hasErrors() && stateInstance.save()) {
                flash.message = "State ${stateInstance.name} created"
            }
            redirect(action:index)
        }
    }

    def addCity = {

    }

    def addUniversity = {
        
    }
}
