import org.codehaus.groovy.grails.commons.GrailsApplication;

class ServiceFilters {
  
  def okController = ["application", "admin"]
  
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
    admin(controller:"admin"){
      before={
        if(session.admin != true){
          redirect(controller:"application", action:"adminLogin")
        }
      }
    }
  }
}