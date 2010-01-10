package org.lecturious

import grails.util.GrailsUtil
import org.lecturious.User

class ApplicationController {
  
  def facebookService
  
  def fixtureLoader
  
  static def allowedMethods = [index:'GET']
  
  def index = {
    log.debug("Session.user $session.user")
    if (session.user == null || grails.util.GrailsUtil.environment == "development") {
      switch (grails.util.GrailsUtil.environment) {
        case "development":
        def facebookId = params.userId ?: "development_user"
        def name = params.name ?: "Name"
        log.debug("Development Mode User: $facebookId")
        def user = User.findByFacebookId(facebookId)?.id
        if (!user) {
          def newUser = new User(name: name, facebookId: facebookId)
          newUser.save()
          user = newUser.id
          log.debug("UserID: $user")
        }
        session.user = user
        log.debug("Session.User: $session.user")
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
        break
      }
    }
    log.debug("LoggedIn UserId: $session.user")
    def user = User.get(session.user)
    def inscriptions = Inscription.findAllByUser(user)
    [courses:inscriptions*.course.sort{it.name
    }]
  }
  
  def load = {
    if (grails.util.GrailsUtil.environment == "development") {
      User.list()*.delete()
      Country.list()*.delete()
      def fixture = fixtureLoader.load("default")
      fixture.load("extensions")
      log.debug("Inscription $fixture.inscription.id")
    }
  }
}