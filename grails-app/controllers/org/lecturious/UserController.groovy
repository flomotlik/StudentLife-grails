package org.lecturious

import grails.converters.JSON 

class UserController {
  
  def workflowService
  
  def joinCourse = {
    def courseId = params.course?.getAt(0)
    log.debug("${courseId.toString()} - ${params.course.toString()}")
    if(courseId && session.user && 
    Student.exists(session.user) && Course.exists(courseId)) {
      def course = Course.get(courseId)
      def inscription = new Inscription(course: course)
      def universityKey = course.university
      def user = Student.get(session.user)
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
}
