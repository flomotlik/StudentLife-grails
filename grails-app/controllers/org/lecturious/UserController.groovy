package org.lecturious

import org.lecturious.Course
import org.lecturious.Inscription
import org.lecturious.University

class UserController {

  def index = { }

  def keyService

  def persistenceManager

  def addCourse = {
    def courseKey = keyService.courseKey(params.country, params.state, params.city, params.university, params.course)
    def inscribtion = new Inscription(course: courseKey)
    persistenceManager.makePersistent(inscribtion)
    session.user.inscriptions = session.user.inscriptions ?: []
    session.user.inscriptions << inscribtion
    persistenceManager.makePersistent(session.user)
    render inscribtion.id
  }

  def addUniversity = {
    def universityKey = keyService.universityKey(params.country, params.state, params.city, params.university)
    session.user.universities = session.user.universities ?: []
    if (persistenceManager.getObjectById(University.class, universityKey) &&
            !session.user.universities.contains(universityKey)) {
      session.user.universities << universityKey
      persistenceManager.makePersistent(session.user)
    }
    render universityKey
  }

  def listCourses = {
    render(builder: "json", contentType: "application/json") {
      inscriptions {
        log.debug("$session.user.inscriptions")
        session.user.inscriptions?.each {
          log.debug("$session.user $it")
          def course = persistenceManager.getObjectById(Course.class, it.course)
          log.debug(course)
          inscription(id: it.id.id, courseId: course.id.id, course: course.id.id, name: course.name, type: course.type,
                  professor: course.professor)
        }
      }
    }
  }
  def listUniversities = {
    render(builder: "json", contentType: "application/json") {
      universities {
        session.user.universities?.each {
          def university = persistenceManager.getObjectById(University.class, it)
          inscription(id: university.id.id, name: university.name)
        }
      }
    }
  }
}
