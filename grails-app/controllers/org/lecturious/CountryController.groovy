package org.lecturious

class CountryController {
    
    def index = { redirect(action:list,params:params) }

    // the delete, save and update actions only accept POST requests
    static allowedMethods = [delete:'POST', save:'POST', update:'POST']

    def create = {
        def countryInstance = new Country()
        countryInstance.properties = params
        return ['countryInstance':countryInstance]
    }

    def save = {
        def countryInstance = new Country(params)
        if(!countryInstance.hasErrors() && countryInstance.save()) {
            flash.message = "Country ${countryInstance.id} created"
            redirect(controller:"inscription")
        }
        else {
            render(view:'create',model:[countryInstance:countryInstance])
        }
    }
}
