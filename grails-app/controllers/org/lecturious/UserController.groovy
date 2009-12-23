package org.lecturious

class UserController {
  
  def addCourse = {
    def status = 200
    def text = ""
    if(params.id && session.user){
      def course = Course.get(params.id)
      def inscription = new Inscription(course: course)
      def universityKey = course.university
      def user = User.get(session.user)
      log.debug("User: $user - UserId: $session.user")
      log.debug("Universities $user.universities")
      log.debug("University: $universityKey")
      def alreadyContains =  user.universities.any{it.id == universityKey.id
      }
      def hasInscription = user.inscriptions.any{it == inscription
      }
      log.debug ("Contains: $alreadyContains HasInscription: $hasInscription")
      if(alreadyContains && !hasInscription){
        user.addToInscriptions(inscription)
        inscription.user = user
        user.save()
        text = inscription.id.toString()
      }else{
        status = 400
      }
    }else{
      status = 400 
    }
    render(status:status, text:text)
  }
  
  def addUniversity = {
    def universityKey = University.get(params.id)
    log.debug("University: $universityKey")
    def user = User.get(session.user)
    if (University.exists(params.id) && !user.universities.contains(universityKey)) {
      user.addToUniversities(universityKey)
      user.save()
      render universityKey.id
    }else{
      response.sendError(403)
    }
  }
  
  def listCourses = {
    render(builder: "json", contentType: "application/json") {
      courses {
        def user = User.get(session.user)
        log.debug("$user.inscriptions")
        user.inscriptions?.each {
          log.debug("$user $it")
          inscription(id: it.id, courseId: it.course.id, name: it.course.name, type: it.course.type,
          professor: it.course.professor)
        }
      }
    }
  }
  def listUniversities = {
    render(builder: "json", contentType: "application/json") {
      universities {
        def user = User.get(session.user)
        user.universities?.each {
          inscription(id: it.id, name: it.name)
        }
      }
    }
  }
  
  def show = {
    def userObject = User.get(session.user)
    render(builder:"json", contentType:"application/json"){
      user(facebookId:userObject.facebookId, name:userObject.name)
    }
  }
}
