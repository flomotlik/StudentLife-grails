import org.lecturious.FacebookMock
import org.lecturious.User


class ServiceFilters {
  def filters = {
    facebook(uri: "/app/**") {
      before = {
        log.debug("Filtering: ${request.forwardURI}")
        if (session.user == null) {
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