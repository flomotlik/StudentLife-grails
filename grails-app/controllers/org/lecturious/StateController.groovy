package org.lecturious

class StateController {
    
    def index = { redirect(action:list,params:params) }

    // the delete, save and update actions only accept POST requests
    static allowedMethods = [delete:'POST', save:'POST', update:'POST']

    def create = {
        def stateInstance = new State()
        params.country = Country.get(params.country) ?: null
        stateInstance.properties = params
        return ['stateInstance':stateInstance]
    }

    def save = {
        def stateInstance = new State(params)
        if(!stateInstance.hasErrors() && stateInstance.save()) {
            flash.message = "State ${stateInstance.id} created"
            redirect(controller:"inscription")
        }
        else {
            render(view:'create',model:[stateInstance:stateInstance])
        }
    }
}
