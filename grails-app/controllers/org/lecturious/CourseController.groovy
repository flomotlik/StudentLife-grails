package org.lecturious

class CourseController {
  
  def add = {
    def university = University.get(params.id)
    def course = new Course(params)
    university.addToCourses(course)
    course.setUniversity(university)
    course.save()
    def save = university.save()
    log.debug("Save $save $course.id")
    render course.id
  }
  
  def addEvent = {
    def course = loadCourse()
    log.debug("Creating Event: $params.description $params.date $params.duration")
    def event = new Event(description:params.description, date:params.date, duration:params.duration)
    event.save()
    course.addToEvents(event)
    course.save()
    render event.id
  }
  
  def addTodo = {
    def course = loadCourse()
    log.debug("Creating Todo: $params.description $params.date $params.duration")
    def todo = new Todo(description:params.description, date:params.date)
    todo.save()
    course.addToTodos(todo)
    course.save()
    render todo.id
  }
  
  def addLink = {
    def course = loadCourse()
    def link = new Link(description:params.description, link:params.link)
    link.save()
    course.addToLinks(link)
    course.save()
    render link.id
  }
  
  def list = {
    def university = University.get(params.id)
    render(builder: "json", contentType: "application/json") {
      courses {
        university.courses.each {
          course(id: it.id, name: it.name, professor: it.professor, identificator: it.identificator,
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
          event(id: it.id, description: it.description, date:it.date, duration:it.duration)
        }
      }
    }
  }
  
  def listTodos = {
    def course = loadCourse()
    render(builder: "json", contentType: "application/json") {
      todos {
        course.todos.each {
          todo(id: it.id, description: it.description, date:it.date)
        }
      }
    }
  }
  
  def listLinks = {
    def course = loadCourse()
    render(builder: "json", contentType: "application/json") {
      links {
        course.links.each {
          aLink(id: it.id, description: it.description, link:it.link)
        }
      }
    }
  }
  
  def update = {
    def course = loadCourse()
    course.properties = params
    course.save
    render course.id
  }
  
  def showColleagues = {
    //TODO
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
    University.get(params.id)
  }
  
  private def loadCourse(){
    Course.get(params.id)
  }
}
