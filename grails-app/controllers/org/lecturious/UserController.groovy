package org.lecturious

import grails.converters.JSON

class UserController {
  
  def showCourses = {
    def courses = Student.get(session.user).inscriptions*.course.sort{it.name}
    [courses:courses]
  }
  
  def joinUniversity = {
    def universityId = params.university
    if (universityId && session.user && University.exists(universityId)) {
      def universityKey = University.get(universityId)
      log.debug("University: $universityKey")
      def user = Student.get(session.user)
      if (!user.universities?.contains(universityKey)) {
        user.addToUniversities(universityKey)
        user.save()
      } else {
      }
    } else {
    }
    redirect(controller:"university", action:"index")
  }


  def joinCourse = {
    def courseId = params.course
    log.debug("${courseId.toString()} - ${params.course.toString()}")
    log.debug(Course.exists(courseId))
    if (courseId && session.user &&
            Student.exists(session.user) && Course.exists(courseId)) {
      def course = Course.get(courseId)
      def inscription = new Inscription(course: course)
      def universityKey = course.university
      def user = Student.get(session.user)
      log.debug("User: $user - UserId: $session.user")
      log.debug("Universities $user.universities")
      log.debug("University: $universityKey")
      def alreadyContains = user.universities.any {
        it.id == universityKey.id
      }
      def hasInscription = user.inscriptions.any {
        it == inscription
      }
      log.debug("Contains: $alreadyContains HasInscription: $hasInscription")
      if (alreadyContains && !hasInscription) {
        user.addToInscriptions(inscription)
        user.save()
      } else {
      }
    } else {
    }
    redirect(controller: "settings", action: "index")
  }
}
