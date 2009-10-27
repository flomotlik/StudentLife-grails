package org.lecturious

class ApplicationController {

  def persistenceManager

  def facebookService

  def index = {
    if (session.user == null) {
      try {
        switch (grails.util.GrailsUtil.environment) {
          case "development":
            def facebookId = "development_user"
            def user = loadUser(facebookId)
            if(!user){
              user = new User(name: "Name", facebookId: facebookId)
              persistenceManager.makePersistent(user)
            }
            session.user = user
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
            break
        }
      } catch (e) {
        log.debug(e)
      }
      redirect(controller:"user", action:"listUniversities")
    }
  }

  private def loadUser(facebookUserId) {
    def query = persistenceManager.newQuery(User.class);
    query.setFilter("facebookId == facebookIdParam");
    query.declareParameters("String facebookIdParam");
    def user = query.execute(facebookUserId.toString())[0]
    log.debug(user)
    return user
  }
}