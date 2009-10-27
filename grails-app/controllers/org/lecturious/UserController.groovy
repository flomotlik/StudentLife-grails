package org.lecturious

class UserController {

  def index = { }

  def keyService

  def persistenceManager

  def addCourse = {
    def courseKey = keyService.courseKey(params.country, params.state, params.city, params.university, params.course)
    def inscribtion = new Inscription(course: courseKey)
    persistenceManager.makePersistent(inscribtion)
    def inscriptions = session.user.inscriptions?: [] 
    inscriptions << inscribtion
    session.user.inscriptions = inscriptions
    persistenceManager.makePersistent(session.user)
    render inscribtion.id
  }

  def list = {
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
}
