package org.lecturious

import org.lecturious.Course
import org.lecturious.Inscription
import org.lecturious.University

class UserController {

  def index = { }

  def keyService

  def persistenceService

  def addCourse = {
    def courseKey = keyService.courseKey(params.country, params.state, params.city, params.university, params.course)
    def inscribtion = new Inscription(course: courseKey)
    persistenceService.makePersistent(inscribtion)
    def user = persistenceService.getObjectById(User.class, session.user)
    user.inscriptions = user.inscriptions ?: []
    user.inscriptions << inscribtion
    persistenceService.makePersistent(user)
    render inscribtion.id
  }

  def addUniversity = {
    def universityKey = keyService.universityKey(params.country, params.state, params.city, params.university)
    def user = persistenceService.getObjectById(User.class, session.user)
    user.universities = user.universities ?: []
    if (persistenceService.getObjectById(University.class, universityKey) &&
            !user.universities.contains(universityKey)) {
      user.universities << universityKey
      persistenceService.makePersistent(user)
    }
    render universityKey
  }

  def listCourses = {
    render(builder: "json", contentType: "application/json") {
      inscriptions {
        def user = persistenceService.getObjectById(User.class, session.user)
        log.debug("$user.inscriptions")
        user.inscriptions?.each {
          log.debug("$user $it")
          def course = persistenceService.getObjectById(Course.class, it.course)
          log.debug(course)
          inscription(id: it.id.id, courseId: course.id.id, name: course.name, type: course.type,
                  professor: course.professor)
        }
      }
    }
  }
  def listUniversities = {
    render(builder: "json", contentType: "application/json") {
      universities {
        def user = persistenceService.getObjectById(User.class, session.user)
        log.debug(user.universities)
        user.universities?.each {
          def university = persistenceService.getObjectById(University.class, it)
          inscription(id: university.id.id, name: university.name)
        }
      }
    }
  }
}
