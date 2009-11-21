package org.lecturious

import grails.util.GrailsUtil
import org.lecturious.User

class ApplicationController {

  def persistenceManager

  def facebookService

  def index = {
    if (session.user == null || grails.util.GrailsUtil.environment == "development") {
        switch (grails.util.GrailsUtil.environment) {
          case "development":
            def facebookId = params.userId ?: "development_user"
            log.debug("Development Mode User: $facebookId")
            def user = loadUser(facebookId)
            if (!user) {
              def newUser = new User(name: "Name", facebookId: facebookId)
              log.debug("Persisting User")
              persistenceManager.makePersistent(newUser)
              user = newUser.id
              log.debug("UserID: $user")
            }
            session.user = user
            redirect(uri:"/source")
            break

          case "production":
            def facebook = facebookService.getFacebookConnection(request, response)

            def facebookUserId = facebook.users_getLoggedInUser();
            def username = facebook.users_getInfo([facebookUserId], ["name"]).get(0).name

            def user = loadUser(facebookUserId)
            if (!user) {
              session.user = new User(facebookId: facebookUserId, name: username)
              log.debug("Persisting user ${session.user}")
              persistenceManager.makePersistent(session.user)
            } else {
              session.user = new User(facebookId: user.facebookId, name: user.name, id: user.id)
            }

            log.debug("User: ${session.user.name}")
            redirect(uri:"/client")
            break
        }
    }
    log.debug("LoggedIn UserId: $session.user")
    
  }

  private def loadUser(facebookUserId) {
    def query = persistenceManager.newQuery("select id from ${User.class.name}");
    query.setFilter("facebookId == facebookIdParam");
    query.declareParameters("String facebookIdParam");
    def user = query.execute(facebookUserId.toString())[0]
    log.debug("Loaded user: $user")
    return user
  }
}