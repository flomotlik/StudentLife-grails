package org.lecturious

import grails.util.GrailsUtil
import org.lecturious.User

class ApplicationController {

  def persistenceService

  def facebookService

  def index = {
    if (session.user == null || grails.util.GrailsUtil.environment == "development") {
        switch (grails.util.GrailsUtil.environment) {
          case "development":
            def facebookId = params.userId ?: "development_user"
            log.debug("Development Mode User: $facebookId")
            def user = persistenceService.loadAllKeys(User.class, "facebookId", facebookId)[0]
            if (!user) {
              def newUser = new User(name: "Name", facebookId: facebookId)
              log.debug("Persisting User")
              persistenceService.makePersistent(newUser)
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
              persistenceService.makePersistent(session.user)
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
}