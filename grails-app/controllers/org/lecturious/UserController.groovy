package org.lecturious

import grails.converters.JSON 

class UserController {
  
  def workflowService
  
  def joinCourse = {
    def courseId = params.course?.getAt(0)
    log.debug("${courseId.toString()} - ${params.course.toString()}")
    if(courseId && session.user && 
    User.exists(session.user) && Course.exists(courseId)) {
      def course = Course.get(courseId)
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
        user.save()
        render(template:"/course/index", model:[courses:user.inscriptions*.course])
      }else{
        render(status:400)
      }
    }else{
      render(status:400)
    }
  }
  
  def joinUniversity = {
    def status = 200
    def text = ""
    if(params.id && session.user && University.exists(params.id)){
      def universityKey = University.get(params.id)
      log.debug("University: $universityKey")
      def user = User.get(session.user)
      if (!user.universities?.contains(universityKey)) {
        user.addToUniversities(universityKey)
        user.save()
        text = universityKey.id.toString()
      }else{
        status = 400
      }
    } else{
      status = 400 
    }
    render(status:status, text:text)
  }
  
  def listCourses = {
    if(session.user && User.exists(session.user)){
      def user = User.get(session.user)
      render user.inscriptions.collect{[id:it.id, courseId: it.course.id, name: it.course.name, type: it.course.type,
        professor: it.course.professor, identificator: it.course.identificator]
      } as JSON
    }else{
      render(status:400)
    }
  }
  
  def listUniversities = {
    def status = 200
    if(session.user && User.exists(session.user)){
      def user = User.get(session.user)
      render user.universities.collect{[id:it.id, name: it.name]
      } as JSON
    }else{
      render(status:400)
    }
  }
  
  def show = {
    if(session.user && User.exists(session.user)){
      def userObject = User.get(session.user)
      def map = [facebookId:userObject.facebookId, name:userObject.name] 
      render map as JSON
    }else{
      render(status:400)     
    }
  }
}
