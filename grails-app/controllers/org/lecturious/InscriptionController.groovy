package org.lecturious

import org.springframework.context.ApplicationContextAware
import org.springframework.context.ApplicationContext

class InscriptionController{

    def persistenceManager

    def addInscriptionFlow = {
        listCountries {
            action {
                log.debug("Start Action called")
                //[] needed because result of newQuery is not serializable
                def countries = [] + persistenceManager.newQuery(Country.class).execute()
                log.debug("Countries class ${countries.class}")
                [countries:countries]
            }
            on("success").to "selectCountry"
        }
        selectCountry {
            on("select"){
                flow.country = flow.countries.find{c -> c.id == params.country.toLong()}
                log.debug("SelectedCountry: ${params.country} - ${flow.country}")
            }.to "listStates"
            on("addCountry"){
                persistenceManager.makePersistent(new Country(name:params.newCountry))
            }.to "listCountries"
        }

        listStates {
            action{
                log.debug("States: ${flow.country.states}")
                [states:flow.country.states, country:flow.country]
            }
            on("success").to "selectState"
        }
        selectState{
            on("select"){
                flow.state = flow.country.states.find{c-> c.id.getId() == params.state.toLong()}
                log.debug("SelectedState: ${flow.state}")
            }.to "listCities"
            on("addState"){
                flow.country.states.add(new State(name:params.newState))
                persistenceManager.makePersistent(flow.country)
            }.to "listStates"
        }

        listCities {
            action{
                [cities:flow.state.cities, state:flow.state]
            }
            on("success").to "selectCity"
        }
        selectCity{
            on("select"){
                flow.city = flow.state.cities.find{c-> c.id.getId() == params.city.toLong()}
                log.debug("SelectedCity: ${params.city.toLong()} - ${flow.city}")
            }.to "listUniversities"
            on("addCity"){
                flow.state.cities.add(new City(name:params.newCity))
                persistenceManager.makePersistent(flow.state)
            }.to "listCities"
        }

        listUniversities{
            action{
                [universities:flow.city.universities, city:flow.city]
            }
            on("success").to "selectUniversity"
        }
        selectUniversity{
            on("select"){
                def university = flow.city.universities.find{c-> c.id.getId() == params.university.toLong()}
                log.debug("Universities ${session.user.universities}")
                def universities = session.user.universities?: []
                universities << university.id
                session.user.universities = universities
                persistenceManager.makePersistent(session.user)
                log.debug("Added University ${university} to User ${session.user.id}")
                flash.message = "Successfully added University ${university.name}."
            }.to "universityAdded"
            on("addUniversity"){
                flow.city.universities.add(new University(name:params.newUniversity))
                persistenceManager.makePersistent(flow.city)
            }.to "listUniversities"
        }
        universityAdded{
            redirect(controller:"application")
        }
    }
}
