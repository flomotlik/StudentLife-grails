package org.lecturious

import grails.util.GrailsUtil

class ApplicationController {
  
  def facebookService
  
  def fixtureLoader
  
  static def allowedMethods = [index: 'GET']
  
  /**
   *  checks if user already logged in.
   *  in development mode you can change the logged in user by adding userId
   */
  def index = {
    if (facebookService.init(params, request, response)) {
      render();
    }
    log.debug("Session.user $session.user")
    if (session.user == null) {
      switch (grails.util.GrailsUtil.environment) {
        case "development":
        /*
         def facebookId = params.userId ?: "development_user"
         def name = params.name ?: "Name"
         log.debug("Development Mode User: $facebookId")
         def user = Student.findByFacebookId(facebookId)?.id
         if (!user) {
         def newUser = new Student(name: name, facebookId: facebookId, lastLogin:new Date(0))
         newUser.save()
         user = newUser.id
         log.debug("UserID: $user")
         }
         session.user = user
         log.debug("Session.User: $session.user")
         break
         */
        case "test":
        case "production":
        String facebookId = facebookService.getLoggedInUser()
        def allUserInfo = facebookService.getStudentInfos([facebookId]);
        log.debug("AllUserInfo: " + allUserInfo);
        def userInfo = allUserInfo.get(facebookId);
        log.debug("userInfo: " + userInfo);
        def username = userInfo.name
        def user = Student.findByFacebookId(facebookId)?.id
        if (!user) {
          def newUser = new Student(facebookId: facebookId, name: username, lastLogin:new Date(0), admin = false);
          log.debug("Persisting user $newUser")
          newUser.save(flush: true)
          user = newUser.id
        }
        session.user = user
        log.debug("User: ${session.user}")
        break
      }
    }
    def userObject = Student.get(session.user)
    session.lastLogin = userObject.lastLogin
    userObject.lastLogin = new Date()
    assert userObject.save()
    log.debug("LoggedIn UserId: $session.user")
    redirect(controller:"wall", action:"index")
  }
  
  def change = {
    def name = params.userId;
    def facebookId = name;
    def newUser = new Student(name: name, facebookId: facebookId)
    newUser.save()
    def user = newUser.id
    //log.debug("UserID: $user")
    session.user = user
    //log.debug("Session.User: $session.user")
    render("Success");
  }
  
  def load = {
    def env = grails.util.GrailsUtil.environment
    if (env == "development" || env == "test") {
      session.user = null
      Inscription.list()*.delete()
      Country.list()*.delete()
      Student.list()*.delete()
      
      def fixture = fixtureLoader.load("creatorFixture")
      fixture = fixture.load("todo")
      fixture = fixture.load("event")
      fixture.load("students")
      log.debug(fixture.course)
    }
  }
  
  def adminLogin = {
    def password = grailsApplication.config.admin.password
    if(password != null && params.password == password){
      session.admin = true
      redirect(controller:"admin", action:"index")
    }
  }
}