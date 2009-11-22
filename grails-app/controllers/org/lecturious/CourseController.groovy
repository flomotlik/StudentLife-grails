package org.lecturious

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

class CourseController {

  def index = { }

  def persistenceService

  def keyService

  def add = {
	log.debug("adding course")
    def university = universityKey()
    def course = new Course(params)
    university.courses << course
    persistenceService.makePersistent(university)
    render course.id
  }

  def addEvent = {
	def course = loadCourse()
	log.debug("Creating Event: $params.description $params.date $params.duration")
	def event = new Event(description:params.description, date:params.date, duration:params.duration)
	course.events << event
	persistenceService.makePersistent(course)
	render event.id
  }

  def addTodo = {
	def course = loadCourse()
	log.debug("Creating Todo: $params.description $params.date $params.duration")
	def todo = new Todo(description:params.description, date:params.date)
	course.todos << todo
	persistenceService.makePersistent(course)
	render todo.id
  }

  def addLink = {
	def course = loadCourse()
	def link = new Link(description:params.description, link:params.link)
	course.links << link
	persistenceService.makePersistent(course)
	render link.id
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

  def listEvents = {
	def course = loadCourse()
    render(builder: "json", contentType: "application/json") {
	  events {
		course.events.each {
			event(id: it.id.id, description: it.description, date:it.date, duration:it.duration)
		}
	  }
    }
  }

  def listTodos = {
	def course = loadCourse()
	render(builder: "json", contentType: "application/json") {
		todos {
			course.todos.each {
				todo(id: it.id.id, description: it.description, date:it.date)
		    }
	     }
	 }
  }

  def listLinks = {
	def course = loadCourse()
	render(builder: "json", contentType: "application/json") {
		link {
			course.links.each {
				todo(id: it.id.id, description: it.description, link:it.link)
			}
		}
	 }
  }

  def update = {
	def course = loadCourse()
    course.properties = params
    persistenceService.makePersistent(course)
    render course.id
  }

  def showColleagues = {
    def key = keyService.courseKey(params.country, params.state, params.city, params.university, params.course)
    def inscriptions = persistenceService.loadAllWithKey(Inscription.class, "course", key)
    log.debug("Inscriptions: $inscriptions")
    def users = []
    inscriptions.each {
      users << it.id.parent
    }
    render(builder: "json", contentType: "application/json") {
      colleagues {
        users.each {
          if (it.id != session.user) {
            def user = persistenceService.getObjectById(User.class, it)
            colleague(name: user.name, facebookId: user.facebookId)
          }
        }
      }
    }
  }

  private def universityKey() {
    persistenceService.getObjectById(University.class, keyService.universityKey(params.country, params.state,
            params.city, params.university))
  }
	
  private def loadCourse(){
	persistenceService.getObjectById(Course.class, keyService.courseKey(params.country, params.state,
			params.city, params.university, params.course))
	}
}
