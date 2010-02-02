class ServiceFilters {
  
  def okController = ["application"]
  
  def filters = {
    facebook(uri: "/**") {
      before = {
        log.debug("Filtering: ${request.forwardURI} - User: $session.user")
        if (!okController.contains(controllerName) && session.user == null) {
          redirect(controller:"application", action:"index")
          return false
        }
      }
    }
    originAllow(controller:"*"){
      after={
        if(grails.util.GrailsUtil.environment == "development"){
          response.addHeader("Access-Control-Allow-Origin", "*")
        }
      }
    }
  }
}