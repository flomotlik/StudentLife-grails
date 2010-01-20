package org.lecturious

import grails.util.GrailsUtil

class ApplicationController {
  
  def facebookService
  
  def fixtureLoader
  
  static def allowedMethods = [index:'GET']

   /**
    *  checks if user already logged in.
    *  in development mode you can change the logged in user by adding userId
    */
  def index = {
    log.debug("Session.user $session.user")
    if (session.user == null || grails.util.GrailsUtil.environment == "development") {
      switch (grails.util.GrailsUtil.environment) {
        case "development":
        def facebookId = params.userId ?: "development_user"
        def name = params.name ?: "Name"
        log.debug("Development Mode User: $facebookId")
        def user = Student.findByFacebookId(facebookId)?.id
        if (!user) {
          def newUser = new Student(name: name, facebookId: facebookId)
          newUser.save()
          user = newUser.id
          log.debug("UserID: $user")
        }
        session.user = user
        log.debug("Session.User: $session.user")
        break
        
        case "production":
        def facebook = facebookService.getFacebookConnection(request, response)
        
        def facebookId = facebook.users_getLoggedInUser();
        def username = facebook.users_getInfo([facebookId], ["name"]).get(0).name
        
        def user = Student.findByFacebookId(facebookId)?.id
        if (!user) {
          def newUser = new Student(facebookId: facebookId, name: username)
          log.debug("Persisting user $newUser")
          newUser.save(flush:true)
          user = newUser.id
        }
        session.user = user
        log.debug("User: ${session.user}")
        break
      }
    }
    log.debug("LoggedIn UserId: $session.user")
    def user = Student.get(session.user)
    def inscriptions = Inscription.findAllByUser(user)
    [user:user, courses:inscriptions*.course.sort{it.name
    }]
  }
  
  def load = {
    if (grails.util.GrailsUtil.environment == "development") {
      Student.list()*.delete()
      Country.list()*.delete()
      def fixture = fixtureLoader.load("default")
      fixture.load("extensions")
      log.debug("Inscription $fixture.inscription.id")
    }
  }
}