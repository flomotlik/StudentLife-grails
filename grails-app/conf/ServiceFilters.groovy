class ServiceFilters {
  
  def okController = ["application"]
  
  def filters = {
    facebook(uri: "/**") {
      before = {
        log.debug("Filtering: ${request.forwardURI}")
        if (!okController.contains(controllerName) && session.user == null) {
          log.debug("Session.user == null for $request.forwardURI")
          response.sendError(403)
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