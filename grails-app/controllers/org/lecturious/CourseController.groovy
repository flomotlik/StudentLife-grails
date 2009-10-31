package org.lecturious

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

class CourseController {

  def index = { }

  def persistenceManager

  def keyService

  def add = {
    def university = universityKey()
    def course = new Course(params)
    persistenceManager.makePersistent(course)
    university.courses << course
    persistenceManager.makePersistent(university)
    render course.id
  }

  def list = {
    def university = universityKey()
    render(builder: "json", contentType: "application/json") {
      courses {
        university.courses.each {
          course(id: it.id.id, name: it.name, professor: it.professor, identificatr: it.identificator,
                  type: it.type, points: it.points)
        }
      }
    }
  }

  def update = {
    def course = persistenceManager.getObjectById(Course.class, keyService.courseKey(params.country, params.state,
            params.city, params.university, params.course))
    course.properties = params
    persistenceManager.makePersistent(course)
    render course.id
  }

  def showColleagues = {
    def key = keyService.courseKey(params.country, params.state, params.city, params.university, params.course)
    def query = persistenceManager.newQuery(Inscription.class)
    query.setFilter("course == courseParam")
    query.declareParameters("com.google.appengine.api.datastore.Key courseParam")
    def inscriptions = query.execute(key)
    log.debug("Inscriptions: $inscriptions")
    def users = []
    inscriptions.each {
      users << it.id.parent
    }
    render(builder: "json", contentType: "application/json") {
      colleagues {
        users.each {
          if (it.id != session.user) {
            def user = persistenceManager.getObjectById(User.class, it)
            colleague(name: user.name, facebookId: user.facebookId)
          }
        }
      }
    }
  }

  private def universityKey() {
    persistenceManager.getObjectById(University.class, keyService.universityKey(params.country, params.state,
            params.city, params.university))
  }
}
